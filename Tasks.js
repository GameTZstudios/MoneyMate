// Global coin count initialization
let coinCount = 0;
let taskStartTime = {}; // To track when the task was started

// Function to handle YouTube video tasks
function startTask(button, url, taskId) {
    // Check if the task is a YouTube video
    if (button.classList.contains("watch-video")) {
        // Open the YouTube video in a new tab
        window.open(url, "_blank");

        // Record the start time of the task
        taskStartTime[taskId] = new Date().getTime();

        // Change button to Claim after watching
        button.innerText = "Claim";
        button.classList.remove("watch-video");
        button.classList.add("claim-video");
        button.setAttribute("onclick", `claimTask(this, '${taskId}')`);
    } else if (button.classList.contains("claim-video")) {
        claimTask(button, taskId);
    }
}

// Function to claim the task
function claimTask(button, taskId) {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - taskStartTime[taskId]) / 1000; // in seconds

    if (elapsedTime < 600) { // Less than 10 minutes
        alert("You didn't watch the full video. No reward.");
        button.innerText = "Watch";
        button.classList.remove("claim-video");
        button.classList.add("watch-video");
        button.setAttribute("onclick", `startTask(this, 'https://www.youtube.com/watch?v=${taskId}', '${taskId}')`);
    } else {
        // Reward the user
        updateCoins(1000);
        alert("You have been rewarded!");
        button.innerText = "Completed";
        button.disabled = true; // Disable the button
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
