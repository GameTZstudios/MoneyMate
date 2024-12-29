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

// DOM Elements
const diamondCountElem = document.getElementById("diamond-count");
const energyCountElem = document.getElementById("energy-count");
const totalAmountElem = document.getElementById("total-amount");
const levelProgressElem = document.getElementById("level-progress");
const levelNameElem = document.getElementById("level-name");
const tapAnimationElem = document.getElementById("tap-animation");
const coinElem = document.getElementById("coin");
const coinImageElem = document.querySelector("#coin img");
const usernameDisplayElem = document.getElementById("username-display"); // New element for username display

// Update UI with initial values
diamondCountElem.innerText = diamondCount ```javascript
energyCountElem.innerText = energy;
totalAmountElem.innerText = totalCoins;
levelProgressElem.style.width = `${levelProgress % 100}%`;
updateLevelUI();
usernameDisplayElem.innerText = telegramUsername || "Guest"; // Display username or "Guest"

// Fetch Telegram username and update localStorage
function fetchTelegramUsername() {
  const telegramUser  = window.Telegram?.WebApp?.initDataUnsafe?.user?.username;
  if (telegramUser ) {
    telegramUsername = telegramUser ;
    localStorage.setItem("telegramUsername", telegramUsername);
    usernameDisplayElem.innerText = telegramUsername; // Update username display
    updateReferralLink();
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
