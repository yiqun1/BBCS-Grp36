document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
        document.getElementById("login-prompt").style.display = "block";
    } else {
        // Initialize countdown, wheel, and progress tracker
        initializeCountdown();
        initializeWheel();
        initializeProgressTracker();
    }
});

function initializeCountdown() {
    const countdownElement = document.getElementById("countdown");
    const targetDate = new Date("December 25, 2024 00:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "Merry Christmas!";
        }
    };

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

function initializeWheel() {
    const wheel = document.getElementById("wheel");
    const spinButton = document.getElementById("spin-button");
    const kindnessPrompts = [
        "Help a neighbor with their groceries.",
        "Write a thank-you note to someone.",
        "Compliment a stranger.",
        "Donate to a local charity.",
        "Volunteer your time at a community center.",
        "Share a positive story on social media.",
        "Make a meal for someone in need.",
        "Offer to babysit for a friend.",
        "Plant a tree or flowers in your community.",
        "Organize a clean-up day at a local park."
    ];

    spinButton.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * kindnessPrompts.length);
        const selectedPrompt = kindnessPrompts[randomIndex];
        document.getElementById("random-act").textContent = selectedPrompt;
        spinWheel();
        awardPoints(5);
    });

    function spinWheel() {
        wheel.style.transition = "transform 4s ease-out";
        const randomDegree = Math.floor(Math.random() * 360 + 720); // Spin at least 2 full rotations
        wheel.style.transform = `rotate(${randomDegree}deg)`;
    }

    function awardPoints(points) {
        // Logic to award points to the user
        console.log(`Awarded ${points} points for spinning the wheel.`);
    }
}

function initializeProgressTracker() {
    const progressButtons = document.getElementById("progress-buttons");

    for (let day = 1; day <= 25; day++) {
        const button = document.createElement("button");
        button.textContent = day;
        button.classList.add("progress-button");
        button.addEventListener("click", () => {
            showDayPopup(day);
        });
        progressButtons.appendChild(button);
    }

    function showDayPopup(day) {
        // Fetch and display the day's prompt and social media link
        document.getElementById("day-popup").style.display = "block";
        document.getElementById("day-prompt").textContent = `Prompt for day ${day}`;
        document.getElementById("social-media-link").textContent = `Social media link for day ${day}`;
    }
}

function closePopup() {
    document.getElementById("day-popup").style.display = "none";
}