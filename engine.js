const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const roadImg = new Image(); roadImg.src = 'road.png';
const cars = [new Image(), new Image(), new Image()];
cars[0].src = 'car_blue.png'; cars[1].src = 'car_red.png'; cars[2].src = 'car_green.png';

let gameRunning = false, playerLane = 1, gameSpeed = 5, enemies = [];
const lanes = [-120, 0, 120];

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight * 0.75; }
window.onresize = resize; resize();

function update() {
    if (!gameRunning) return;
    enemies.forEach(e => e.z += gameSpeed);
    enemies = enemies.filter(e => e.z < 20);
    if (Math.random() < 0.05) enemies.push({lane: Math.floor(Math.random()*3), z: 0, img: cars[Math.floor(Math.random()*3)]});
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
    
    enemies.forEach(e => drawCar(e.img, lanes[e.lane], e.z));
    drawCar(cars[0], lanes[playerLane], 10);
    
    enemies.forEach(e => { if(e.z > 8 && e.z < 12 && e.lane === playerLane) gameRunning = false; });
    requestAnimationFrame(update);
}

function drawCar(img, x, z) {
    let scale = 1 / (1 + z * 0.3);
    let px = x * scale + canvas.width / 2;
    let py = (canvas.height / 2) + (z * 30 * scale);
    ctx.drawImage(img, px - 30*scale, py - 50*scale, 60*scale, 100*scale);
}

document.getElementById('left').ontouchstart = () => { if(playerLane > 0) playerLane--; };
document.getElementById('right').ontouchstart = () => { if(playerLane < 2) playerLane++; };
document.getElementById('accel').ontouchstart = () => gameSpeed = 10;
document.getElementById('accel').ontouchend = () => gameSpeed = 5;
document.getElementById('brake').ontouchstart = () => gameSpeed = 2;
document.getElementById('brake').ontouchend = () => gameSpeed = 5;
document.getElementById('newGame').onclick = () => { gameRunning = true; enemies = []; update(); };
document.getElementById('pause').onclick = () => gameRunning = !gameRunning;
