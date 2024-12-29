// Global coin count initialization
let coinCount = 0;

// Function to handle YouTube video tasks
function startTask(button, url, taskId) {
    // Check if the task is a YouTube video
    if (button.classList.contains("watch-video")) {
        // Open the YouTube video in a new tab
        window.open(url, "_blank");

        // Simulate a 5-second delay for task completion
        setTimeout(() => {
            // Mark task as completed
            markTaskAsCompleted(button);

            // Update coins for YouTube tasks only
            updateCoins(1000);
        }, 5000); // Adjust time as needed
    } else {
        // For other tasks (Follow X Accounts or Join Telegram Channels)
        window.open(url, "_blank");

        // Mark task as completed (optional visual indicator, no coin update)
        markTaskAsCompleted(button);
    }
}

// Function to mark a task as completed
function markTaskAsCompleted(button) {
    const checkmark = button.nextElementSibling; // Checkmark element
    button.disabled = true; // Disable the button
    button.innerText = "Completed"; // Update button text
    checkmark.style.display = "inline"; // Show the checkmark
}

// Function to update the coin count
function updateCoins(amount) {
    // Increment the global coin count
    coinCount += amount;

    // Update the displayed coin count (Assuming there's a coin count element)
    const coinCountElement = document.getElementById("coin-count");
    if (coinCountElement) {
        coinCountElement.textContent = coinCount;
    } else {
        console.warn("Coin count element not found!");
    }
}
