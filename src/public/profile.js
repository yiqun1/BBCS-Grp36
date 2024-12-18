document.addEventListener("DOMContentLoaded", () => {
    const editBtn = document.querySelector(".edit-btn");
    const modal = document.querySelector(".modal");
    const closeModalBtn = document.querySelector(".close-modal");
    const saveChangesBtn = document.querySelector(".save-btn");
    const overlay = document.querySelector(".overlay");
  
    // Profile fields
    const profileName = document.querySelector(".profile-name");
    const profileEmail = document.querySelector(".profile-email");
    const profilePassword = document.querySelector(".profile-password");
  
    // Modal input fields
    const nameInput = document.getElementById("name-input");
    const emailInput = document.getElementById("email-input");
    const passwordInput = document.getElementById("password-input");
  
    // Fetch User Profile
    async function fetchUserProfile() {
        let userId = sessionStorage.getItem("userId");
    
        if (!userId || isNaN(userId)) {
            console.error("Invalid user ID in sessionStorage.");
            alert("Session expired. Please log in again.");
            window.location.href = "/login.html";
            return;
        }
    
        userId = parseInt(userId, 10);
    
        try {
            const response = await fetch(`http://localhost:3000/profile/${userId}`);
            const data = await response.json();
    
            console.log("Fetched User Data:", data); // Debug the full response
    
            if (response.ok) {
                const user = data.user; // Extract the 'user' object
    
                // Populate the profile fields
                document.querySelector(".profile-name").textContent = `Username: ${user.username}`;
                document.querySelector(".profile-email").textContent = `Email: ${user.email}`;
            } else {
                throw new Error(data.message || "Failed to fetch user profile.");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error.message);
            alert("Error fetching profile data. Please try again later.");
        }
    }
    
    // Fetch profile data on page load
    document.addEventListener("DOMContentLoaded", fetchUserProfile);
    

// Fetch profile data on page load
document.addEventListener("DOMContentLoaded", fetchUserProfile);

  
    // Update User Profile
    async function updateUserProfile() {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        console.error("userId not found in sessionStorage.");
        return;
      }
  
      // Prepare updated data
      const updatedProfile = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
      };
  
      try {
        const response = await fetch(`http://localhost:3000/profile/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProfile),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert("Profile updated successfully!");
          closeModal(); // Close the modal
          fetchUserProfile(); // Refresh profile data
        } else {
          console.error("Error updating profile:", result.error || "Unknown error");
          alert("Failed to update profile. Please try again.");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("An error occurred while updating your profile.");
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
  