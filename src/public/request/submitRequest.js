document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("requestForm");
    const titleInput = document.getElementById("title");
    const requestInput = document.getElementById("request");
  
    // Submit form handler
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const userId = localStorage.getItem("user_id");
      const title = titleInput.value.trim();
      const message = requestInput.value.trim();
  
      if (!userId) {
        alert("User not logged in. Please log in to submit a request.");
        return;
      }
  
      if (title.length < 3 || title.length > 100 || message.length < 10 || message.length > 500) {
        alert("Please ensure your title and message meet the character length requirements.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3000/requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, title, message }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert("Your request has been successfully submitted!");
          form.reset();
          updateCount("title", "countTitle", 100);
          updateCount("request", "countMessage", 500);
        } else {
          alert(result.error || "An error occurred. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting request:", error);
        alert("Failed to connect to the server. Please try again later.");
      }
    });
  
    // Character counter updater
    window.updateCount = (inputId, counterId, max) => {
      const input = document.getElementById(inputId);
      const count = input.value.length;
      document.getElementById(counterId).innerText = `${count}/${max}`;
    };
  });
  