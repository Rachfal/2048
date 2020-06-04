require("../scss/main.scss")
require("./swiped-events")


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}

const tout = 100;
let m = 0;
let n = 0;
let score = 0;
let scorePrev = 0;
let arr = [];
let arrPrev = [];
let moved = false;
let scale = 1;
let eventRun = false;
let muted = true;

const menuMain = document.querySelector(".menu-main");
const menuNew = document.querySelector(".menu-new")
const menuBurger = document.querySelector(".menu-burger");
const menuReturn = document.querySelector(".menu-return");
const menuUndo = document.querySelector(".menu-undo");
const menuSound = document.querySelector(".menu-sound")
const gridGame = document.querySelector(".grid-game");
const gridGameOver = document.querySelector(".game-over");
const menuNewAlert = document.querySelector(".menu-new-alert");


// GRID
function generateGrid(m, n) {
    for (let i = 0; i < n; i++) {
        const newRow = document.createElement("div");
        newRow.classList.add("grid-row");
        gridGame.appendChild(newRow);
        for (let j = 0; j < m; j++) {
            const newBox = document.createElement("div");
            newBox.classList.add("grid");
            newRow.appendChild(newBox);
        }
    }
}

function clearGrid() {
    document.querySelectorAll(".grid-row").forEach(el => {
        el.remove();
    })
}

// ARRAY
function generateArray(m, n) {
    for (let i = 0; i < n; i++) {
        arr.push([]);
        for (let j = 0; j < m; j++) {
            arr[i].push("");
        }
    }
}

// BOX
function createBox(x, y, val, destination) {
    const newBox = document.createElement("div");
    newBox.classList.add(`box`);

    if (!(x === "" || y === "")) {
        newBox.classList.add(`box-${x}-${y}`);
    }

    if (val < 100000) {
        newBox.classList.add(`box-${val}`);
        newBox.innerText = `${val}`;
    } else {
        newBox.classList.add(`box-131072`);
        newBox.innerText = Math.floor(val / 1000) + "k";
    }
    destination.appendChild(newBox);
}

function randomBox() {
    let generate = false;
    arr.forEach(el => {
        if (el.includes("")) {
            generate = true;
        }
    })
    if (!generate) {
        return false;
    }
    let x = Math.floor(Math.random() * n);
    let y = Math.floor(Math.random() * m);
    while (arr[x][y] !== "") {
        x = Math.floor(Math.random() * n);
        y = Math.floor(Math.random() * m);
    }

    const val = Math.floor(Math.random() * (10) + 1) <= 7 ? 2 : 4;
    arr[x][y] = val;
    createBox(x, y, val, gridGame);
}

function generateFromArray(arr) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (arr[i][j] !== "") {
                createBox(i, j, arr[i][j], gridGame);
            }
        }
    }
}

function clearBoxes() {
    document.querySelectorAll(".box").forEach(el => {
        el.remove();
    })
}


// GAMEPLAY
function gameOver() {
    let over = true;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (arr[i][j] === "") {
                over = false;
                gridGameOver.style.display = "none";
                return false;
            }
        }
    }
    for (let j = 0; j < m; j++) {
        for (let i = 0; i < n - 1; i++) {
            if (arr[i][j] === arr[i + 1][j]) {
                over = false;
                gridGameOver.style.display = "none";
                return false;
            }
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m - 1; j++) {
            if (arr[i][j] === arr[i][j + 1]) {
                over = false
                gridGameOver.style.display = "none";
                return false
            }
        }
    }
    if (over) {
        gridGameOver.style.display = "flex";
        soundEffect("./sounds/gameover.wav")
    }
}

function scoreUpdate() {
    if (localStorage.getItem(`best${m}x${n}`) === null || score > localStorage.getItem(`best${m}x${n}`)) {
        localStorage.setItem(`best${m}x${n}`, score);
        let maxBox = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (arr[i][j] > maxBox) maxBox = arr[i][j];
            }
        }
        localStorage.setItem(`bestBox${m}x${n}`, maxBox);
    }
    document.querySelector("#score").innerText = score;
    document.querySelector("#best").innerText = localStorage.getItem(`best${m}x${n}`);
}


function moveFirstLoop(x1, x2, y1, y2) {
    if (arr[x1][y1] === "" && arr[x2][y2] !== "") {
        arr[x1][y1] = arr[x2][y2];
        arr[x2][y2] = "";
        const box2 = document.querySelector(`.box-${x2}-${y2}`);
        box2.classList.add(`box-${x1}-${y1}`);
        box2.classList.remove(`box-${x2}-${y2}`);
        moved = true;
    }
}

