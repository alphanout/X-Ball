import paint from "../../paint.js";
class events extends paint {
    constructor() {
        if (!events.instance) {
            events.instance = this;
            this.rightPressed = false;
            this.leftPressed = false;
            this.relativeX = -1;
            document.addEventListener("keydown", this.keyDownHandler, false);
            document.addEventListener("keyup", this.keyUpHandler, false);
            document.addEventListener("mousemove", mouseMoveHandler, false);
        }
        return events.instance;
    }
    mouseMoveHandler(e) {
        let relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            this.relativeX = relativeX;
            // paddleX = relativeX - paddleWidth / 2;
        }
    }
    keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }
    keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }
}
const instance = new events();
Object.freeze(instance);
export default instance;