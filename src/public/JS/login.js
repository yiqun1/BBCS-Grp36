async function processLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

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
        console.log(result)

        if (response.ok) {
            
            alert("Login successful!");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem('user_id', result.user.user_id);
            localStorage.setItem('username', result.user.username); 
            window.location.href = 'http://localhost:3000/'; // Redirect to home page

        } else {
            errorMessage.textContent = data.error || "Invalid username or password!";
            errorMessage.style.display = "block";
        }
    } catch (error) {
        errorMessage.textContent = "Invalid username or password!";
        errorMessage.style.display = "block";
        console.error("Login Error:", error);
    }
}