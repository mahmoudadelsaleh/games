const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 130, y: 400, w: 40, h: 70, speed: 0 };
let enemies = [];
let gameSpeed = 5;

function update() {
    // حركة اللاعب
    player.x += player.speed;
    if (player.x < 0) player.x = 0;
    if (player.x > 260) player.x = 260;

    // إضافة سيارات معادية
    if (Math.random() < 0.02) {
        enemies.push({ x: Math.floor(Math.random() * 3) * 100, y: -100, w: 40, h: 70 });
    }

    // تحديث السيارات
    enemies.forEach((e, index) => {
        e.y += gameSpeed;
        if (e.y > 500) enemies.splice(index, 1);
        // كشف التصادم
        if (e.x < player.x + 40 && e.x + 40 > player.x && e.y < player.y + 70 && e.y + 70 > player.y) {
            alert("انتهت اللعبة!");
            location.reload();
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, 300, 500);
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.w, player.h);
    ctx.fillStyle = "yellow";
    enemies.forEach(e => ctx.fillRect(e.x + 30, e.y, e.w, e.h));
}

function loop() { update(); draw(); requestAnimationFrame(loop); }

// التحكم
document.getElementById('left').onmousedown = () => player.speed = -5;
document.getElementById('right').onmousedown = () => player.speed = 5;
document.getElementById('left').onmouseup = document.getElementById('right').onmouseup = () => player.speed = 0;
document.getElementById('accel').onmousedown = () => gameSpeed = 10;
document.getElementById('accel').onmouseup = () => gameSpeed = 5;
document.getElementById('brake').onmousedown = () => gameSpeed = 2;
document.getElementById('brake').onmouseup = () => gameSpeed = 5;

loop();
