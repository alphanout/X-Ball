/*jshint esversion: 6 */
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
var rightPressed = false;
var leftPressed = false;
class draw {
    constructor() {
        this.canvas = canvas;
        this.ctx = ctx;
        // ctx.beginPath();
        // ctx.rect(20, 40, 50, 50);
        // ctx.fillStyle = "#FF0000";
        // ctx.fill();
        // ctx.closePath();
        // ctx.beginPath();
        // ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
        // ctx.fillStyle = "green";
        // ctx.fill();
        // ctx.closePath();
        // ctx.beginPath();
        // ctx.rect(160, 10, 100, 40);
        // ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
        // ctx.stroke();
        // ctx.closePath();
    }
    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw.drawball();
        draw.drawPaddle();
        x += dx;
        y += dy;

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
            dy = -dy;
        }

    }

    static drawball() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    static drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight - 5, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}
let obj;
obj = (obj === undefined || obj === null) ? new draw() : obj;
export default obj;