const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameRunning = false, playerX = 0, gameSpeed = 5, enemies = [];

// تعديل أبعاد الرسم لتناسب المساحة المتاحة للعبة
function resize() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight * 0.75; 
}
window.onresize = resize; resize();

function drawCar(x, z, color) {
    let scale = 1 / (1 + z * 0.8);
    let px = x * scale + canvas.width / 2;
    let py = (canvas.height / 3) + (z * 15 * scale); // تعديل نقطة التلاشي
    let w = 50 * scale, h = 80 * scale;
    
    ctx.fillStyle = color;
    ctx.fillRect(px - w/2, py - h/2, w, h);
    ctx.fillStyle = "#222"; 
    ctx.fillRect(px - w/3, py - h/4, w*0.6, h*0.3);
}

function update() {
    if (!gameRunning) return;
    enemies.forEach(e => e.z += gameSpeed);
    enemies = enemies.filter(e => e.z < 20);
    if (Math.random() < 0.05) enemies.push({x: (Math.floor(Math.random()*3)-1)*100, z: 0, color: 'red'});
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemies.forEach(e => drawCar(e.x, e.z, e.color));
    drawCar(playerX, 10, 'blue');
    requestAnimationFrame(update);
}

// التحكم
document.getElementById('left').ontouchstart = () => playerX -= 50;
document.getElementById('right').ontouchstart = () => playerX += 50;
document.getElementById('accel').ontouchstart = () => gameSpeed = 10;
document.getElementById('accel').ontouchend = () => gameSpeed = 5;
document.getElementById('brake').ontouchstart = () => gameSpeed = 2;
document.getElementById('brake').ontouchend = () => gameSpeed = 5;
document.getElementById('newGame').onclick = () => { gameRunning = true; update(); };
document.getElementById('pause').onclick = () => { gameRunning = !gameRunning; if(gameRunning) update(); };
