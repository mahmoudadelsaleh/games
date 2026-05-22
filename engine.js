// المتغيرات الأساسية للمنظور
const perspective = 0.8; // عامل التلاشي
const vanishingPointX = canvas.width / 2;
const vanishingPointY = canvas.height / 3;

function drawPerspectiveCar(car) {
    // حساب المقياس (Scale) بناءً على بعد السيارة (z)
    // كلما زادت Z، صغرت السيارة وتحركت نحو نقطة التلاشي
    let scale = 1 / (1 + car.z * perspective);
    let projectedX = (car.x - vanishingPointX) * scale + vanishingPointX;
    let projectedY = (car.y - vanishingPointY) * scale + vanishingPointY;
    
    // رسم السيارة بناءً على الإسقاط الجديد
    ctx.fillStyle = car.color;
    ctx.fillRect(projectedX - (25 * scale), projectedY - (40 * scale), 50 * scale, 80 * scale);
}
