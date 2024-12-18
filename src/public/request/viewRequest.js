// Fetch requests from the backend and display ornaments
async function fetchRequests() {
    try {
      const response = await fetch("http://localhost:3000/requests");
      const result = await response.json();
  
      if (response.ok && result.data) {
        console.log(result.data);
        displayOrnaments(result.data);
      } else {
        console.error("Failed to fetch requests:", result.error);
        alert("Failed to load requests. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while connecting to the server.");
    }
  }
  
  let ornamentCounter = 1; // Counter to toggle between ornaments
  
  // Function to display ornaments row-by-row from the bottom-left of the tree
  function displayOrnaments(requests) {
    const treeContainer = document.getElementById("tree-container");
  
    
  
    const startingBottom = 180; // Bottom position (tree's bottom left)
    const startingLeft = 60; // Left position (tree's bottom left)
    const rowHeight = 70; // Vertical spacing between rows
    const ornamentSpacing = 80; // Horizontal spacing between ornaments
    const maxOrnamentsPerRow = 6; // Max ornaments per row
  
    let currentRow = 0; // Start from the first row
    let currentColumn = 0; // Start with the first column
  
    requests.forEach((request) => {
      // Create ornament container
      const ornament = document.createElement("div");
      ornament.classList.add("ornament");
  
      // Add ornament image
      const ornamentImage = document.createElement("img");
      ornamentImage.src = `/images/ornament${ornamentCounter}.png`;
      ornamentImage.classList.add("ornament-img");
  
      // Toggle ornament image
      ornamentCounter = ornamentCounter === 1 ? 2 : 1;
  
      // Add completed class for fulfilled requests
      if (request.fulfilled) {
        ornament.classList.add("completed");
      }
  
      // Add text overlay with truncation
      const ornamentText = document.createElement("div");
      ornamentText.classList.add("ornament-text");
      const truncatedText =
        request.title.length > 8 ? `${request.title.substring(0, 8)}...` : request.title;
      ornamentText.innerText = truncatedText;
  
      // Append image and text to ornament
      ornament.appendChild(ornamentImage);
      ornament.appendChild(ornamentText);
  
      // Calculate position for the current ornament
      const bottom = startingBottom + currentRow * rowHeight;
      const left = startingLeft + currentColumn * ornamentSpacing;
  
      ornament.style.position = "absolute";
      ornament.style.bottom = `${bottom}px`;
      ornament.style.left = `${left}px`;
  
      // Move to the next column or row
      currentColumn++;
      if (currentColumn >= maxOrnamentsPerRow) {
        currentColumn = 0;
        currentRow++;
      }
  
      // Append ornament to the tree container
      treeContainer.appendChild(ornament);
    });
  }
  
  // Initialize on page load
  document.addEventListener("DOMContentLoaded", fetchRequests);
  