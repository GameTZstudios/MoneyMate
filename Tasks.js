const rewardCooldown = 10 * 60 * 1000; // 10 minutes in milliseconds
const rewardAmount = 1000; // Example reward amount

const getTasksState = () => JSON.parse(localStorage.getItem('tasksState')) || {};
const saveTasksState = (state) => localStorage.setItem('tasksState', JSON.stringify(state));

const updateTotalCoins = (amount) => {
    const totalCoins = parseInt(localStorage.getItem('totalCoins')) || 0;
    localStorage.setItem('totalCoins', totalCoins + amount);
};

function startTask(button) {
    const taskId = button.dataset.taskId;
    const url = button.dataset.link;
    const tasksState = getTasksState();
    const currentTime = new Date().getTime();

    // Check if task is being started
    if (!tasksState[taskId]) {
        // Open the task link
        window.open(url, '_blank');

        // Update button to "Claim"
        button.innerText = 'Claim';
        button.onclick = () => claimReward(button);

        // Save task state
        tasksState[taskId] = { startedAt: currentTime };
        saveTasksState(tasksState);
    }
}

function claimReward(button) {
    const taskId = button.dataset.taskId;
    const tasksState = getTasksState();
    const currentTime = new Date().getTime();
    const task = tasksState[taskId];

    // Check if 10 minutes have passed
    if (currentTime - task.startedAt < rewardCooldown) {
        alert("You didn't watch the video. Please wait for 10 minutes before claiming.");
    } else {
        // Grant reward
        updateTotalCoins(rewardAmount);
        alert(`Task completed! You earned ${rewardAmount} coins.`);

        // Mark task as completed
        button.disabled = true;
        button.innerText = 'Completed ✔️';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tasksState = getTasksState();
    const currentTime = new Date().getTime();

    document.querySelectorAll('.task-button').forEach((button) => {
        const taskId = button.dataset.taskId;
        const task = tasksState[taskId];

        if (task) {
            if (currentTime - task.startedAt < rewardCooldown) {
                // Task is in progress
                button.innerText = 'Claim';
                button.onclick = () => claimReward(button);
            } else {
                // Task completed
                button.disabled = true;
                button.innerText = 'Completed ✔️';
            }
        }
    });
});
