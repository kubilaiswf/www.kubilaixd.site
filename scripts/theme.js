// Theme Switcher JavaScript
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    
    // Function to set the theme
    function setTheme(theme) {
        htmlElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
                
        // Remove the animation class after animation completes
        setTimeout(() => {
            document.body.classList.remove("theme-transition");
        }, 1000);
    }
    
    // Function to toggle between themes
    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    }
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
        // Use saved preference if available
        setTheme(savedTheme);
    } else {
        // Otherwise use system preference
        setTheme(prefersDark ? "dark" : "light");
    }
    
    // Add click event to theme toggle button - ensure the entire button is clickable
    if (themeToggle) {
        themeToggle.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent any default behavior
            toggleTheme();
            
            // Add a small animation to the toggle button
            themeToggle.style.transform = "scale(0.8)";
            setTimeout(() => {
                themeToggle.style.transform = "";
            }, 200);
        });
        
        // Make sure the SVG elements don't interfere with the click
        const svgElements = themeToggle.querySelectorAll('svg');
        svgElements.forEach(svg => {
            svg.addEventListener('click', (e) => {
                // Prevent event bubbling and ensure the parent button gets the click
                e.stopPropagation();
                themeToggle.click();
            });
            
            // Same for the path inside SVG
            const paths = svg.querySelectorAll('path');
            paths.forEach(path => {
                path.addEventListener('click', (e) => {
                    e.stopPropagation();
                    themeToggle.click();
                });
            });
        });
    }
    
    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        // Only auto-change if user hasn't manually set a preference
        if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "dark" : "light");
        }
    });
});