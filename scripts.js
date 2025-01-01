// Constants
const botURL = "https://t.me/MoneyMateChannel"; // Replace with your bot's URL

// Generate referral link
async function generateReferralLink() {
    try {
        const response = await fetch("/generate-byte"); // Backend route to generate byte
        const data = await response.json();
        if (data.success) {
            const referralLink = `${botURL}?ref=${data.byte}`;
            document.getElementById("referralLink").value = referralLink;
            alert("Referral link generated successfully!");
        } else {
            alert("Failed to generate referral link. Please try again.");
        }
    } catch (error) {
        console.error("Error generating referral link:", error);
        alert("Error generating referral link.");
    }
}

// Copy referral link
function copyReferralLink() {
    const link = document.getElementById("referralLink");
    link.select();
    link.setSelectionRange(0, 99999); // For mobile
    navigator.clipboard.writeText(link.value).then(() => {
        alert("Referral link copied to clipboard!");
    }).catch((error) => {
        console.error("Error copying referral link:", error);
        alert("Failed to copy referral link.");
    });
}

// Validate referral code
async function validateReferral() {
    const referralCode = document.getElementById("referralInput").value;
    if (!referralCode) {
        alert("Please enter a referral code.");
        return;
    }
    try {
        const response = await fetch("/validate-referral", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ referralCode }),
        });
        const data = await response.json();
        if (data.success) {
            alert("Referral validated! Rewards credited.");
        } else {
            alert("Invalid referral code.");
        }
    } catch (error) {
        console.error("Error validating referral code:", error);
        alert("Error validating referral code.");
    }
}

// Event Listeners
document.getElementById("generateButton").addEventListener("click", generateReferralLink);
