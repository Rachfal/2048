require("../scss/main.scss")
require("./swiped-events")

const tout = 100;
let m = 0;
let n = 0;
let score = 0;
let scorePrev = 0;
let arr = []
let arrPrev = []
let moved = false;
let scale = 1;
let eventRun = false;


const menuMain = document.querySelector(".menu-main")
const menuBurger = document.querySelector(".menu-burger")
const menuReturn = document.querySelector(".menu-return")
const menuUndo = document.querySelector(".menu-undo")
const gridGame = document.querySelector(".grid-game")


// GRID
function generateGrid(m, n) {
    for (let i = 0; i < n; i++) {
        const newRow = document.createElement("div");
        newRow.classList.add("grid-row");
        gridGame.appendChild(newRow);
        for (let j = 0; j < m; j++) {
            const newBox = document.createElement("div")
            newBox.classList.add("grid");
            newRow.appendChild(newBox);
        }
    }
}

function clearGrid() {
    document.querySelectorAll(".grid-row").forEach(el => {
        el.remove()
    })
}

// ARRAY
function generateArray(m, n) {
    for (let i = 0; i < n; i++) {
        arr.push([])
        for (let j = 0; j < m; j++) {
            arr[i].push("")
        }
    }
}

// BOX
function createBox(x, y, val) {
    const newBox = document.createElement("div");
    newBox.classList.add(`box`);
    newBox.classList.add(`box-${x}-${y}`);
    if (val < 100000) {
        newBox.classList.add(`box-${val}`);
        newBox.innerText = `${val}`;
    } else {
        newBox.classList.add(`box-131072`);
        newBox.innerText = Math.floor(val / 1000) + "k"
    }
    gridGame.appendChild(newBox);
}

function randomBox() {
    let generate = false;
    arr.forEach(el => {
        if (el.includes("")) {
            generate = true
        }
    })
    if (!generate) {
        return false;
    }
    let x = Math.floor(Math.random() * n)
    let y = Math.floor(Math.random() * m)
    while (arr[x][y] !== "") {
        x = Math.floor(Math.random() * n)
        y = Math.floor(Math.random() * m)
    }

    const val = Math.floor(Math.random() * (10) + 1) <= 7 ? 2 : 4;
    arr[x][y] = val;
    createBox(x, y, val) 
}

function generateFromArray(arr) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (arr[i][j] !== "") {
                createBox(i, j, arr[i][j])
            }
        }
    }
}

function clearBoxes() {
    document.querySelectorAll(".box").forEach(el => {
        el.remove()
    })
}


// GAMEPLAY

function gameOver() {
    let over = true;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (arr[i][j] === "") {
                over = false
                document.querySelector(".game-over").style.display = "none";
                return false
            }
        }
    }
    for (let j = 0; j < m; j++) {
        for (let i = 0; i < n - 1; i++) {
            if (arr[i][j] === arr[i + 1][j]) {
                over = false
                document.querySelector(".game-over").style.display = "none";
                return false
            }
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m - 1; j++) {
            if (arr[i][j] === arr[i][j + 1]) {
                over = false
                document.querySelector(".game-over").style.display = "none";
                return false
            }
        }
    }
    if (over) {
        document.querySelector(".game-over").style.display = "flex";
    }
}

function scoreUpdate(points) {
    score += points
    if (localStorage.getItem(`best${m}x${n}`) === null) {
        localStorage.setItem(`best${m}x${n}`, score)
    }
    if (score > localStorage.getItem(`best${m}x${n}`)) {
        localStorage.setItem(`best${m}x${n}`, score)
    }
    document.querySelector("#score").innerText = score;
    document.querySelector("#best").innerText = localStorage.getItem(`best${m}x${n}`);
}

function moveFirstLoop(x1, x2, y1, y2) {
    if (arr[x1][y1] === "" && arr[x2][y2] !== "") {
        arr[x1][y1] = arr[x2][y2];
        arr[x2][y2] = "";
        const box2 = document.querySelector(`.box-${x2}-${y2}`)
        box2.classList.add(`box-${x1}-${y1}`)
        box2.classList.remove(`box-${x2}-${y2}`)
        moved = true;
    }
}

