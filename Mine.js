// Initial values
let keyCount = parseInt(localStorage.getItem("keyCount")) || 0;
let diamondCount = parseInt(localStorage.getItem("diamondCount")) || 0;
let totalCoins = parseInt(localStorage.getItem("totalCoins")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 500;
let levelProgress = parseInt(localStorage.getItem("levelProgress")) || 0;

// Constants
const maxEnergy = 100;
const energyRechargeTime = 7200; // 7.2 seconds per unit = 1 hour for full recharge

// Customizable levels and images
const levels = [
  { name: "Bronze Beginner", coinImage: "LEVEL1.png" },
  { name: "Bronze Warrior", coinImage: "LEVEL2.png" },
  { name: "Silver Seeker", coinImage: "LEVEL3.png" },
  { name: "Silver Protector", coinImage: "LEVEL4.png" },
  { name: "Golden Hunter", coinImage: "LEVEL5.png" },
  { name: "Golden Conqueror", coinImage: "LEVEL6.png" },
  { name: "Platinum Explorer", coinImage: "LEVEL7.png" },
  { name: "Platinum Defender", coinImage: "LEVEL8.png" },
  { name: "Emerald Seeker", coinImage: "LEVEL9.png" },
  { name: "Emerald Guardian", coinImage: "LEVEL10.png" },
  { name: "Ruby Challenger", coinImage: "LEVEL11.png" },
  { name: "Ruby Protector", coinImage: "LEVEL12.png" },
  { name: "Diamond Warrior", coinImage: "LEVEL13.png" },
  { name: "Diamond Master", coinImage: "LEVEL14.png" },
  { name: "Obsidian Champion", coinImage: "LEVEL15.png" },
  { name: "Obsidian Conqueror", coinImage: "LEVEL16.png" },
  { name: "Master of Sapphire", coinImage: "LEVEL17.png" },
  { name: "Master of Ruby", coinImage: "LEVEL18.png" },
  { name: "Ethereal Amethyst", coinImage: "LEVEL19.png" },
  { name: "Celestial Alexandrite", coinImage: "LEVEL20.png" },
];

// DOM Elements
const keyCountElem = document.getElementById("key-count");
const diamondCountElem = document.getElementById("diamond-count");
const energyCountElem = document.getElementById("energy-count");
const totalAmountElem = document.getElementById("total-amount");
const levelProgressElem = document.getElementById("level-progress");
const levelNameElem = document.getElementById("level-name");
const tapAnimationElem = document.getElementById("tap-animation");
const coinElem = document.getElementById("coin");
const coinImageElem = document.querySelector("#coin img");

// Update UI with initial values
keyCountElem.innerText = keyCount;
diamondCountElem.innerText = diamondCount;
energyCountElem.innerText = energy;
totalAmountElem.innerText = totalCoins;
levelProgressElem.style.width = `${levelProgress % 100}%`;
updateLevelUI();

// Save data to localStorage
const saveData = () => {
  localStorage.setItem("keyCount", keyCount);
  localStorage.setItem("diamondCount", diamondCount);
  localStorage.setItem("totalCoins", totalCoins);
  localStorage.setItem("energy", energy);
  localStorage.setItem("levelProgress", levelProgress);
};

// Update level UI based on progress
function updateLevelUI() {
  const currentLevel = Math.floor(levelProgress / 100);
  
  if (currentLevel >= levels.length - 1) {
    // Last level: stop progress bar
    levelNameElem.innerText = `Level: ${levels[levels.length - 1].name}`;
    coinImageElem.src = levels[levels.length - 1].coinImage;
    levelProgressElem.style.width = `100%`;
    levelProgressElem.style.display = "none"; // Hide progress bar on the last level
  } else {
    const levelInfo = levels[Math.min(currentLevel, levels.length - 1)];
    levelNameElem.innerText = `Level: ${levelInfo.name}`;
    coinImageElem.src = levelInfo.coinImage; // Update the coin image
    levelProgressElem.style.display = "block"; // Ensure progress bar is visible for other levels
  }
}

// Recharge energy every 7.2 seconds
setInterval(() => {
  if (energy < maxEnergy) {
    energy++;
    energyCountElem.innerText = energy;
    saveData();
  }
}, energyRechargeTime);

// Handle coin click
coinElem.addEventListener("click", () => {
  if (energy > 0) {
    // Decrease energy and update UI
    energy--;
    energyCountElem.innerText = energy;

    // Increment coins and level progress
    totalCoins += 1;
    levelProgress++;
    totalAmountElem.innerText = totalCoins;

    // Show tap animation
    tapAnimationElem.style.opacity = 1;
    tapAnimationElem.style.transform = "translateY(-40px)";
    setTimeout(() => {
      tapAnimationElem.style.opacity = 0;
      tapAnimationElem.style.transform = "translateY(0)";
    }, 500);

    // Update level progress and UI
    levelProgressElem.style.width = `${levelProgress % 100}%`;
    updateLevelUI();

    // Save updated data
    saveData();
  } else {
    alert("Energy is empty! Please wait for it to recharge.");
  }
});
