import paint from "./paint.js";
// import {Howl, Howler} from 'howler';
// import Stats from "./node_modules/stats-js/src/Stats.js";
function canvasSupport() {
    return !!document.createElement('testcanvas').getContext;
}
let sound;
let x = document.getElementById("welcome");
let y = document.getElementById("canvas");
let z = document.getElementsByClassName("start")[0];
y.style.display = "none";

function playsound() {
    sound = new Howl({
        src: ['./source/sounds/back.flac'],
        volume: 0.5,
        loop: true,
        // autoplay: true,
        // preload: true,
    });
    
    sound.once('load', () => {
        a();
    });
    sound.play();
}
let frame = null;

function a() {
    if (paint.end) sound.stop();

    paint.draw();
    frame = requestAnimationFrame(a);
}

function main() {
    // a();
    // setInterval(() => {
    // a();
    // }, 16.7 * 2);
    playsound();
}



function myFunction() {
    x.style.display = "none";
    y.style.display = "block";
    main();
}
z.addEventListener("click", myFunction);