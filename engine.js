const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const roadImg = new Image(); roadImg.src = 'road.png';
const cars = [new Image(), new Image(), new Image()];
cars[0].src = 'car_blue.png'; cars[1].src = 'car_red.png'; cars[2].src = 'car_green.png';

let gameRunning = false, playerLane = 1, gameSpeed = 5, enemies = [];
const lanes = [-100, 0, 100]; // إحداثيات الحارات

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight * 0.75; }
window.onresize = resize; resize();

function drawCar(img, lane, z) {
    // حساب الموضع: كلما زادت Z (البعد)، تحركت السيارة للأسفل وكبر حجمها
    let scale = 0.2 + (z * 0.05); 
    let x = (lane * 1) + (canvas.width / 2) - 30; 
    let y = (z * 20) + 100; 
    ctx.drawImage(img, x, y, 60 * scale, 100 * scale);
}

function update() {
    if (!gameRunning) return;
    
    // 1. تحديث الأعداء
    enemies.forEach(e => e.z += gameSpeed);
    enemies = enemies.filter(e => e.z < 25);
    if (Math.random() < 0.05) enemies.push({lane: Math.floor(Math.random()*3), z: 0, img: cars[Math.floor(Math.random()*3)]});
    
    // 2. الرسم
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height); // الخلفية أولاً
    
    enemies.forEach(e => drawCar(e.img, lanes[e.lane], e.z));
    drawCar(cars[0], lanes[playerLane], 15); // سيارة اللاعب ثابتة في z=15
    
    requestAnimationFrame(update);
}

document.getElementById('left').ontouchstart = () => { if(playerLane > 0) playerLane--; };
document.getElementById('right').ontouchstart = () => { if(playerLane < 2) playerLane++; };
document.getElementById('newGame').onclick = () => { gameRunning = true; enemies = []; update(); };
document.getElementById('pause').onclick = () => gameRunning = !gameRunning;
