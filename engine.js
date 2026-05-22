const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameRunning = false, playerLane = 1, gameSpeed = 5, enemies = [];
const lanes = [-120, 0, 120];

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight * 0.75; }
window.onresize = resize; resize();

// دالة رسم سيارة بالرسم الهندسي (تغنينا عن الصور)
function drawCar(color, lane, z) {
    let scale = 0.5 + (z * 0.1); 
    let px = (lane * 0.5) + (canvas.width / 2); 
    let py = (z * 20) + 100;
    
    ctx.fillStyle = color;
    ctx.fillRect(px - 25*scale, py - 40*scale, 50*scale, 80*scale); // جسم السيارة
    ctx.fillStyle = "yellow";
    ctx.fillRect(px - 15*scale, py - 30*scale, 30*scale, 20*scale); // نافذة
}

function update() {
    if (!gameRunning) return;
    
    // تحديث الأعداء
    enemies.forEach(e => e.z += gameSpeed);
    enemies = enemies.filter(e => e.z < 25);
    if (Math.random() < 0.05) enemies.push({lane: Math.floor(Math.random()*3), z: 0, color: 'red'});
    
    // الرسم
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // تلوين الخلفية بدل صورة الطريق للتأكد
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    enemies.forEach(e => drawCar(e.color, lanes[e.lane], e.z));
    drawCar('blue', lanes[playerLane], 15);
    
    requestAnimationFrame(update);
}

document.getElementById('left').ontouchstart = () => { if(playerLane > 0) playerLane--; };
document.getElementById('right').ontouchstart = () => { if(playerLane < 2) playerLane++; };
document.getElementById('newGame').onclick = () => { gameRunning = true; enemies = []; update(); };
document.getElementById('pause').onclick = () => gameRunning = !gameRunning;
