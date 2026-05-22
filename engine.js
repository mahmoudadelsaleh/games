const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// تعريف الحارات: -1 (يسار), 0 (وسط), 1 (يمين)
const lanes = [-120, 0, 120];
let gameRunning = false, playerLane = 1, gameSpeed = 5, enemies = [];

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight * 0.75; }
window.onresize = resize; resize();

function update() {
    if (!gameRunning) return;
    
    // تحريك السيارات والالتزام بالحارات
    enemies.forEach(e => e.z += gameSpeed);
    enemies = enemies.filter(e => e.z < 20);
    
    // إضافة سيارات فقط في الحارات (لا يوجد عشوائية في X)
    if (Math.random() < 0.03) {
        let laneIndex = Math.floor(Math.random() * 3);
        enemies.push({lane: laneIndex, z: 0});
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // رسم الطريق والحارات
    drawRoad();
    
    // رسم الأعداء
    enemies.forEach(e => drawCar(enemyImg, lanes[e.lane], e.z));
    
    // رسم سيارتك (تتحرك حسب الحارة)
    drawCar(playerImg, lanes[playerLane], 10);
    
    // كشف التصادم (إذا كانت السيارة في نفس الحارة وعلى بعد قريب)
    enemies.forEach(e => {
        if (e.z > 8 && e.z < 12 && e.lane === playerLane) {
            gameRunning = false;
            document.getElementById('msg').innerText = "Game Over!";
            document.getElementById('overlay').style.display = 'flex';
        }
    });
    
    requestAnimationFrame(update);
}

// التحكم بالحارات (الضغط يحرك السيارة لحارة واحدة فقط)
document.getElementById('left').ontouchstart = () => { if(playerLane > 0) playerLane--; };
document.getElementById('right').ontouchstart = () => { if(playerLane < 2) playerLane++; };

// (بقية الدوال مثل drawCar و drawRoad تبقى كما أرسلتها لك في الرد السابق)