const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameRunning = false, playerX = 150, gameSpeed = 5, enemies = [];

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight * 0.75; }
window.onresize = resize; resize();

function drawCar(x, y, color, isPlayer) {
    ctx.fillStyle = color;
    // رسم السيارة بشكل عمودي
    ctx.fillRect(x, y, 50, 80); 
    ctx.fillStyle = "#fff";
    ctx.fillRect(x + 5, y + 10, 40, 20); // نافذة أمامية
}

function update() {
    if (!gameRunning) return;
    enemies.forEach(e => e.y += gameSpeed);
    enemies = enemies.filter(e => e.y < canvas.height);
    if (Math.random() < 0.05) enemies.push({x: Math.random() * (canvas.width - 50), y: -100, color: 'red'});
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemies.forEach(e => drawCar(e.x, e.y, e.color));
    drawCar(playerX, canvas.height - 150, 'blue', true);
    
    // كشف التصادم
    enemies.forEach(e => {
        if (e.y > canvas.height - 180 && Math.abs(e.x - playerX) < 50) gameRunning = false;
    });
    
    requestAnimationFrame(update);
}

// التحكم
document.getElementById('left').ontouchstart = () => playerX -= 20;
document.getElementById('right').ontouchstart = () => playerX += 20;
document.getElementById('accel').ontouchstart = () => gameSpeed = 10;
document.getElementById('accel').ontouchend = () => gameSpeed = 5;
document.getElementById('brake').ontouchstart = () => gameSpeed = 2;
document.getElementById('brake').ontouchend = () => gameSpeed = 5;
document.getElementById('newGame').onclick = () => { gameRunning = true; enemies=[]; update(); };
document.getElementById('pause').onclick = () => gameRunning = !gameRunning;