function moveSecondLoop(x1, x2, y1, y2, val) {
    if ((arr[x1][y1] === arr[x2][y2]) && (arr[x1][y1] !== "")) {
        arr[x1][y1] = 2 * val;
        arr[x2][y2] = "";
        const box1 = document.querySelector(`.box-${x1}-${y1}`)
        const box2 = document.querySelector(`.box-${x2}-${y2}`)
        box2.classList.add(`box-${x1}-${y1}`)
        box2.classList.remove(`box-${x2}-${y2}`)
        eventRun = false
        box1.style.zIndex = 1;
        moved = true;
        setTimeout(() => {
            if (val < 65536) {
                box1.innerText = val * 2
                box1.classList.add(`box-${val * 2}`)
                box1.classList.remove(`box-${val}`)
            } else if (val === 65536) {
                box1.innerText = Math.floor(val * 2 / 1000) + "k"
                box1.classList.add(`box-${val * 2}`)
                box1.classList.remove(`box-${val}`)
            } else {
                box1.innerText = Math.floor(val * 2 / 1000) + "k"
            }
            box1.classList.add(`box-buble`);
            box1.style.zIndex = 0;
            box2.remove();
            eventRun = true;
            scoreUpdate(val * 2);

        }, tout)
        setTimeout(() => {
            box1.classList.remove(`box-buble`)
        }, tout * 2)
    }
}
function moveThirdLoop(x1, x2, y1, y2) {
    if (arr[x1][y1] === "" && arr[x2][y2] !== "") {
        arr[x1][y1] = arr[x2][y2];
        arr[x2][y2] = "";
        const box2 = document.querySelectorAll(`.box-${x2}-${y2}`)
        box2.forEach(el => {
            el.classList.add(`box-${x1}-${y1}`)
            el.classList.remove(`box-${x2}-${y2}`)
        })
    }
}

function move(dir) {
    if (eventRun) {
        moved = false;
        arrTemp = JSON.parse(JSON.stringify(arr));
        scoreTemp = score;

        if (dir === "up") {
            for (let j = 0; j < m; j++) {
                for (let k = 0; k < n - 1; k++) {
                    for (let i = 0; i < n - 1; i++) {
                        moveFirstLoop(i, i + 1, j, j)
                    }
                }
                for (let i = 0; i < n - 1; i++) {
                    moveSecondLoop(i, i + 1, j, j, arr[i][j])
                }
                for (let k = 0; k < n - 1; k++) {
                    for (let i = 0; i < n - 1; i++) {
                        moveThirdLoop(i, i + 1, j, j)
                    }
                }
            }
        }

        if (dir === "down") {
            for (let j = 0; j < m; j++) {
                for (let k = 0; k < n - 1; k++) {
                    for (let i = n - 1; i > 0; i--) {
                        moveFirstLoop(i, i - 1, j, j)
                    }
                }
                for (let i = n - 1; i > 0; i--) {
                    moveSecondLoop(i, i - 1, j, j, arr[i][j])
                }
                for (let k = 0; k < n - 1; k++) {
                    for (let i = n - 1; i > 0; i--) {
                        moveThirdLoop(i, i - 1, j, j)
                    }
                }
            }
        }

        if (dir === "left") {
            for (let i = 0; i < n; i++) {
                for (let k = 0; k < m - 1; k++) {
                    for (let j = 0; j < m - 1; j++) {
                        moveFirstLoop(i, i, j, j + 1)
                    }
                }
                for (let j = 0; j < m - 1; j++) {
                    moveSecondLoop(i, i, j, j + 1, arr[i][j])
                }
                for (let k = 0; k < m - 1; k++) {
                    for (let j = 0; j < m - 1; j++) {
                        moveThirdLoop(i, i, j, j + 1)
                    }
                }
            }
        }

        if (dir === "right") {
            for (let i = 0; i < n; i++) {
                for (let k = 0; k < m - 1; k++) {
                    for (let j = m - 1; j > 0; j--) {
                        moveFirstLoop(i, i, j, j - 1)
                    }
                }
                for (let j = m - 1; j > 0; j--) {
                    moveSecondLoop(i, i, j, j - 1, arr[i][j])
                }
                for (let k = 0; k < m - 1; k++) {
                    for (let j = m - 1; j > 0; j--) {
                        moveThirdLoop(i, i, j, j - 1)
                    }
                }
            }
        }

        if (moved) {
            arrPrev = JSON.parse(JSON.stringify(arrTemp));
            scorePrev = scoreTemp;
            setTimeout(() => {
                randomBox()
                gameOver()
                localStorage.setItem(`lastArr`, JSON.stringify(arr))
                localStorage.setItem(`lastArrPrev`, JSON.stringify(arrPrev))
                localStorage.setItem(`lastScore`, score)
                localStorage.setItem(`lastScorePrev`, scorePrev)
            }, tout * 1.2)
        }
    }
}

