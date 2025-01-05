// Function to fetch chat ID from the database and generate a referral link
async function fetchChatIdAndGenerateReferral() {
  try {
    const fetchChatIdUrl = 'https://moneymatebot.onrender.com/api/get_chat_id'; 
    const response = await fetch(fetchChatIdUrl, { method: "GET" });

    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(errorData.error || response.statusText);
    }

    const data = await response.json();
    const chatId = data.chatId;
    const botURL = "https://t.me/@ProsperoAIBot";
    const referralLink = `${botURL}?start=${chatId}`;

    document.getElementById("referralLinkInput").value = referralLink;
    document.getElementById("errorMessage").textContent = ""; 
    alert("Referral link generated successfully!"); 
  } catch (error) {
    console.error("Error generating referral link:", error.message);
    document.getElementById("errorMessage").textContent = "An error occurred while generating your referral link. Please try again.";
  }
}

// Function to check the pasted referral link
async function checkReferralLink() {
  try {
    const referralLink = document.getElementById("inputReferralLink").value.trim();

    if (!referralLink || !referralLink.startsWith("https://t.me/") || !referralLink.includes("?start=")) {
      document.getElementById("errorMessage").textContent = "Invalid referral link. Please check and try again.";
      return;
    }

    const chatId = referralLink.split("?start=")[1];
    const validateReferralUrl = 'https://moneymatebot.onrender.com/api/validate_referral'; 

    const response = await fetch(validateReferralUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId }),
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(errorData.error || response.statusText);
    }

    const data = await response.json();
    document.getElementById("errorMessage").textContent = data.valid
      ? "Referral link is valid! Reward credited to the referrer."
      : "Referral link is invalid or not found in the database.";
  } catch (error) {
    console.error("Error checking referral link:", error.message);
    document.getElementById("errorMessage").textContent = "An error occurred while validating the referral link. Please try again.";
  }
}

// Function to copy the referral link to the clipboard
function copyReferralLink() {
  const referralLinkInput = document.getElementById("referralLinkInput");
  const referralLink = referralLinkInput.value;

  if (!referralLink) {
    document.getElementById("errorMessage").textContent = "No referral link to copy.";
    return; 
  }

  navigator.clipboard.writeText(referralLink)
    .then(() => {
      document.getElementById("errorMessage").textContent = "Referral link copied successfully!";
    })
    .catch((err) => {
      console.error("Error copying referral link:", err.message);
      document.getElementById("errorMessage").textContent = "Failed to copy referral link.";
    });
}

// Add event listener to the "Generate Referral Link" button
document.querySelector('.generate-button').addEventListener('click', fetchChatIdAndGenerateReferral);
