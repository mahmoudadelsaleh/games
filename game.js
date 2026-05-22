function gameOver() {
    running = false;
    const menu = document.getElementById('menu');
    menu.style.display = 'flex';
    document.getElementById('startBtn').innerText = "Game Over - Play Again";
}

// في دالة التحديث (update) عند التصادم:
if (collision) {
    gameOver();
}