function moveSecondLoop(x1, x2, y1, y2, val) {
    if ((arr[x1][y1] === arr[x2][y2]) && (arr[x1][y1] !== "")) {
        arr[x1][y1] = 2 * val;
        arr[x2][y2] = "";
        const box1 = document.querySelector(`.box-${x1}-${y1}`);
        const box2 = document.querySelector(`.box-${x2}-${y2}`);
        box2.classList.add(`box-${x1}-${y1}`);
        box2.classList.remove(`box-${x2}-${y2}`);
        eventRun = false;
        box1.style.zIndex = 1;
        moved = true;
        score += (val * 2);
        setTimeout(() => {
            if (val < 65536) {
                box1.innerText = val * 2;
                box1.classList.add(`box-${val * 2}`);
                box1.classList.remove(`box-${val}`);
            } else if (val === 65536) {
                box1.innerText = Math.floor(val * 2 / 1000) + "k";
                box1.classList.add(`box-${val * 2}`);
                box1.classList.remove(`box-${val}`);
            } else {
                box1.innerText = Math.floor(val * 2 / 1000) + "k";
            }
            box1.classList.add(`box-buble`);
            box1.style.zIndex = 0;
            box2.remove();
            eventRun = true;

        }, tout)
        setTimeout(() => {
            box1.classList.remove(`box-buble`);
        }, tout * 2)
    }
}
function moveThirdLoop(x1, x2, y1, y2) {
    if (arr[x1][y1] === "" && arr[x2][y2] !== "") {
        arr[x1][y1] = arr[x2][y2];
        arr[x2][y2] = "";
        const box2 = document.querySelectorAll(`.box-${x2}-${y2}`);
        box2.forEach(el => {
            el.classList.add(`box-${x1}-${y1}`);
            el.classList.remove(`box-${x2}-${y2}`);
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
                        moveFirstLoop(i, i + 1, j, j);
                    }
                }
                for (let i = 0; i < n - 1; i++) {
                    moveSecondLoop(i, i + 1, j, j, arr[i][j]);
                }
                for (let k = 0; k < n - 1; k++) {
                    for (let i = 0; i < n - 1; i++) {
                        moveThirdLoop(i, i + 1, j, j);
                    }
                }
            }
        }

        if (dir === "down") {
            for (let j = 0; j < m; j++) {
                for (let k = 0; k < n - 1; k++) {
                    for (let i = n - 1; i > 0; i--) {
                        moveFirstLoop(i, i - 1, j, j);
                    }
                }
                for (let i = n - 1; i > 0; i--) {
                    moveSecondLoop(i, i - 1, j, j, arr[i][j]);
                }
                for (let k = 0; k < n - 1; k++) {
                    for (let i = n - 1; i > 0; i--) {
                        moveThirdLoop(i, i - 1, j, j);
                    }
                }
            }
        }

        if (dir === "left") {
            for (let i = 0; i < n; i++) {
                for (let k = 0; k < m - 1; k++) {
                    for (let j = 0; j < m - 1; j++) {
                        moveFirstLoop(i, i, j, j + 1);
                    }
                }
                for (let j = 0; j < m - 1; j++) {
                    moveSecondLoop(i, i, j, j + 1, arr[i][j]);
                }
                for (let k = 0; k < m - 1; k++) {
                    for (let j = 0; j < m - 1; j++) {
                        moveThirdLoop(i, i, j, j + 1);
                    }
                }
            }
        }

        if (dir === "right") {
            for (let i = 0; i < n; i++) {
                for (let k = 0; k < m - 1; k++) {
                    for (let j = m - 1; j > 0; j--) {
                        moveFirstLoop(i, i, j, j - 1);
                    }
                }
                for (let j = m - 1; j > 0; j--) {
                    moveSecondLoop(i, i, j, j - 1, arr[i][j]);
                }
                for (let k = 0; k < m - 1; k++) {
                    for (let j = m - 1; j > 0; j--) {
                        moveThirdLoop(i, i, j, j - 1);
                    }
                }
            }
        }

        if (moved) {
            arrPrev = JSON.parse(JSON.stringify(arrTemp));
            scoreUpdate()
            scorePrev = scoreTemp;
            soundEffect("./sounds/swipe.wav");
            setTimeout(() => {
                if (scorePrev !== score) {
                    soundEffect("./sounds/point.wav")
                }
                randomBox();
                gameOver();
                localStorage.setItem(`lastArr`, JSON.stringify(arr));
                localStorage.setItem(`lastArrPrev`, JSON.stringify(arrPrev));
                localStorage.setItem(`lastScore`, score);
                localStorage.setItem(`lastScorePrev`, scorePrev);
            }, tout * 1.2);
        }
    }
}