function undo() {
    clearBoxes()
    arr = [];
    generateFromArray(arrPrev)
    arr = JSON.parse(JSON.stringify(arrPrev));
    scoreUpdate(parseInt(scorePrev) - parseInt(score))
    score = scorePrev;
    localStorage.setItem(`lastArr`, JSON.stringify(arr))
    localStorage.setItem(`lastArrPrev`, JSON.stringify(arrPrev))
    localStorage.setItem(`lastScore`, score)
    localStorage.setItem(`lastScorePrev`, scorePrev)
    eventRun = true;
    gameOver()
}


// OTHER
function scaleGame() {
    const w = window.innerWidth / m
    const h = document.querySelector(".grid-container").clientHeight / n
    scale = w <= h ? w / 120 : h / 100
    gridGame.style.transform = `scale(${scale})`
}


function startEvents() {
    document.addEventListener('keydown', e => {
        if (e.code === "ArrowUp") {
            move("up")
        }
        if (e.code === "ArrowDown") {
            move("down")
        }
        if (e.code === "ArrowLeft") {
            move("left")
        }
        if (e.code === "ArrowRight") {
            move("right")
        }
    });
    document.addEventListener('swiped-up', e => {
        move("up")
    })
    document.addEventListener('swiped-down', e => {
        move("down")
    })
    document.addEventListener('swiped-left', e => {
        move("left")
    })
    document.addEventListener('swiped-right', e => {
        move("right")
    })
}


// START
window.addEventListener("resize", scaleGame);
generateGrid(4, 4);
scaleGame();
startEvents();

// MENU
menuReturn.addEventListener("click", e => {
    document.querySelector(".menu-active").classList.toggle("menu-active");
    menuMain.classList.toggle("menu-active");
    menuReturn.style.display = "none"
})

// CONTINUE
document.querySelector("#menu-continue").addEventListener("click", e => {
    

    m = parseInt(localStorage.getItem(`lastM`))
    n = parseInt(localStorage.getItem(`lastN`))
    score = parseInt(localStorage.getItem(`lastScore`))
    scorePrev = parseInt(localStorage.getItem(`lastScorePrev`))
    arr = JSON.parse(localStorage.getItem(`lastArr`))
    arrPrev = JSON.parse(localStorage.getItem(`lastArrPrev`))

    if (arr === null) {
        menuMain.classList.toggle("menu-active");
        document.querySelector(".menu-continue").classList.toggle("menu-active");
        menuReturn.style.display = "block";
        return null;
    }

    menuBurger.style.display = "flex";
    menuBurger.classList.remove("menu-burger-cross")
    menuReturn.style.display = "none";
    menuUndo.style.display = "block";
    document.querySelector(".menu-active").classList.toggle("menu-active");

    clearBoxes();
    clearGrid();
    generateGrid(m, n)
    generateFromArray(arr)
    scoreUpdate(0)
    scaleGame()
    eventRun = true;
})

// NEW GAME
document.querySelector("#menu-new").addEventListener("click", e => {
    menuMain.classList.toggle("menu-active");
    document.querySelector(".menu-new").classList.toggle("menu-active");
    menuReturn.style.display = "block";
})

document.querySelectorAll(".menu-new li").forEach(el => {
    el.addEventListener("click", e => {
        document.querySelectorAll(".menu-new li").forEach(el1 => {
            el1.classList.remove("selected")

        })
        el.classList.add("selected")
    })
})

document.querySelector("#inputX").addEventListener("change", e => {
    document.querySelector(".menu-new li:last-of-type").classList.toggle("selected")
})

