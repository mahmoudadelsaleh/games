const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// إعداد الصور
const images = {
    road: new Image(),
    cars: [new Image(), new Image(), new Image()]
};
images.road.src = 'road.png';
images.cars[0].src = 'car_blue.png';
images.cars[1].src = 'car_red.png';
images.cars[2].src = 'car_green.png';

let gameRunning = false, playerLane = 1, gameSpeed = 5, enemies = [];
const lanes = [-120, 0, 120];

// التأكد من تحميل الصور قبل التشغيل
let loadedImages = 0;
const totalImages = 4;
function checkReady() {
    loadedImages++;
    if (loadedImages === totalImages) {
        console.log("Assets Loaded!");
        // اللعبة جاهزة للبدء الآن
    }
}
Object.values(images).forEach(img => { if(Array.isArray(img)) img.forEach(i => i.onload = checkReady); else img.onload = checkReady; });

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight * 0.75; }
window.onresize = resize; resize();

function drawCar(img, x, z) {
    let scale = 1 / (1 + z * 0.3);
    let px = x * scale + canvas.width / 2;
    let py = (canvas.height / 2) + (z * 30 * scale);
    ctx.drawImage(img, px - 30, py - 50, 60, 100);
}

function update() {
    if (!gameRunning) return;
    enemies.forEach(e => e.z += gameSpeed);
    enemies = enemies.filter(e => e.z < 20);
    if (Math.random() < 0.05) enemies.push({lane: Math.floor(Math.random()*3), z: 0, img: images.cars[Math.floor(Math.random()*3)]});
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images.road, 0, 0, canvas.width, canvas.height);
    
    enemies.forEach(e => drawCar(e.img, lanes[e.lane], e.z));
    drawCar(images.cars[0], lanes[playerLane], 10);
    
    enemies.forEach(e => { if(e.z > 8 && e.z < 12 && e.lane === playerLane) gameRunning = false; });
    requestAnimationFrame(update);
}

document.getElementById('left').ontouchstart = () => { if(playerLane > 0) playerLane--; };
document.getElementById('right').ontouchstart = () => { if(playerLane < 2) playerLane++; };
document.getElementById('newGame').onclick = () => { gameRunning = true; enemies = []; update(); };
