document.getElementById("canvas").style.position = "relative";
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const canvas2 = document.getElementById("myCanvas2");
const ctx2 = canvas.getContext("2d");
let background = new Image();
let angle = 0;
let end = false;
let str = "https://www.vectorstock.com/royalty-free-vector/festive-balloons-real-transparency-eps-10-vector-30059705"; {
    /* <a href="https://www.vectorstock.com/royalty-free-vector/festive-balloons-real-transparency-eps-10-vector-30059705">Festive balloons real transparency eps 10 vector by Robot</a> */
}
// background.src = "./background_18.png";
background.src = "./back/p4.jpg";
background.width = window.innerWidth;
background.height = window.innerHeight;
// background.onload = function(){
//     ctx.drawImage(background,0,0);   
// };
// canvas2.style.position = "absolute";
let running = false;
let sound = new Howl({
    src: ['./source/sounds/barnicle.mod'],
    volume: 0.5,
    loop: true,
    autoplay: true
});
let fps = 0;
let fpstoshow = 0;
let prevfpson = performance.now();
canvas.style.position = "absolute";
canvas.style.top = "0px";
canvas.style.left = "0px";
canvas2.style.top = "0px";
canvas2.style.left = "0px";
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas2.height = window.innerHeight;
canvas2.width = window.innerWidth;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 4;
let dy = -4;
let mdx = 4;
let mdy = -4;
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
let spin = 1;
let click = 0;
let status = 0;

function showFPS() {
    ctx.font = "16px Arial";
    // ctx.fillStyle = "black";
    ctx.fillStyle = "white";
    ctx.fillText(fpstoshow + " fps", canvas.width / 2 - 40, 20);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function drawScore() {
    ctx.font = "16px Arial";
    // ctx.fillStyle = "black";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 8, 20);
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
    if (!running && relativeX > 0 && relativeX < canvas.width)
        x = relativeX;
    sound.play();
}

function startGame(e) {
    if (e.button == 0 && click > 0)
        running = true;
    click++;
}

function drawLives() {
    ctx.font = "16px Arial";
    // ctx.fillStyle = "black";
    ctx.fillStyle = "white";
    ctx.fillText(`Lives : ${lives}`, canvas.width - 65, 20);
}

// function onEnd() {
//     // ctx.fillStyle = "black";
//     if (!end) return;
//     setTimeout(() => {
//         ctx.font = "36px Arial";
//         ctx.fillStyle = "white";
//         ctx.fillText(`You Lost`, canvas.width - 65, 20);
//     }, 0);
//     // ctx.font = "36px Arial";
//     // ctx.fillStyle = "white";
//     // ctx.fillText(`You Lost`, canvas.width - 65, 20);

//     setTimeout(() => {
//         document.location.reload();
//     }, 2000);
// }
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
                bricks[c][r] = {
                    x: 0,
                    y: 0,
                    status: status,
                    breakable: isbreakable
                };
            }
        }
        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
        document.addEventListener("mousemove", mouseMoveHandler, false);
        document.addEventListener('click', startGame, false);
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
                    // ctx.fillStyle = "#FF0000";
                    var img = new Image();
                    img.src = './brick.jpg';
                    img.width = 10;
                    img.height = 10;
                    // ctx.fillStyle = bricks[c][r].breakable === 1 ? ctx.drawImage(img, brickX, brickY, brickWidth, brickHeight) :
                    // ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fill();

                    ctx.fillStyle = bricks[c][r].breakable === 1 ? "#FF0000" : "#000000";
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
    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        if (!end) {
            fps++;
            showFPS();
            if (performance.now() - prevfpson >= 999) {
                prevfpson = performance.now();
                fpstoshow = fps;
                fps = 0;
            }
            // ctx2.clearRect(0, 0, canvas.width, canvas.height);
            draw.drawball();
            draw.drawBricks();
            draw.drawPaddle();
            drawScore();
            draw.collisionDetection();
            drawLives();
            if (running) {
                x += dx;
                y += dy;
            }
            // dx += getRndInteger(0, 9) / 1000;
            // dy += getRndInteger(0, 9) / 100;
            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                dx = -dx;
            }
            if (y + dy < ballRadius) {
                dy = -dy;
            } else if (y + dy > canvas.height - ballRadius) {
                if (x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                } else {
                    running = false;
                    lives--;
                    if (!lives) {
                        end = true;
                        // onEnd();
                        alert("GAME OVER");
                        status = -1;
                        document.location.reload();
                        // clearInterval(interval); // Needed for Chrome to end game
                    } else {
                        x = canvas.width / 2;
                        y = canvas.height - 30;
                        dx = 4;
                        dy = -4;
                        paddleX = (canvas.width - paddleWidth) / 2;
                    }
                }
            }

            if (rightPressed) {
                paddleX += 14;
                if (paddleX + paddleWidth > canvas.width) {
                    paddleX = canvas.width - paddleWidth;
                }
            } else if (leftPressed) {
                paddleX -= 14;
                if (paddleX < 0) {
                    paddleX = 0;
                }
            }
        } else
            onEnd();
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
                            end = true;
                            status = 1;
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
        let img = new Image();
        img.src = './red_snooker_ball.png';
        let ballsize = 0.025;
        ballsize = Math.floor(Math.min(canvas.width, canvas.height) * ballsize);
        // ballsize = 20;
        ballsize = ballRadius;
        img.width = ballsize;
        img.height = ballsize;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        angle += 10 * Math.PI / 180;
        ctx.beginPath();
        // ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.arc(0, 0, ballRadius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        // ctx.fillStyle = "#9F2308";
        // ctx.drawImage(img, x, y, ballsize, ballsize);
        ctx.drawImage(img, -ballsize / 2, -ballsize / 2, ballsize, ballsize);
        ctx.restore();
    }
    static drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#FFFF00";
        ctx.fill();
        ctx.closePath();

        // ctx2.beginPath();
        // ctx2.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        // ctx2.fillStyle = "#0095De";
        // ctx2.fill();
        // ctx2.closePath();
    }
}
let obj;
obj = (obj === undefined || obj === null) ? new draw() : obj;
export default obj;