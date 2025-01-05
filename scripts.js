async function fetchChatIdAndGenerateReferral() {
  try {
    // Replace with the actual URL of your deployed backend API endpoint to fetch chat ID
    const fetchChatIdUrl = 'https://api.render.com/deploy/srv-ctt28eggph6c738fakpg?key=Jms2mFUN2zs'; 

    const response = await fetch(fetchChatIdUrl, { 
      method: "GET",
      // Include any necessary authentication headers (e.g., cookies, session IDs)
      // headers: { 
      //   'Cookie': document.cookie 
      // } 
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      document.getElementById("errorMessage").textContent = `Error: ${errorData.error || response.statusText}`; 
      return; 
    }

    const data = await response.json();
    const chatId = data.chatId;
    const referralCode = data.referralCode; 

    const botURL = "https://t.me/@ProsperoAIBot";
    const referralLink = `${botURL}?start=${chatId}`;

    document.getElementById("referralLinkInput").value = referralLink;
    document.getElementById("errorMessage").textContent = ""; 
    alert("Referral link generated successfully!"); 

  } catch (error) {
    console.error("Error generating referral link:", error);
    document.getElementById("errorMessage").textContent = "Error generating referral link. Please try again.";
  }
}

// ... rest of your JavaScript code (checkReferralLink, copyReferralLink)
