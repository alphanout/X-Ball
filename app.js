import paint from "./paint.js";
function a() {
    paint.draw();
    requestAnimationFrame(a);
}
a();