function undo() {
    clearBoxes();
    arr = [];
    generateFromArray(arrPrev);
    arr = JSON.parse(JSON.stringify(arrPrev));
    score = scorePrev
    scoreUpdate();
    localStorage.setItem(`lastArr`, JSON.stringify(arr));
    localStorage.setItem(`lastArrPrev`, JSON.stringify(arrPrev));
    localStorage.setItem(`lastScore`, score);
    localStorage.setItem(`lastScorePrev`, scorePrev);
    eventRun = true;
    gameOver();
}

function soundEffect(src) {
    if (!muted) {
        const newAudio = document.createElement("audio");
        newAudio.src = src;
        newAudio.setAttribute("preload", "auto");
        newAudio.setAttribute("controls", "none");
        document.body.appendChild(newAudio);
        newAudio.play()
        setTimeout(() => {
            newAudio.remove()
        }, 2000)
    }
}

// OTHER
function scaleGame() {
    const w = window.innerWidth / m;
    const h = document.querySelector(".grid-container").clientHeight / n;
    scale = w <= h ? w / 120 : h / 100;
    gridGame.style.transform = `scale(${scale})`;
}

function setVhVariableForMobile() {
    var vh = window.innerHeight * 0.01; //calculate 1% of window.innerHeight
    document.documentElement.style.setProperty('--vh', vh + "px");
}

function menuClose() {
    document.querySelector(".menu-active").classList.toggle("menu-active");
    menuBurger.style.display = "flex";
    menuBurger.classList.remove("menu-burger-cross");
    menuReturn.style.display = "none";
    menuUndo.style.display = "block";
    menuSound.style.display = "none";
    eventRun = true;
}



function menuOpen() {
    if (arr != 0) {
        document.querySelector("#menu-continue").style.display = "block";
        document.querySelector("#menu-best").style.display = "block";
    }
    menuMain.classList.toggle("menu-active");
    menuBurger.classList.add("menu-burger-cross");
    menuReturn.style.display = "none";
    menuUndo.style.display = "none";
    menuSound.style.display = "block";
    eventRun = false;

}

function startEvents() {
    document.addEventListener('keydown', e => {
        if (e.code === "ArrowUp") {
            move("up");
        }
        if (e.code === "ArrowDown") {
            move("down");
        }
        if (e.code === "ArrowLeft") {
            move("left");
        }
        if (e.code === "ArrowRight") {
            move("right");
        }
    });
    document.addEventListener('swiped-up', e => {
        move("up");
    })
    document.addEventListener('swiped-down', e => {
        move("down");
    })
    document.addEventListener('swiped-left', e => {
        move("left");
    })
    document.addEventListener('swiped-right', e => {
        move("right");
    })

    {
        const clickableArr = [];
        document.body.querySelectorAll("*").forEach(el => {
            if (getComputedStyle(el).cursor === "pointer") {
                clickableArr.push(el)
            }
        })
        clickableArr.forEach(el => {
            el.addEventListener("click", e => {
                soundEffect("./sounds/menu.wav")
            })
        })
    }

}


// START

scaleGame();
window.addEventListener("resize", scaleGame);
generateGrid(4, 4);
setVhVariableForMobile();
window.addEventListener('resize', setVhVariableForMobile);
startEvents();
arr = JSON.parse(localStorage.getItem(`lastArr`));
if (arr === null) {
    document.querySelector("#menu-continue").style.display = "none";
    document.querySelector("#menu-best").style.display = "none";
}

// MENU
menuReturn.addEventListener("click", e => {
    document.querySelectorAll(".menu-active").forEach(el => {
        el.classList.toggle("menu-active");
    })
    menuMain.classList.toggle("menu-active");
    menuReturn.style.display = "none";
})

menuSound.addEventListener("click", e => {
    if (muted) {
        muted = false;
        menuSound.querySelector("img").src = "./img/volume-up-solid.svg"
    } else {
        muted = true;
        menuSound.querySelector("img").src = "./img/volume-mute-solid.svg"
    }

})



