import Stats from "./node_modules/stats-js/src/Stats.js";
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 8;
let dy = -8;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 10;
let brickColumnCount = 10;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let bricks = [];
let score = 0;
let lives = 3;
let brickWinCount = 0;
let brickNonWinCount = 0;
let padding;
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}
class draw {
    constructor() {
        // this.canvas = canvas;
        this.ctx = ctx;
        ctx.canvas.height = window.innerHeight;
        ctx.canvas.width = window.innerWidth;
        score = 0;
        brickOffsetLeft /= 2;
        paddleWidth = Math.floor(ctx.canvas.width * (0.075));
        paddleHeight = Math.floor(ctx.canvas.height * (0.0125));
        brickRowCount = Math.floor(ctx.canvas.height / (brickHeight + brickPadding)) - 5;
        brickColumnCount = Math.floor(ctx.canvas.width / (brickWidth + brickPadding));
        brickColumnCount = getRndInteger(brickColumnCount / 2, brickColumnCount);
        brickRowCount = getRndInteger(brickRowCount / 3, brickRowCount);
        brickOffsetLeft = (ctx.canvas.width - brickColumnCount * brickWidth - brickPadding * (brickColumnCount - 1)) / 2;
        // brickOffsetLeft = 0;
        for (let c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            // let tempbrickRowCount = getRndInteger(0, brickRowCount);
            let tempbrickRowCount = brickRowCount;
            for (let r = 0; r < tempbrickRowCount; r++) {
                let status = (getRndInteger(0, 10) < 5) ? 0 : 1;
                let isbreakable = (status === 1) ? ((getRndInteger(0, 10) < 5 && (brickNonWinCount <= brickWinCount / 2.25)) ? 0 : 1) : 0;
                if (status === 1 && isbreakable === 1) brickWinCount++;
                if (status === 1 && isbreakable === 0) brickNonWinCount++;
                bricks[c][r] = { x: 0, y: 0, status: status, breakable: isbreakable };
            }
        }
        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
        document.addEventListener("mousemove", mouseMoveHandler, false);
    }
    static drawBricks() {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) {
                    let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    // ctx.fillStyle = "#0095DD";
                    // var gradient = ctx.createLinearGradient(brickX, brickY, brickWidth, brickHeight);
                    // gradient.addColorStop(0, "#0095DD");
                    // // gradient.addColorStop(1/5, "#BEBEBE");
                    // // gradient.addColorStop(2/5, "#BEBEBE");
                    // // gradient.addColorStop(3/5, "#660033");
                    // // gradient.addColorStop(4/5, "#99FF99");
                    // // gradient.addColorStop(5/5, "#CCFF99");

                    ctx.fillStyle = bricks[c][r].breakable === 1 ? "#0095DD" : "#000000";
                    // ctx.fillStyle = bricks[c][r].breakable === 1 ? gradient : "#000000";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }
    keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }
    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw.drawball();
        draw.drawBricks();
        draw.drawPaddle();
        drawScore();
        draw.collisionDetection();
        drawLives();
        x += dx;
        y += dy;

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if (!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                    // clearInterval(interval); // Needed for Chrome to end game
                }
                else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 8;
                    dy = -8;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }

        if (rightPressed) {
            paddleX += 14;
            if (paddleX + paddleWidth > canvas.width) {
                paddleX = canvas.width - paddleWidth;
            }
        }
        else if (leftPressed) {
            paddleX -= 14;
            if (paddleX < 0) {
                paddleX = 0;
            }
        }
    }

    static collisionDetection() {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                let b = bricks[c][r];
                if (b.status === 1) {
                    if (x + dx > b.x && x + dx < b.x + brickWidth && y + dy > b.y && y + dy < b.y + brickHeight) {
                        dy = -dy;
                        if (b.breakable == 1) {
                            b.status = 0;
                            ++score;
                        }
                        if (brickWinCount === score) {
                            alert("YOU WIN, CONGRATULATIONS!");
                            document.location.reload();
                            // clearInterval(interval);
                        }
                    }
                }
            }
        }
    }

    static drawball() {
        ctx.beginPath();
        // ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        // ctx.fillStyle = "#9F2308";
        var img = new Image();
        img.src = './red_snooker_ball.png';
        img.width = 10;
        img.height = 10;
        let ballsize = 0.025;
        // ballsize = 20;
        ballsize = Math.floor(Math.min(canvas.width, canvas.height) * ballsize);
        ctx.drawImage(img, x, y, ballsize, ballsize);
        ctx.fill();
        ctx.closePath();
    }
    static drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}
let obj;
obj = (obj === undefined || obj === null) ? new draw() : obj;
var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom);

function animate() {
    stats.begin();
    // console.log(stats.dom);
    // monitored code goes here
    stats.end();
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
export default obj;