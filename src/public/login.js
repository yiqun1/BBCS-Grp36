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