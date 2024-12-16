document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form submission
  
      // Gather form data
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
  
      // Simple validation
      if (!name || !email || !password) {
        alert("All fields are required.");
        return;
      }
  
      try {
        // Send the data to the backend
        const response = await fetch("/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert(result.message); // Success message
          form.reset(); // Clear the form
        } else {
          alert(result.error || "Registration failed.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
      }
    });
  });
  