document.addEventListener("DOMContentLoaded", () => {
    fetch("header.html")
        .then((response) => response.text())
        .then((data) => {
            // Inject header HTML into the page
            document.getElementById("header").innerHTML = data;

            // Now manipulate the loaded elements based on login status
            const isLoggedIn = localStorage.getItem("isLoggedIn");
            const username = localStorage.getItem("username");
            const loginLink = document.getElementById("loginLink");
            const userProfileDropdown = document.getElementById("userProfileDropdown");
            const dropdownHeader = document.getElementById("dropdown-header");

            if (isLoggedIn === "true") {
                // User is logged in
                loginLink.style.display = "none"; // Hide "Login" button
                userProfileDropdown.style.display = "block"; // Show "User Profile" dropdown
                dropdownHeader.textContent = username;
            } else {
                // User is not logged in
                loginLink.style.display = "block";
                userProfileDropdown.style.display = "none"; // Hide "User Profile" dropdown
            }
        })
        .catch((error) => console.error("Error loading header:", error));
});

function logout() {
    console.log("Logging out...");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    window.location.href = 'http://localhost:3000/login.html'; // Redirect to login page
}