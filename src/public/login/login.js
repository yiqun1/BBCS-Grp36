async function processLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Hide the error message initially
    errorMessage.style.display = "none";

    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Login successful!");
            window.location.href = '/home/index.html'; // Redirect to home page
        } else {
            errorMessage.textContent = result.error || "Invalid username or password!";
            errorMessage.style.display = "block";
        }
    } catch (error) {
        errorMessage.textContent = "Error connecting to the server. Please try again later.";
        errorMessage.style.display = "block";
        console.error("Login Error:", error);
    }
}

// Snowflake Animation
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random fall duration
    snowflake.style.fontSize = `${Math.random() * 1.5 + 0.5}rem`; // Random size
    snowflake.style.opacity = Math.random(); // Random opacity
    document.body.appendChild(snowflake);

    // Remove snowflake after animation
    setTimeout(() => {
        snowflake.remove();
    }, 10000);
}

setInterval(createSnowflake, 100); // Generate snowflakes every 100ms
