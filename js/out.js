!function(e){var t={};function o(p){if(t[p])return t[p].exports;var n=t[p]={i:p,l:!1,exports:{}};return e[p].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,p){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:p})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var p=Object.create(null);if(o.r(p),Object.defineProperty(p,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(p,n,function(t){return e[t]}.bind(null,n));return p},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){o(1),o(5);let p=0,n=0,l=0,x=0,r=[],i=[],a=!1,s=1,c=!1,f=!0;const u=document.querySelector(".menu-main"),d=document.querySelector(".menu-new"),b=document.querySelector(".menu-burger"),m=document.querySelector(".menu-return"),g=document.querySelector(".menu-undo"),h=document.querySelector(".menu-sound"),y=document.querySelector(".grid-game"),v=document.querySelector(".game-over"),w=document.querySelector(".menu-new-alert");function S(e,t){for(let o=0;o<t;o++){const t=document.createElement("div");t.classList.add("grid-row"),y.appendChild(t);for(let o=0;o<e;o++){const e=document.createElement("div");e.classList.add("grid"),t.appendChild(e)}}}function k(){document.querySelectorAll(".grid-row").forEach(e=>{e.remove()})}function L(e,t,o,p){const n=document.createElement("div");n.classList.add("box"),""!==e&&""!==t&&n.classList.add(`box-${e}-${t}`),o<1e5?(n.classList.add(`box-${o}`),n.innerText=`${o}`):(n.classList.add("box-131072"),n.innerText=Math.floor(o/1e3)+"k"),p.appendChild(n)}function q(){let e=!1;if(r.forEach(t=>{t.includes("")&&(e=!0)}),!e)return!1;let t=Math.floor(Math.random()*n),o=Math.floor(Math.random()*p);for(;""!==r[t][o];)t=Math.floor(Math.random()*n),o=Math.floor(Math.random()*p);const l=Math.floor(10*Math.random()+1)<=7?2:4;r[t][o]=l,L(t,o,l,y)}function E(e){for(let t=0;t<n;t++)for(let o=0;o<p;o++)""!==e[t][o]&&L(t,o,e[t][o],y)}function $(){document.querySelectorAll(".box").forEach(e=>{e.remove()})}function I(){let e=!0;for(let t=0;t<n;t++)for(let o=0;o<p;o++)if(""===r[t][o])return e=!1,v.style.display="none",!1;for(let t=0;t<p;t++)for(let o=0;o<n-1;o++)if(r[o][t]===r[o+1][t])return e=!1,v.style.display="none",!1;for(let t=0;t<n;t++)for(let o=0;o<p-1;o++)if(r[t][o]===r[t][o+1])return e=!1,v.style.display="none",!1;e&&(v.style.display="flex",O("../sounds/gameover.wav"))}function z(){if(null===localStorage.getItem(`best${p}x${n}`)||l>localStorage.getItem(`best${p}x${n}`)){localStorage.setItem(`best${p}x${n}`,l);let e=0;for(let t=0;t<n;t++)for(let o=0;o<p;o++)r[t][o]>e&&(e=r[t][o]);localStorage.setItem(`bestBox${p}x${n}`,e)}document.querySelector("#score").innerText=l,document.querySelector("#best").innerText=localStorage.getItem(`best${p}x${n}`)}function j(e,t,o,p){if(""===r[e][o]&&""!==r[t][p]){r[e][o]=r[t][p],r[t][p]="";const n=document.querySelector(`.box-${t}-${p}`);n.classList.add(`box-${e}-${o}`),n.classList.remove(`box-${t}-${p}`),a=!0}}function M(e,t,o,p,n){if(r[e][o]===r[t][p]&&""!==r[e][o]){r[e][o]=2*n,r[t][p]="";const x=document.querySelector(`.box-${e}-${o}`),i=document.querySelector(`.box-${t}-${p}`);i.classList.add(`box-${e}-${o}`),i.classList.remove(`box-${t}-${p}`),c=!1,x.style.zIndex=1,a=!0,l+=2*n,setTimeout(()=>{n<65536?(x.innerText=2*n,x.classList.add(`box-${2*n}`),x.classList.remove(`box-${n}`)):65536===n?(x.innerText=Math.floor(2*n/1e3)+"k",x.classList.add(`box-${2*n}`),x.classList.remove(`box-${n}`)):x.innerText=Math.floor(2*n/1e3)+"k",x.classList.add("box-buble"),x.style.zIndex=0,i.remove(),c=!0},100),setTimeout(()=>{x.classList.remove("box-buble")},200)}}function A(e,t,o,p){if(""===r[e][o]&&""!==r[t][p]){r[e][o]=r[t][p],r[t][p]="",document.querySelectorAll(`.box-${t}-${p}`).forEach(n=>{n.classList.add(`box-${e}-${o}`),n.classList.remove(`box-${t}-${p}`)})}}function N(e){if(c){if(a=!1,arrTemp=JSON.parse(JSON.stringify(r)),scoreTemp=l,"up"===e)for(let e=0;e<p;e++){for(let t=0;t<n-1;t++)for(let t=0;t<n-1;t++)j(t,t+1,e,e);for(let t=0;t<n-1;t++)M(t,t+1,e,e,r[t][e]);for(let t=0;t<n-1;t++)for(let t=0;t<n-1;t++)A(t,t+1,e,e)}if("down"===e)for(let e=0;e<p;e++){for(let t=0;t<n-1;t++)for(let t=n-1;t>0;t--)j(t,t-1,e,e);for(let t=n-1;t>0;t--)M(t,t-1,e,e,r[t][e]);for(let t=0;t<n-1;t++)for(let t=n-1;t>0;t--)A(t,t-1,e,e)}if("left"===e)for(let e=0;e<n;e++){for(let t=0;t<p-1;t++)for(let t=0;t<p-1;t++)j(e,e,t,t+1);for(let t=0;t<p-1;t++)M(e,e,t,t+1,r[e][t]);for(let t=0;t<p-1;t++)for(let t=0;t<p-1;t++)A(e,e,t,t+1)}if("right"===e)for(let e=0;e<n;e++){for(let t=0;t<p-1;t++)for(let t=p-1;t>0;t--)j(e,e,t,t-1);for(let t=p-1;t>0;t--)M(e,e,t,t-1,r[e][t]);for(let t=0;t<p-1;t++)for(let t=p-1;t>0;t--)A(e,e,t,t-1)}a&&(i=JSON.parse(JSON.stringify(arrTemp)),z(),x=scoreTemp,O("../sounds/swipe.wav"),setTimeout(()=>{x!==l&&O("../sounds/point.wav"),q(),I(),localStorage.setItem("lastArr",JSON.stringify(r)),localStorage.setItem("lastArrPrev",JSON.stringify(i)),localStorage.setItem("lastScore",l),localStorage.setItem("lastScorePrev",x)},120))}}function T(){$(),r=[],E(i),r=JSON.parse(JSON.stringify(i)),l=x,z(),localStorage.setItem("lastArr",JSON.stringify(r)),localStorage.setItem("lastArrPrev",JSON.stringify(i)),localStorage.setItem("lastScore",l),localStorage.setItem("lastScorePrev",x),c=!0,I()}function O(e){if(!f){const t=document.createElement("audio");t.src=e,t.setAttribute("preload","auto"),t.setAttribute("controls","none"),document.body.appendChild(t),t.play(),setTimeout(()=>{t.remove()},2e3)}}function C(){const e=window.innerWidth/p,t=document.querySelector(".grid-container").clientHeight/n;s=e<=t?e/120:t/100,y.style.transform=`scale(${s})`}function J(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh",e+"px")}function P(){document.querySelector(".menu-active").classList.toggle("menu-active"),b.style.display="flex",b.classList.remove("menu-burger-cross"),m.style.display="none",g.style.display="block",h.style.display="none"}function _(){return p>16||n>16?(w.classList.toggle("menu-active"),w.querySelector("h3").innerText="Max 16",null):p<=0||n<=0?(w.classList.toggle("menu-active"),w.querySelector("h3").innerText="Min 1",null):typeof p/1===NaN||typeof n/1===NaN?(w.classList.toggle("menu-active"),w.querySelector("h3").innerText="You have to type a number",null):(P(),$(),r=[],k(),S(p,n),function(e,t){for(let o=0;o<t;o++){r.push([]);for(let t=0;t<e;t++)r[o].push("")}}(p,n),I(),l=0,z(),C(),c=!0,q(),i=JSON.parse(JSON.stringify(r)),localStorage.setItem("lastArr",JSON.stringify(r)),localStorage.setItem("lastArrPrev",JSON.stringify(i)),localStorage.setItem("lastScore",l),localStorage.setItem("lastScorePrev",x),localStorage.setItem("lastM",p),localStorage.setItem("lastN",n),C(),void I())}C(),window.addEventListener("resize",C),S(4,4),J(),window.addEventListener("resize",J),function(){document.addEventListener("keydown",e=>{"ArrowUp"===e.code&&N("up"),"ArrowDown"===e.code&&N("down"),"ArrowLeft"===e.code&&N("left"),"ArrowRight"===e.code&&N("right")}),document.addEventListener("swiped-up",e=>{N("up")}),document.addEventListener("swiped-down",e=>{N("down")}),document.addEventListener("swiped-left",e=>{N("left")}),document.addEventListener("swiped-right",e=>{N("right")});{const e=[];document.body.querySelectorAll("*").forEach(t=>{"pointer"===getComputedStyle(t).cursor&&e.push(t)}),e.forEach(e=>{e.addEventListener("click",e=>{O("../sounds/menu.wav")})})}}(),r=JSON.parse(localStorage.getItem("lastArr")),null===r&&(document.querySelector("#menu-continue").style.display="none",document.querySelector("#menu-best").style.display="none"),m.addEventListener("click",e=>{document.querySelectorAll(".menu-active").forEach(e=>{e.classList.toggle("menu-active")}),u.classList.toggle("menu-active"),m.style.display="none"}),h.addEventListener("click",e=>{f?(f=!1,h.querySelector("img").src="./img/volume-up-solid.svg"):(f=!0,h.querySelector("img").src="./img/volume-mute-solid.svg")}),document.querySelector("#menu-continue").addEventListener("click",e=>{if(p=parseInt(localStorage.getItem("lastM")),n=parseInt(localStorage.getItem("lastN")),l=parseInt(localStorage.getItem("lastScore")),x=parseInt(localStorage.getItem("lastScorePrev")),r=JSON.parse(localStorage.getItem("lastArr")),i=JSON.parse(localStorage.getItem("lastArrPrev")),null===r)return u.classList.toggle("menu-active"),document.querySelector(".menu-continue").classList.toggle("menu-active"),m.style.display="block",null;P(),$(),k(),S(p,n),E(r),z(),C(),c=!0}),u.querySelector("#menu-new").addEventListener("click",e=>{u.classList.toggle("menu-active"),document.querySelector(".menu-new").classList.toggle("menu-active"),m.style.display="block"}),d.querySelectorAll("li").forEach((e,t)=>{e.addEventListener("click",o=>{d.querySelectorAll("li").forEach(e=>{e.classList.remove("selected")}),e.classList.add("selected"),t!==d.querySelectorAll("li").length-1&&(p=d.querySelector("li.selected").dataset.x,n=d.querySelector("li.selected").dataset.y,_())})}),w.querySelector("span").addEventListener("click",e=>{w.classList.toggle("menu-active")}),d.querySelector("form").addEventListener("submit",e=>{e.preventDefault(),d.querySelector("li:last-of-type").dataset.x=d.querySelector("#inputX").value,d.querySelector("li:last-of-type").dataset.y=d.querySelector("#inputY").value,p=d.querySelector("li.selected").dataset.x,n=d.querySelector("li.selected").dataset.y,_()}),document.querySelector("#menu-best").addEventListener("click",e=>{u.classList.toggle("menu-active"),document.querySelector(".menu-best").classList.toggle("menu-active"),m.style.display="block",document.querySelectorAll(".menu-best .newTr").forEach(e=>{e.remove()});for(let e=1;e<=16;e++)for(let t=1;t<=16;t++)if(null!==localStorage.getItem(`best${e}x${t}`)&&0!=localStorage.getItem(`best${e}x${t}`)){const o=document.createElement("tr");o.classList.add("newTr"),o.innerHTML=`\n                    <td>${e} x ${t}</td>\n                    <td>${localStorage.getItem(`best${e}x${t}`)} </td>\n                    <td><div class="box-container"></div></td>\n                `,L("","",localStorage.getItem(`bestBox${e}x${t}`),o.querySelector(".box-container")),3===e&&3===t||4===e&&4===t||6===e&&6===t||8===e&&8===t?document.querySelector(".menu-best-table-standard").appendChild(o):document.querySelector(".menu-best-table-custom").appendChild(o)}}),document.querySelector("#menu-rules").addEventListener("click",e=>{u.classList.toggle("menu-active"),document.querySelector(".menu-rules").classList.toggle("menu-active"),m.style.display="block"}),b.addEventListener("click",e=>{b.classList.contains("menu-burger-cross")?P():(0!=r&&(document.querySelector("#menu-continue").style.display="block",document.querySelector("#menu-best").style.display="block"),u.classList.toggle("menu-active"),b.classList.add("menu-burger-cross"),m.style.display="none",g.style.display="none",h.style.display="block")}),g.addEventListener("click",T),document.addEventListener("keydown",e=>{"u"===e.key&&T()}),"serviceWorker"in navigator&&navigator.serviceWorker.register("service-worker.js")},function(e,t,o){var p=o(2),n=o(3);"string"==typeof(n=n.__esModule?n.default:n)&&(n=[[e.i,n,""]]);var l={insert:"head",singleton:!1},x=(p(n,l),n.locals?n.locals:{});e.exports=x},function(e,t,o){"use strict";var p,n=function(){return void 0===p&&(p=Boolean(window&&document&&document.all&&!window.atob)),p},l=function(){var e={};return function(t){if(void 0===e[t]){var o=document.querySelector(t);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(e){o=null}e[t]=o}return e[t]}}(),x=[];function r(e){for(var t=-1,o=0;o<x.length;o++)if(x[o].identifier===e){t=o;break}return t}function i(e,t){for(var o={},p=[],n=0;n<e.length;n++){var l=e[n],i=t.base?l[0]+t.base:l[0],a=o[i]||0,s="".concat(i," ").concat(a);o[i]=a+1;var c=r(s),f={css:l[1],media:l[2],sourceMap:l[3]};-1!==c?(x[c].references++,x[c].updater(f)):x.push({identifier:s,updater:m(f,t),references:1}),p.push(s)}return p}function a(e){var t=document.createElement("style"),p=e.attributes||{};if(void 0===p.nonce){var n=o.nc;n&&(p.nonce=n)}if(Object.keys(p).forEach((function(e){t.setAttribute(e,p[e])})),"function"==typeof e.insert)e.insert(t);else{var x=l(e.insert||"head");if(!x)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");x.appendChild(t)}return t}var s,c=(s=[],function(e,t){return s[e]=t,s.filter(Boolean).join("\n")});function f(e,t,o,p){var n=o?"":p.media?"@media ".concat(p.media," {").concat(p.css,"}"):p.css;if(e.styleSheet)e.styleSheet.cssText=c(t,n);else{var l=document.createTextNode(n),x=e.childNodes;x[t]&&e.removeChild(x[t]),x.length?e.insertBefore(l,x[t]):e.appendChild(l)}}function u(e,t,o){var p=o.css,n=o.media,l=o.sourceMap;if(n?e.setAttribute("media",n):e.removeAttribute("media"),l&&btoa&&(p+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(l))))," */")),e.styleSheet)e.styleSheet.cssText=p;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(p))}}var d=null,b=0;function m(e,t){var o,p,n;if(t.singleton){var l=b++;o=d||(d=a(t)),p=f.bind(null,o,l,!1),n=f.bind(null,o,l,!0)}else o=a(t),p=u.bind(null,o,t),n=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(o)};return p(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;p(e=t)}else n()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=n());var o=i(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var p=0;p<o.length;p++){var n=r(o[p]);x[n].references--}for(var l=i(e,t),a=0;a<o.length;a++){var s=r(o[a]);0===x[s].references&&(x[s].updater(),x.splice(s,1))}o=l}}}},function(e,t,o){(t=o(4)(!1)).push([e.i,'body,html{-webkit-overflow-scrolling:touch;margin:0;padding:0;background:#faf8ef;font-family:sans-serif;color:#353535;overscroll-behavior:none;height:100%;overflow:hidden}a{text-decoration:none;color:inherit}div:focus,div:active,button:focus,button:active,a:focus,a:active{outline:none}*{box-sizing:border-box}button{font-size:100%;font-family:inherit;border:0;padding:0;background:inherit;cursor:pointer;color:inherit}audio{display:none}.container{max-width:600px;margin:0 auto;position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center}.menu{display:flex;flex-direction:column;justify-content:center;align-items:center}.menu-buttons{z-index:10000000;position:absolute;top:20px;left:20px;font-size:50px;display:flex;flex-direction:column;align-items:center}.menu-buttons button{font-weight:bold;margin-right:10px;margin-bottom:10px}.menu-burger{display:flex;flex-direction:column;justify-content:space-between;height:30px;display:none}.menu-burger span{width:40px;height:5px;background:#353535;transition:all 300ms ease-in-out}.menu-buttons-menu{display:flex;align-items:center}.menu-burger-cross span:first-child{transform:translate(3px, 12.5px) rotate(45deg)}.menu-burger-cross span:nth-child(2){transform:translate(-1000px)}.menu-burger-cross span:last-child{transform:translate(3px, -12.5px) rotate(-45deg)}.menu-return{display:none;line-height:0;height:30px}.menu-undo{display:none}.menu-sound{z-index:10000000;position:absolute;top:20px;right:20px}.menu-sound img{margin-left:0;margin-right:auto;width:50px;height:40px}.menu-new h2{text-align:center}.menu-main,.menu-new,.menu-rules,.menu-best{padding-top:80px;height:calc(var(--vh, 1vh) * 100);width:100vw;position:absolute;top:0;z-index:9999;background:#e9e3dc;flex-direction:column;justify-content:space-evenly;align-items:center;display:none;padding-bottom:50px}.menu h1{font-size:65px;display:flex;background:#bdad9e;border-radius:5px;padding:4px;height:86px}.menu h1 span{display:flex;justify-content:center;align-items:center;transition:linear 100ms;font-weight:bold;border-radius:4px;width:70px;height:70px;margin:4px}.menu h1 span:nth-child(1){background:#eee4da}.menu h1 span:nth-child(2){background:#dbd2c9}.menu h1 span:nth-child(3){background:#ede0c8}.menu h1 span:nth-child(4){background:#f2b179}.menu-new{display:none}.menu-new-alert{display:none;align-items:center;justify-content:center;width:100vw;height:calc(var(--vh, 1vh) * 100);background:rgba(250,248,239,0.95);position:absolute;left:50vw;top:50vh;transform:translate(-50%, -50%);z-index:1000000;color:#e0e0e0;font-size:30px}.menu-new-alert div{display:flex;align-items:center;justify-content:center;background:#5f564d;width:300px;height:200px;border-radius:20px;position:relative;padding:0}.menu-new-alert div span{content:"x";position:absolute;top:10px;right:20px;cursor:pointer}.menu-new h2{width:200px}.menu ul{height:100%;width:100%;display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;padding:0}.menu li{font-size:24px;font-weight:bold;width:280px;line-height:50px;list-style:none;cursor:pointer;background:#cebdae;text-align:center;border-radius:5px;margin:5px;transition:300ms ease-in-out}.menu li:hover,.menu li.selected{background:#5f564d;color:#e0e0e0;font-size:1.5em}.menu li:hover input,.menu li.selected input{background:#72685d}.menu-new{padding-bottom:100px}.menu-new li{font-size:20px}.menu-new input{color:inherit;font-weight:bold;font-size:inherit;display:inline-block;text-align:center;width:50px}.menu-new input{border:none;background:#e9d9c9}.menu-new p{line-height:0.1}#menu-new-ok{background:#2e2823;color:#e0e0e0;font-weight:bold;font-size:25px;width:100px;height:50px;text-align:center;margin-left:10px;border-radius:5px;transition:500ms ease-in-out;margin-bottom:10px}#menu-new-ok:hover{background:#302a24;transform:scale(1.1)}.menu-best-container{max-height:800px;overflow-y:auto;width:300px;border:4px solid #cabcae}.menu-best{justify-content:flex-start}.menu-best table{width:100%;text-align:center;margin:0;font-size:18px;border-collapse:collapse;border-radius:1px;overflow:hidden}.menu-best table td,.menu-best table th{width:150px;height:40px;padding:5px;border:2px solid #cabcae}.menu-best table .box-container{margin:auto;background:#bdad9e;height:37px;width:37px;border-radius:5px;display:flex;align-items:center;justify-content:center;position:relative}.menu-best table .box-container div{transform:scale(0.35)}.menu-rules{text-align:center;font-weight:bold}.menu-rules img{width:60px;height:80px}.menu-rules-row{height:80px;width:350px;display:flex;justify-content:space-evenly;align-items:center}.menu-rules-row div{width:100px;display:flex;justify-content:center;align-items:center}.menu-rules .key-arrows{margin:0;display:flex;flex-direction:column;justify-content:center;align-items:center}.menu-rules .key-arrows div:last-child{display:flex}.menu-rules .key{margin:0.5px;font-weight:bold;display:flex;justify-content:center;align-items:center;border-radius:2px;border:1.5px solid #353535;width:25px;height:25px}.menu-rules .icons{font-weight:normal;font-size:6px;position:absolute;bottom:10px}.menu-active{display:flex}.header{width:100%;margin:20px;margin-bottom:60px}.header-score{display:flex;justify-content:flex-end;height:75px;line-height:0.7}.header-score div{background:#cdc1b5;width:100px;text-align:center;margin-left:10px;border-radius:5px;margin-right:20px}.game-over{color:white;width:100%;height:100%;position:absolute;z-index:99999;background:rgba(102,82,63,0.9);text-align:center;top:0;left:0;display:flex;justify-content:center;align-items:center;display:none}.game-over h2{font-size:40px}.grid-container{display:flex;justify-content:center;align-items:center;max-height:calc(100vh - 200px)}.grid-game{background:#bdad9e;margin:auto;display:inline-block;padding:4px;position:relative;border-radius:5px;transform-origin:top center}.grid-row{display:flex}.grid{background:#cdc1b5;display:flex;justify-content:center;align-items:center;border-radius:4px}.box{display:flex;justify-content:center;align-items:center;position:absolute;transition:linear 100ms;font-weight:bold;border-radius:4px}.box-buble{transform:scale(1.2)}.grid{height:94px;width:94px;margin:2px}.box{height:94px;width:94px}.box-0-0{top:6px;left:6px}.box-0-1{top:6px;left:104px}.box-0-2{top:6px;left:202px}.box-0-3{top:6px;left:300px}.box-0-4{top:6px;left:398px}.box-0-5{top:6px;left:496px}.box-0-6{top:6px;left:594px}.box-0-7{top:6px;left:692px}.box-0-8{top:6px;left:790px}.box-0-9{top:6px;left:888px}.box-0-10{top:6px;left:986px}.box-0-11{top:6px;left:1084px}.box-0-12{top:6px;left:1182px}.box-0-13{top:6px;left:1280px}.box-0-14{top:6px;left:1378px}.box-0-15{top:6px;left:1476px}.box-1-0{top:104px;left:6px}.box-1-1{top:104px;left:104px}.box-1-2{top:104px;left:202px}.box-1-3{top:104px;left:300px}.box-1-4{top:104px;left:398px}.box-1-5{top:104px;left:496px}.box-1-6{top:104px;left:594px}.box-1-7{top:104px;left:692px}.box-1-8{top:104px;left:790px}.box-1-9{top:104px;left:888px}.box-1-10{top:104px;left:986px}.box-1-11{top:104px;left:1084px}.box-1-12{top:104px;left:1182px}.box-1-13{top:104px;left:1280px}.box-1-14{top:104px;left:1378px}.box-1-15{top:104px;left:1476px}.box-2-0{top:202px;left:6px}.box-2-1{top:202px;left:104px}.box-2-2{top:202px;left:202px}.box-2-3{top:202px;left:300px}.box-2-4{top:202px;left:398px}.box-2-5{top:202px;left:496px}.box-2-6{top:202px;left:594px}.box-2-7{top:202px;left:692px}.box-2-8{top:202px;left:790px}.box-2-9{top:202px;left:888px}.box-2-10{top:202px;left:986px}.box-2-11{top:202px;left:1084px}.box-2-12{top:202px;left:1182px}.box-2-13{top:202px;left:1280px}.box-2-14{top:202px;left:1378px}.box-2-15{top:202px;left:1476px}.box-3-0{top:300px;left:6px}.box-3-1{top:300px;left:104px}.box-3-2{top:300px;left:202px}.box-3-3{top:300px;left:300px}.box-3-4{top:300px;left:398px}.box-3-5{top:300px;left:496px}.box-3-6{top:300px;left:594px}.box-3-7{top:300px;left:692px}.box-3-8{top:300px;left:790px}.box-3-9{top:300px;left:888px}.box-3-10{top:300px;left:986px}.box-3-11{top:300px;left:1084px}.box-3-12{top:300px;left:1182px}.box-3-13{top:300px;left:1280px}.box-3-14{top:300px;left:1378px}.box-3-15{top:300px;left:1476px}.box-4-0{top:398px;left:6px}.box-4-1{top:398px;left:104px}.box-4-2{top:398px;left:202px}.box-4-3{top:398px;left:300px}.box-4-4{top:398px;left:398px}.box-4-5{top:398px;left:496px}.box-4-6{top:398px;left:594px}.box-4-7{top:398px;left:692px}.box-4-8{top:398px;left:790px}.box-4-9{top:398px;left:888px}.box-4-10{top:398px;left:986px}.box-4-11{top:398px;left:1084px}.box-4-12{top:398px;left:1182px}.box-4-13{top:398px;left:1280px}.box-4-14{top:398px;left:1378px}.box-4-15{top:398px;left:1476px}.box-5-0{top:496px;left:6px}.box-5-1{top:496px;left:104px}.box-5-2{top:496px;left:202px}.box-5-3{top:496px;left:300px}.box-5-4{top:496px;left:398px}.box-5-5{top:496px;left:496px}.box-5-6{top:496px;left:594px}.box-5-7{top:496px;left:692px}.box-5-8{top:496px;left:790px}.box-5-9{top:496px;left:888px}.box-5-10{top:496px;left:986px}.box-5-11{top:496px;left:1084px}.box-5-12{top:496px;left:1182px}.box-5-13{top:496px;left:1280px}.box-5-14{top:496px;left:1378px}.box-5-15{top:496px;left:1476px}.box-6-0{top:594px;left:6px}.box-6-1{top:594px;left:104px}.box-6-2{top:594px;left:202px}.box-6-3{top:594px;left:300px}.box-6-4{top:594px;left:398px}.box-6-5{top:594px;left:496px}.box-6-6{top:594px;left:594px}.box-6-7{top:594px;left:692px}.box-6-8{top:594px;left:790px}.box-6-9{top:594px;left:888px}.box-6-10{top:594px;left:986px}.box-6-11{top:594px;left:1084px}.box-6-12{top:594px;left:1182px}.box-6-13{top:594px;left:1280px}.box-6-14{top:594px;left:1378px}.box-6-15{top:594px;left:1476px}.box-7-0{top:692px;left:6px}.box-7-1{top:692px;left:104px}.box-7-2{top:692px;left:202px}.box-7-3{top:692px;left:300px}.box-7-4{top:692px;left:398px}.box-7-5{top:692px;left:496px}.box-7-6{top:692px;left:594px}.box-7-7{top:692px;left:692px}.box-7-8{top:692px;left:790px}.box-7-9{top:692px;left:888px}.box-7-10{top:692px;left:986px}.box-7-11{top:692px;left:1084px}.box-7-12{top:692px;left:1182px}.box-7-13{top:692px;left:1280px}.box-7-14{top:692px;left:1378px}.box-7-15{top:692px;left:1476px}.box-8-0{top:790px;left:6px}.box-8-1{top:790px;left:104px}.box-8-2{top:790px;left:202px}.box-8-3{top:790px;left:300px}.box-8-4{top:790px;left:398px}.box-8-5{top:790px;left:496px}.box-8-6{top:790px;left:594px}.box-8-7{top:790px;left:692px}.box-8-8{top:790px;left:790px}.box-8-9{top:790px;left:888px}.box-8-10{top:790px;left:986px}.box-8-11{top:790px;left:1084px}.box-8-12{top:790px;left:1182px}.box-8-13{top:790px;left:1280px}.box-8-14{top:790px;left:1378px}.box-8-15{top:790px;left:1476px}.box-9-0{top:888px;left:6px}.box-9-1{top:888px;left:104px}.box-9-2{top:888px;left:202px}.box-9-3{top:888px;left:300px}.box-9-4{top:888px;left:398px}.box-9-5{top:888px;left:496px}.box-9-6{top:888px;left:594px}.box-9-7{top:888px;left:692px}.box-9-8{top:888px;left:790px}.box-9-9{top:888px;left:888px}.box-9-10{top:888px;left:986px}.box-9-11{top:888px;left:1084px}.box-9-12{top:888px;left:1182px}.box-9-13{top:888px;left:1280px}.box-9-14{top:888px;left:1378px}.box-9-15{top:888px;left:1476px}.box-10-0{top:986px;left:6px}.box-10-1{top:986px;left:104px}.box-10-2{top:986px;left:202px}.box-10-3{top:986px;left:300px}.box-10-4{top:986px;left:398px}.box-10-5{top:986px;left:496px}.box-10-6{top:986px;left:594px}.box-10-7{top:986px;left:692px}.box-10-8{top:986px;left:790px}.box-10-9{top:986px;left:888px}.box-10-10{top:986px;left:986px}.box-10-11{top:986px;left:1084px}.box-10-12{top:986px;left:1182px}.box-10-13{top:986px;left:1280px}.box-10-14{top:986px;left:1378px}.box-10-15{top:986px;left:1476px}.box-11-0{top:1084px;left:6px}.box-11-1{top:1084px;left:104px}.box-11-2{top:1084px;left:202px}.box-11-3{top:1084px;left:300px}.box-11-4{top:1084px;left:398px}.box-11-5{top:1084px;left:496px}.box-11-6{top:1084px;left:594px}.box-11-7{top:1084px;left:692px}.box-11-8{top:1084px;left:790px}.box-11-9{top:1084px;left:888px}.box-11-10{top:1084px;left:986px}.box-11-11{top:1084px;left:1084px}.box-11-12{top:1084px;left:1182px}.box-11-13{top:1084px;left:1280px}.box-11-14{top:1084px;left:1378px}.box-11-15{top:1084px;left:1476px}.box-12-0{top:1182px;left:6px}.box-12-1{top:1182px;left:104px}.box-12-2{top:1182px;left:202px}.box-12-3{top:1182px;left:300px}.box-12-4{top:1182px;left:398px}.box-12-5{top:1182px;left:496px}.box-12-6{top:1182px;left:594px}.box-12-7{top:1182px;left:692px}.box-12-8{top:1182px;left:790px}.box-12-9{top:1182px;left:888px}.box-12-10{top:1182px;left:986px}.box-12-11{top:1182px;left:1084px}.box-12-12{top:1182px;left:1182px}.box-12-13{top:1182px;left:1280px}.box-12-14{top:1182px;left:1378px}.box-12-15{top:1182px;left:1476px}.box-13-0{top:1280px;left:6px}.box-13-1{top:1280px;left:104px}.box-13-2{top:1280px;left:202px}.box-13-3{top:1280px;left:300px}.box-13-4{top:1280px;left:398px}.box-13-5{top:1280px;left:496px}.box-13-6{top:1280px;left:594px}.box-13-7{top:1280px;left:692px}.box-13-8{top:1280px;left:790px}.box-13-9{top:1280px;left:888px}.box-13-10{top:1280px;left:986px}.box-13-11{top:1280px;left:1084px}.box-13-12{top:1280px;left:1182px}.box-13-13{top:1280px;left:1280px}.box-13-14{top:1280px;left:1378px}.box-13-15{top:1280px;left:1476px}.box-14-0{top:1378px;left:6px}.box-14-1{top:1378px;left:104px}.box-14-2{top:1378px;left:202px}.box-14-3{top:1378px;left:300px}.box-14-4{top:1378px;left:398px}.box-14-5{top:1378px;left:496px}.box-14-6{top:1378px;left:594px}.box-14-7{top:1378px;left:692px}.box-14-8{top:1378px;left:790px}.box-14-9{top:1378px;left:888px}.box-14-10{top:1378px;left:986px}.box-14-11{top:1378px;left:1084px}.box-14-12{top:1378px;left:1182px}.box-14-13{top:1378px;left:1280px}.box-14-14{top:1378px;left:1378px}.box-14-15{top:1378px;left:1476px}.box-15-0{top:1476px;left:6px}.box-15-1{top:1476px;left:104px}.box-15-2{top:1476px;left:202px}.box-15-3{top:1476px;left:300px}.box-15-4{top:1476px;left:398px}.box-15-5{top:1476px;left:496px}.box-15-6{top:1476px;left:594px}.box-15-7{top:1476px;left:692px}.box-15-8{top:1476px;left:790px}.box-15-9{top:1476px;left:888px}.box-15-10{top:1476px;left:986px}.box-15-11{top:1476px;left:1084px}.box-15-12{top:1476px;left:1182px}.box-15-13{top:1476px;left:1280px}.box-15-14{top:1476px;left:1378px}.box-15-15{top:1476px;left:1476px}.box-2{background:#eee4da;font-size:60px}.box-4{background:#ede0c8;font-size:60px}.box-8{background:#f2b179;color:white;font-size:60px}.box-16{background:#ee8952;color:white;font-size:60px}.box-32{background:#e95d25;color:white;font-size:60px}.box-64{background:#f02121;color:white;font-size:60px}.box-128{background:#d4354f;color:white;font-size:50px}.box-256{background:#dd4b94;color:white;font-size:50px}.box-512{background:#f021ab;color:white;font-size:50px}.box-1024{background:#df21f0;color:white;font-size:40px}.box-2048{background:#a421f0;color:white;font-size:40px}.box-4096{background:#6921f0;color:white;font-size:40px}.box-8192{background:#18b8b0;color:white;font-size:40px}.box-16384{background:#1fa330;color:white;font-size:30px}.box-32768{background:#21680c;color:white;font-size:30px}.box-65536{background:#07440a;color:white;font-size:30px}.box-131072{background:#353535;color:white;font-size:40px}\n',""]),e.exports=t},function(e,t,o){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var o=function(e,t){var o=e[1]||"",p=e[3];if(!p)return o;if(t&&"function"==typeof btoa){var n=(x=p,r=btoa(unescape(encodeURIComponent(JSON.stringify(x)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),"/*# ".concat(i," */")),l=p.sources.map((function(e){return"/*# sourceURL=".concat(p.sourceRoot||"").concat(e," */")}));return[o].concat(l).concat([n]).join("\n")}var x,r,i;return[o].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(o,"}"):o})).join("")},t.i=function(e,o,p){"string"==typeof e&&(e=[[null,e,""]]);var n={};if(p)for(var l=0;l<this.length;l++){var x=this[l][0];null!=x&&(n[x]=!0)}for(var r=0;r<e.length;r++){var i=[].concat(e[r]);p&&n[i[0]]||(o&&(i[2]?i[2]="".concat(o," and ").concat(i[2]):i[2]=o),t.push(i))}},t}},function(e,t){
/*!
 * swiped-events.js - v@version@
 * Pure JavaScript swipe events
 * https://github.com/john-doherty/swiped-events
 * @inspiration https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
!function(e,t){"use strict";"function"!=typeof e.CustomEvent&&(e.CustomEvent=function(e,o){o=o||{bubbles:!1,cancelable:!1,detail:void 0};var p=t.createEvent("CustomEvent");return p.initCustomEvent(e,o.bubbles,o.cancelable,o.detail),p},e.CustomEvent.prototype=e.Event.prototype),t.addEventListener("touchstart",(function(e){if("true"===e.target.getAttribute("data-swipe-ignore"))return;r=e.target,x=Date.now(),o=e.touches[0].clientX,p=e.touches[0].clientY,n=0,l=0}),!1),t.addEventListener("touchmove",(function(e){if(!o||!p)return;var t=e.touches[0].clientX,x=e.touches[0].clientY;n=o-t,l=p-x}),!1),t.addEventListener("touchend",(function(e){if(r!==e.target)return;var t=parseInt(r.getAttribute("data-swipe-threshold")||"20",10),i=parseInt(r.getAttribute("data-swipe-timeout")||"500",10),a=Date.now()-x,s="";Math.abs(n)>Math.abs(l)?Math.abs(n)>t&&a<i&&(s=n>0?"swiped-left":"swiped-right"):Math.abs(l)>t&&a<i&&(s=l>0?"swiped-up":"swiped-down");""!==s&&r.dispatchEvent(new CustomEvent(s,{bubbles:!0,cancelable:!0}));o=null,p=null,x=null}),!1);var o=null,p=null,n=null,l=null,x=null,r=null}(window,document)}]);
//# sourceMappingURL=out.js.map