// CONTINUE
document.querySelector("#menu-continue").addEventListener("click", e => {
    m = parseInt(localStorage.getItem(`lastM`));
    n = parseInt(localStorage.getItem(`lastN`));
    score = parseInt(localStorage.getItem(`lastScore`));
    scorePrev = parseInt(localStorage.getItem(`lastScorePrev`));
    arr = JSON.parse(localStorage.getItem(`lastArr`));
    arrPrev = JSON.parse(localStorage.getItem(`lastArrPrev`));

    if (arr === null) {
        menuMain.classList.toggle("menu-active");
        document.querySelector(".menu-continue").classList.toggle("menu-active");
        menuReturn.style.display = "block";
        return null;
    }

    menuClose()
    clearBoxes();
    clearGrid();
    generateGrid(m, n);
    generateFromArray(arr);
    scoreUpdate();
    scaleGame();
    eventRun = true;
})



// NEW GAME
menuMain.querySelector("#menu-new").addEventListener("click", e => {
    menuMain.classList.toggle("menu-active");
    document.querySelector(".menu-new").classList.toggle("menu-active");
    menuReturn.style.display = "block";
})

menuNew.querySelectorAll("li").forEach((el, i) => {
    el.addEventListener("click", e => {
        menuNew.querySelectorAll("li").forEach(el1 => {
            el1.classList.remove("selected");
        })
        el.classList.add("selected");
        if (i !== menuNew.querySelectorAll("li").length - 1) {
            m = menuNew.querySelector("li.selected").dataset.x;
            n = menuNew.querySelector("li.selected").dataset.y;
            newGame()
        }

    })
})

menuNewAlert.querySelector("span").addEventListener("click", e => {
    menuNewAlert.classList.toggle("menu-active");
})

menuNew.querySelector('form').addEventListener("submit", e => {
    e.preventDefault()
    menuNew.querySelector("li:last-of-type").dataset.x = menuNew.querySelector("#inputX").value;
    menuNew.querySelector("li:last-of-type").dataset.y = menuNew.querySelector("#inputY").value;
    m = menuNew.querySelector("li.selected").dataset.x;
    n = menuNew.querySelector("li.selected").dataset.y;
    newGame()
})

function newGame() {
    if (m > 16 || n > 16) {
        menuNewAlert.classList.toggle("menu-active");
        menuNewAlert.querySelector("h3").innerText = "Max 16";
        return null
    }
    if (m <= 0 || n <= 0) {
        menuNewAlert.classList.toggle("menu-active");
        menuNewAlert.querySelector("h3").innerText = "Min 1";
        return null
    }
    if (typeof m / 1 === NaN || typeof n / 1 === NaN) {
        menuNewAlert.classList.toggle("menu-active");
        menuNewAlert.querySelector("h3").innerText = "You have to type a number";
        return null
    }

    menuClose()
    clearBoxes();
    arr = [];
    clearGrid();
    generateGrid(m, n);
    generateArray(m, n)
    gameOver();
    score = 0;
    scoreUpdate();
    scaleGame();
    eventRun = true;

    randomBox();
    arrPrev = JSON.parse(JSON.stringify(arr));


    localStorage.setItem(`lastArr`, JSON.stringify(arr));
    localStorage.setItem(`lastArrPrev`, JSON.stringify(arrPrev));
    localStorage.setItem(`lastScore`, score);
    localStorage.setItem(`lastScorePrev`, scorePrev);
    localStorage.setItem(`lastM`, m);
    localStorage.setItem(`lastN`, n);
    scaleGame();
    gameOver();
}

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
                    <td><div class="box-container"></div></td>
                `)
                createBox("", "", localStorage.getItem(`bestBox${i}x${j}`), newTr.querySelector(".box-container"));
                if ((i === 3 && j === 3) || (i === 4 && j === 4) || (i === 6 && j === 6) || (i === 8 && j === 8)) {
                    document.querySelector(".menu-best-table-standard").appendChild(newTr)
                } else {
                    document.querySelector(".menu-best-table-custom").appendChild(newTr)
                }
            }
        }
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
    if (menuBurger.classList.contains("menu-burger-cross")) {
        menuClose()
    } else {
        menuOpen()
    }
})

menuUndo.addEventListener("click", undo)
document.addEventListener("keydown", e => {
    if (e.key === "u") {
        undo();
    }
})
