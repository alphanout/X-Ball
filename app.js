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

// Add a new type of ball with different properties (e.g., size, speed, color) to the game
class Ball {
    constructor(x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.dx = speed;
        this.dy = -speed;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(canvas) {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        } else if (this.y + this.dy > canvas.height - this.radius) {
            if (this.x > paddleX && this.x < paddleX + paddleWidth) {
                this.dy = -this.dy;
            } else {
                running = false;
                lives--;
                if (!lives) {
                    end = true;
                    alert("GAME OVER");
                    status = -1;
                    document.location.reload();
                } else {
                    this.x = canvas.width / 2;
                    this.y = canvas.height - 30;
                    this.dx = this.speed;
                    this.dy = -this.speed;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }
    }
}

// Add new levels or challenges to the game
class Level {
    constructor(levelNumber, brickRowCount, brickColumnCount, brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft) {
        this.levelNumber = levelNumber;
        this.brickRowCount = brickRowCount;
        this.brickColumnCount = brickColumnCount;
        this.brickWidth = brickWidth;
        this.brickHeight = brickHeight;
        this.brickPadding = brickPadding;
        this.brickOffsetTop = brickOffsetTop;
        this.brickOffsetLeft = brickOffsetLeft;
        this.bricks = [];
        this.initBricks();
    }

    initBricks() {
        for (let c = 0; c < this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for (let r = 0; r < this.brickRowCount; r++) {
                let status = (Math.random() < 0.5) ? 0 : 1;
                let isBreakable = (status === 1) ? (Math.random() < 0.5) : 0;
                this.bricks[c][r] = {
                    x: 0,
                    y: 0,
                    status: status,
                    breakable: isBreakable
                };
            }
        }
    }

    drawBricks(ctx) {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                if (this.bricks[c][r].status == 1) {
                    let brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
                    let brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
                    this.bricks[c][r].x = brickX;
                    this.bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                    ctx.fillStyle = this.bricks[c][r].breakable === 1 ? "#FF0000" : "#000000";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
}

// Initialize new ball and level
const newBall = new Ball(canvas.width / 2, canvas.height - 30, 15, "#00FF00", 5);
const newLevel = new Level(1, 5, 5, 75, 20, 10, 30, 30);

// Update the game loop to use the new ball and level
function a() {
    if (paint.end) sound.stop();

    paint.draw();
    newBall.update(canvas);
    newBall.draw(ctx);
    newLevel.drawBricks(ctx);
    frame = requestAnimationFrame(a);
}
