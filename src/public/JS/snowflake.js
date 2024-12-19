// Snowflake Animation
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 10 + 10}s`; // Random fall duration
    snowflake.style.fontSize = `${Math.random() * 1.5 + 0.5}rem`; // Random size
    snowflake.style.opacity = Math.random(); // Random opacity
    document.body.appendChild(snowflake);

    // Remove snowflake after animation
    setTimeout(() => {
        snowflake.remove();
    }, 20000);
}

setInterval(createSnowflake, 100); // Generate snowflakes every 100ms