// Function to fetch chat ID from the database and generate a referral link
async function fetchChatIdAndGenerateReferral() {
  try {
    // URL of the backend endpoint
    const apiUrl = "https://moneymatebot.onrender.com"; // Replace with your actual URL

    // Call the backend API to fetch the user's chat ID
    const response = await fetch(apiUrl, { method: "GET" });

    if (!response.ok) {
      throw new Error("Failed to fetch chat ID");
    }

    // Parse the chat ID from the response
    const data = await response.json();
    const chatId = data.chatId;

    // Generate the referral link
    const botURL = "https://t.me/@ProsperoAIBot";
    const referralLink = `${botURL}?start=${chatId}`;

    // Display the referral link
    document.getElementById("referralLink").value = referralLink;
    alert("Referral link generated successfully!");
  } catch (error) {
    console.error("Error generating referral link:", error);
    alert("An error occurred while generating your referral link. Please try again.");
  }
}

// Function to check the pasted referral link
async function checkReferralLink() {
  try {
    // Get the referral link pasted by the user
    const referralLink = document.getElementById("inputReferralLink").value;

    if (!referralLink.includes("?start=")) {
      alert("Invalid referral link. Please check and try again.");
      return;
    }

    // Extract the chat ID from the link
    const chatId = referralLink.split("?start=")[1];

    // URL of the backend endpoint
    const apiUrl = "https://moneymatebot.onrender.com"; // Replace with your actual URL

    // Call the backend API to validate the referral link
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId }),
    });

    if (!response.ok) {
      throw new Error("Failed to validate referral link");
    }

    // Parse the response
    const data = await response.json();

    if (data.valid) {
      alert("Referral link is valid! Reward credited to the referrer.");
    } else {
      alert("Referral link is invalid or not found in the database.");
    }
  } catch (error) {
    console.error("Error checking referral link:", error);
    alert("An error occurred while validating the referral link. Please try again.");
  }
}
