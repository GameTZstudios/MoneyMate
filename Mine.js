// Initial values
let keyCount = parseInt(localStorage.getItem("keyCount")) || 0;
let diamondCount = parseInt(localStorage.getItem("diamondCount")) || 0;
let totalCoins = parseInt(localStorage.getItem("totalCoins")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 500;
let levelProgress = parseInt(localStorage.getItem("levelProgress")) || 0;
let telegramUsername = localStorage.getItem("telegramUsername") || ""; // Store Telegram username

// Constants
const maxEnergy = 100;
const energyRechargeTime = 7200; // 7.2 seconds per unit = 1 hour for full recharge

// Customizable levels and images
const levels = [
  { name: "1 Bronze Beginner", coinImage: "LEVEL1.png" },
  { name: "2 Bronze Warrior", coinImage: "LEVEL2.png" },
  { name: "3 Silver Seeker", coinImage: "LEVEL3.png" },
  { name: "4 Silver Protector", coinImage: "LEVEL4.png" },
  { name: "5 Golden Hunter", coinImage: "LEVEL5.png" },
  { name: "6 Golden Conqueror", coinImage: "LEVEL6.png" },
  { name: "7 Platinum Explorer", coinImage: "LEVEL7.png" },
  { name: "8 Platinum Defender", coinImage: "LEVEL8.png" },
  { name: "9 Emerald Seeker", coinImage: "LEVEL9.png" },
  { name: "10 Emerald Guardian", coinImage: "LEVEL10.png" },
  { name: "11 Ruby Challenger", coinImage: "LEVEL11.png" },
  { name: "12 Ruby Protector", coinImage: "LEVEL12.png" },
  { name: "13 Diamond Warrior", coinImage: "LEVEL13.png" },
  { name: "14 Diamond Master", coinImage: "LEVEL14.png" },
  { name: "15 Obsidian Champion", coinImage: "LEVEL15.png" },
  { name: "16 Obsidian Conqueror", coinImage: "LEVEL16.png" },
  { name: "17 Master of Sapphire", coinImage: "LEVEL17.png" },
  { name: "18 Master of Ruby", coinImage: "LEVEL18.png" },
  { name: "19 Ethereal Amethyst", coinImage: "LEVEL19.png" },
  { name: "20 Celestial Alexandrite", coinImage: "LEVEL20.png" },
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
const referralLinkElem = document.getElementById("referral-link"); // Referral link element

// Update UI with initial values
keyCountElem.innerText = keyCount;
diamondCountElem.innerText = diamondCount;
energyCountElem.innerText = energy;
totalAmountElem.innerText = totalCoins;
levelProgressElem.style.width = `${levelProgress % 100}%`;
updateLevelUI();

// Fetch Telegram username and update localStorage
function fetchTelegramUsername() {
  const telegramUser  = window.Telegram?.WebApp?.initDataUnsafe?.user?.username;
  if (telegramUser ) {
    telegramUsername = telegramUser ;
    localStorage.setItem("telegramUsername", telegramUsername);
    updateReferralLink();
  }
}

// Update the referral link
function updateReferralLink() {
  if (telegramUsername && referralLinkElem) {
    referralLinkElem.href = `https://example.com/invite?ref=${telegramUsername}`;
    referralLinkElem.innerText = `Invite Friends (Ref: ${telegramUsername})`;
  }
}

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
    levelNameElem.innerText = `Level: ${levels[levels.length - 1].name}`;
    coinImageElem.src = levels[levels.length - 1].coinImage;
    levelProgressElem.style.width = `100%`;
    levelProgressElem.style.display = "none";
  } else {
    const levelInfo = levels[Math.min(currentLevel, levels.length - 1)];
    levelNameElem.innerText = `Level: ${levelInfo.name}`;
    coinImageElem.src = levelInfo.coinImage;
    levelProgressElem.style.display = "block";
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
    energy--;
    energyCountElem.innerText = energy;
    totalCoins += 1;
    levelProgress++;
    totalAmountElem.innerText = totalCoins;

    tapAnimationElem.style.opacity = 1;
    tapAnimationElem.style.transform = "translateY(-40px)";
    setTimeout(() => {
      tapAnimationElem.style.opacity = 0;
      tapAnimationElem.style.transform = "translateY(0)";
    }, 500);

    levelProgressElem.style.width = `${levelProgress % 100}%`;
    updateLevelUI();
    saveData();
  } else {
    alert("Energy is empty! Please wait for it to recharge.");
  }
});

// Initialize Telegram username and referral link
fetchTelegramUsername();
updateReferralLink();
