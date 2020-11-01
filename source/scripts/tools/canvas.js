class canvas {
    // static #canvasId = 0;
    constructor() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.ctx = ctx;
        div = document.getElementById(canvas);
        canvas.id = "CursorLayer" + canvas.#canvasId++;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.zIndex = 8;
        canvas.style.position = "absolute";
        canvas.style.border = "1px solid";
        div.appendChild(canvas);
    }
    clear() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
export default canvas;