document.querySelector('#menu-new-ok').addEventListener("click", e => {
    document.querySelector(".menu-new li:last-of-type").dataset.x = document.querySelector("#inputX").value
    document.querySelector(".menu-new li:last-of-type").dataset.y = document.querySelector("#inputY").value
    m = document.querySelector(".menu-new li.selected").dataset.x;
    n = document.querySelector(".menu-new li.selected").dataset.y;

    if (m > 16 || n > 16) {
        alert("Max 16")
        return null
    }
    if (m <= 0 || n <= 0) {
        alert("Min 1")
        return null
    }
    if (typeof m / 1 === NaN || typeof n / 1 === NaN) {
        alert("You have to type a number")
        return null
    }

    document.querySelector(".menu-active").classList.toggle("menu-active");
    menuBurger.style.display = "flex";
    menuBurger.classList.remove("menu-burger-cross")
    menuReturn.style.display = "none";
    menuUndo.style.display = "block";
    clearBoxes();
    arr = [];
    clearGrid();
    generateGrid(m, n);
    generateArray(m, n)
    gameOver()
    score = 0;
    scoreUpdate(0);
    scaleGame();
    eventRun = true;

    randomBox();
    arrPrev = JSON.parse(JSON.stringify(arr));
    // arr = [
    //     [2, 4, 8, 16, 32, 64],
    //     [128, 256, 512, 1024, 2048, 4096],
    //     [8192, 16384, 32768, 65536, 131072, ""],
    //     [65536, "", "", "", "", ""],
    //     [65536, "", "", "", "", ""],
    //     [65536, "", "", "", "", ""]
    // ]

    // generateFromArray(arr)

    localStorage.setItem(`lastArr`, JSON.stringify(arr))
    localStorage.setItem(`lastArrPrev`, JSON.stringify(arrPrev))
    localStorage.setItem(`lastScore`, score)
    localStorage.setItem(`lastScorePrev`, scorePrev)
    localStorage.setItem(`lastM`, m)
    localStorage.setItem(`lastN`, n)
    scaleGame();
    gameOver()
})


// BEST SCORES
document.querySelector("#menu-best").addEventListener("click", e => {
    menuMain.classList.toggle("menu-active");
    document.querySelector(".menu-best").classList.toggle("menu-active");
    menuReturn.style.display = "block";

    
    document.querySelectorAll(".menu-best .newTr").forEach(el => {
        el.remove()
    })
    for (let i = 1; i <= 16; i++) {
        for (let j = 1; j <= 16; j++) {
            if (!(localStorage.getItem(`best${i}x${j}`) === null || localStorage.getItem(`best${i}x${j}`) == 0)) {
                const newTr = document.createElement("tr")
                newTr.classList.add("newTr")
                newTr.innerHTML = (`
                    <td>${i} x ${j}</td>
                    <td>${localStorage.getItem(`best${i}x${j}`)} </td>
                `)
                if ((i === 3 && j === 3) || (i === 4 && j === 4) || (i === 6 && j === 6) || (i === 8 && j === 8)) {
                    document.querySelector(".menu-best-table-standard").appendChild(newTr)
                } else {
                    document.querySelector(".menu-best-table-custom").appendChild(newTr)
                }
            }
        }
    }

    if(document.querySelectorAll(".menu-best .newTr").length === 0) {
        document.querySelector(".menu-best-container").style.display = "none"
        document.querySelector(".menu-best-warning").style.display = "block"
    } else {
        document.querySelector(".menu-best-container").style.display = "block"
        document.querySelector(".menu-best-warning").style.display = "none"
    }
})


// HOW TO PLAY
document.querySelector("#menu-rules").addEventListener("click", e => {
    menuMain.classList.toggle("menu-active");
    document.querySelector(".menu-rules").classList.toggle("menu-active");
    menuReturn.style.display = "block";
})


// GAME
menuBurger.addEventListener("click", e => {
    menuBurger.classList.toggle("menu-burger-cross")
    if (menuBurger.classList.contains("menu-burger-cross")) {
        menuMain.classList.toggle("menu-active");
        menuUndo.style.display = "none"
    } else {
        menuUndo.style.display = "block";
        menuReturn.style.display = "none";
        document.querySelector(".menu-active").classList.toggle("menu-active");
    }
})

menuUndo.addEventListener("click", undo)
document.addEventListener("keydown", e => {
    if (e.key === "u") {
        undo()
    }
})


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}
  

//// WORKSHOP
document.addEventListener("keydown", e => {
    if (e.key === "t") {
        console.table(arr)
    }
})

// arr = [
//     [65536,"","",""],
//     [65536,"","",""],
//     [65536,"","",""],
//     [65536,"","",""]
// ]






