function startTimer() {
    // Timer logic
}
function addSnowEffect() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = '❄';
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 5 + 3}s`;
    document.body.appendChild(snowflake);
    setTimeout(() => snowflake.remove(), 8000);
}
setInterval(addSnowEffect, 200);
