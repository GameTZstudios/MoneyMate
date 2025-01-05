

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
