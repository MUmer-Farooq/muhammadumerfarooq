// ======================================
// Project Details Page - JavaScript
// ======================================

document.addEventListener('DOMContentLoaded', function() {
    // Collapsible functionality for project details
    const collapsibles = document.querySelectorAll('.pd-collapsible');
    
    collapsibles.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle active class on button
            button.classList.toggle('active');
            
            // Get the content element
            const content = button.nextElementSibling;
            
            // Toggle max-height for smooth animation
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.classList.remove('open');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.classList.add('open');
            }
            
            // Toggle chevron rotation
            const icon = button.querySelector('i');
            if (icon) {
                if (button.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
    
    // Add smooth scroll for navigation
    const backLink = document.querySelector('.pd-back-link');
    if (backLink) {
        backLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
    
    // Console message
    console.log('%c📊 Project Details Loaded', 'color: #4361ee; font-size: 16px; font-weight: bold;');
});
