document.addEventListener("DOMContentLoaded", function() {
    const text = "junior developer";
    const typingSpeed = 80; // Speed of typing in milliseconds
    let index = 0;

    function typeText() {
        if (index < text.length) {
            document.getElementById("typing-text").textContent += text.charAt(index);
            index++;
            setTimeout(typeText, typingSpeed);
        }
    }

    typeText(); // Start typing animation
});
