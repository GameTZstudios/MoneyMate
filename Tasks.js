// Constants
const rewardCooldown = 15 * 60 * 1000; // 15 minutes in milliseconds
const rewardAmount = 10; // Coins rewarded for completing a task

// Utility functions
const getTasksState = () => JSON.parse(localStorage.getItem('tasksState')) || {};
const saveTasksState = (state) => localStorage.setItem('tasksState', JSON.stringify(state));

const updateTotalCoins = (amount) => {
    const totalCoins = parseInt(localStorage.getItem('totalCoins')) || 0;
    localStorage.setItem('totalCoins', totalCoins + amount);
};

// Main task-handling function
function startTask(button, url, taskId) {
    const tasksState = getTasksState();
    const currentTime = new Date().getTime();

    // Check if the task is on cooldown
    if (tasksState[taskId] && currentTime - tasksState[taskId].lastCompleted < rewardCooldown) {
        alert("You have already completed this task recently. Please wait before trying again.");
        return;
    }

    // Open the URL in a new tab
    window.open(url, '_blank');
    button.disabled = true;
    button.innerText = 'Completed ✔️';

    // Update the task state
    tasksState[taskId] = {
        lastCompleted: currentTime,
        rewarded: true,
    };
    saveTasksState(tasksState);

    // Reward the user
    updateTotalCoins(rewardAmount);
    alert(`Task completed! You earned ${rewardAmount} coins.`);

    // Show checkmark or confirmation (optional)
    if (button.nextElementSibling) {
        button.nextElementSibling.classList.add('visible');
    }
}

// Initialize tasks on page load
function initializeTasks() {
    const tasksState = getTasksState();
    const currentTime = new Date().getTime();

    document.querySelectorAll('.task-button').forEach((button) => {
        const taskId = button.dataset.taskId;

        if (tasksState[taskId]) {
            const lastCompleted = tasksState[taskId].lastCompleted;

            if (currentTime - lastCompleted < rewardCooldown) {
                // Task is still on cooldown
                button.disabled = true;
                button.innerText = 'Completed ✔️';
                if (button.nextElementSibling) {
                    button.nextElementSibling.classList.add('visible');
                }
            }
        }
    });
}

// Run initialization on page load
document.addEventListener('DOMContentLoaded', initializeTasks);
