function startTask(button, url) {
    window.open(url, '_blank'); // Opens the URL in a new tab
    button.disabled = true; // Disables the button after clicking
    button.innerText = 'Completed ✔️';
    button.nextElementSibling.classList.add('visible'); // Shows the checkmark
    alert('Task completed! You earned coins.');
}
