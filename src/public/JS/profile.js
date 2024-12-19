document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.querySelector(".edit-btn");
  const modal = document.querySelector(".modal");
  const closeModalBtn = document.querySelector(".close-modal");
  const saveChangesBtn = document.querySelector(".save-btn");
  const overlay = document.querySelector(".overlay");

  // Profile fields
  const profileName = document.querySelector(".profile-name");
  const profileEmail = document.querySelector(".profile-email");

  // Modal input fields
  const nameInput = document.getElementById("name-input");
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");

  // Fetch User Profile
  async function fetchUserProfile() {
      const userId = localStorage.getItem("user_id");

      if (!userId || isNaN(userId)) {
          console.error("Invalid user ID in localStorage.");
          alert("Session expired. Please log in again.");
          window.location.href = "/login.html";
          return;
      }

      try {
          const response = await fetch(`http://localhost:3000/profile/${userId}`);
          const data = await response.json();

          console.log("Fetched User Data:", data);

          if (response.ok) {
              const user = data.user;

              // Populate the profile fields
              profileName.textContent = `Username: ${user.username}`;
              profileEmail.textContent = `Email: ${user.email}`;

              // Pre-fill modal inputs
              nameInput.value = user.username;
              emailInput.value = user.email;
              passwordInput.value = ""; // Blank password for security
          } else {
              throw new Error(data.error || "Failed to fetch user profile.");
          }
      } catch (error) {
          console.error("Error fetching user profile:", error.message);
          alert("Error fetching profile data. Please try again later.");
      }
  }

  // Update User Profile
  async function updateUserProfile() {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
          console.error("user_id not found in localStorage.");
          return;
      }

      // Prepare updated data
      const updatedProfile = {
          username: nameInput.value.trim(), // Match backend field `username`
          email: emailInput.value.trim(),
          password: passwordInput.value.trim() || undefined, // Send password only if updated
      };

      try {
          const response = await fetch(`http://localhost:3000/profile/${userId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedProfile),
          });

          const result = await response.json();

          if (response.ok) {
              alert("Profile updated successfully!");

              // Update localStorage
              localStorage.setItem("username", updatedProfile.username);
              localStorage.setItem("email", updatedProfile.email);
              if (updatedProfile.password) {
                  localStorage.setItem("password", updatedProfile.password);
              }
              
              closeModal(); // Close modal on success
              fetchUserProfile(); // Refresh profile display
          } else {
              throw new Error(result.error || "Failed to update profile.");
          }
      } catch (error) {
          console.error("Error updating profile:", error.message);
          alert("An error occurred while updating your profile. Please try again.");
      }
  }

  // Show the modal
  editBtn.addEventListener("click", () => {
      modal.classList.add("active");
      overlay.classList.add("active");
  });

  // Close the modal
  const closeModal = () => {
      modal.classList.remove("active");
      overlay.classList.remove("active");
  };

  closeModalBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // Save changes and update the profile
  saveChangesBtn.addEventListener("click", (event) => {
      event.preventDefault();
      updateUserProfile();
  });

  // Fetch user profile on page load
  fetchUserProfile();
});
