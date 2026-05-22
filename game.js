const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: canvas.width/2 - 25, y: canvas.height - 150, w: 50, h: 80, speed: 0 };
let enemies = [];
let gameSpeed = 4; // سرعة معتدلة
let running = false;

function spawnEnemy() {
    if (!running) return;
    let lane = Math.floor(Math.random() * 3) * (canvas.width / 3);
    enemies.push({ x: lane + 20, y: -100, w: 50, h: 80 });
    setTimeout(spawnEnemy, 1500); // إبطاء ظهور السيارات
}

function update() {
    if (!running) return;
    player.x += player.speed;
    enemies.forEach((e, i) => {
        e.y += gameSpeed;
        if (e.y > canvas.height) enemies.splice(i, 1);
        if (e.x < player.x + 50 && e.x + 50 > player.x && e.y < player.y + 80 && e.y + 80 > player.y) {
            running = false;
            document.getElementById('startBtn').innerText = "Restart";
            document.getElementById('startBtn').style.display = "block";
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // رسم الطريق
    ctx.fillStyle = "#555";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.w, player.h);
    
    ctx.fillStyle = "red";
    enemies.forEach(e => ctx.fillRect(e.x, e.y, e.w, e.h));
    
    if (running) requestAnimationFrame(() => { update(); draw(); });
}

// التحكم
document.getElementById('left').ontouchstart = () => player.speed = -7;
document.getElementById('right').ontouchstart = () => player.speed = 7;
document.getElementById('left').ontouchend = document.getElementById('right').ontouchend = () => player.speed = 0;
document.getElementById('accel').ontouchstart = () => gameSpeed = 8;
document.getElementById('accel').ontouchend = () => gameSpeed = 4;
document.getElementById('brake').ontouchstart = () => gameSpeed = 2;
document.getElementById('brake').ontouchend = () => gameSpeed = 4;

document.getElementById('startBtn').onclick = () => {
    running = true;
    enemies = [];
    document.getElementById('startBtn').style.display = "none";
    spawnEnemy();
    draw();
};
