// Function to fetch chat ID from the database and generate a referral link
async function fetchChatIdAndGenerateReferral() {
  try {
    // Replace with the actual URL of your deployed backend API endpoint to fetch chat ID
    const fetchChatIdUrl = 'https://moneymatebot.onrender.com/get_chat_id'; 

    // Call the backend API to fetch the user's chat ID
    const response = await fetch(fetchChatIdUrl, { 
      method: "GET",
      headers: { 
        // Include authentication headers if required (e.g., API key)
        // 'Authorization': `Bearer ${your_api_key}` 
      } 
    });

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
    document.getElementById("referralLinkInput").value = referralLink;
    document.getElementById("errorMessage").textContent = ""; 

    // Optionally, display a success message to the user
    alert("Referral link generated successfully!"); 

  } catch (error) {
    console.error("Error generating referral link:", error);
    document.getElementById("errorMessage").textContent = "An error occurred while generating your referral link. Please try again.";
  }
}

// Function to check the pasted referral link
async function checkReferralLink() {
  try {
    // Get the referral link pasted by the user
    const referralLink = document.getElementById("inputReferralLink").value;

    if (!referralLink.includes("?start=")) {
      document.getElementById("errorMessage").textContent = "Invalid referral link. Please check and try again.";
      return;
    }

    // Extract the chat ID from the link
    const chatId = referralLink.split("?start=")[1];

    // Replace with the actual URL of your deployed backend API endpoint to validate referral
    const validateReferralUrl = 'https://moneymatebot.onrender.com/validate_referral'; 

    // Call the backend API to validate the referral link
    const response = await fetch(validateReferralUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        // Include authentication headers if required (e.g., API key)
        // 'Authorization': `Bearer ${your_api_key}` 
      },
      body: JSON.stringify({ chatId }),
    });

    if (!response.ok) {
      throw new Error("Failed to validate referral link");
    }

    // Parse the response
    const data = await response.json();

    if (data.valid) {
      document.getElementById("errorMessage").textContent = "Referral link is valid! Reward credited to the referrer.";
    } else {
      document.getElementById("errorMessage").textContent = "Referral link is invalid or not found in the database.";
    }
  } catch (error) {
    console.error("Error checking referral link:", error);
    document.getElementById("errorMessage").textContent = "An error occurred while validating the referral link. Please try again.";
  }
}

// Function to copy the referral link to the clipboard
function copyReferralLink() {
  const referralLinkInput = document.getElementById("referralLinkInput");
  const referralLink = referralLinkInput.value;

  if (!referralLink) {
    return; // No link to copy
  }

  navigator.clipboard.writeText(referralLink)
    .then(() => {
      document.getElementById("errorMessage").textContent = "Referral link copied successfully!";
    })
    .catch((err) => {
      console.error("Error copying referral link:", err);
      document.getElementById("errorMessage").textContent = "Failed to copy referral link.";
    });
}
