document.addEventListener('DOMContentLoaded', function() {
    fetch('../html/headerTemplate.html')
        .then(response => response.text())
        .then(data => {
            // Insert the header content before the main tag
            const mainContent = document.querySelector('.mainContent');
            if (mainContent) {
                mainContent.insertAdjacentHTML('beforebegin', data);
                
                // Load and execute hamburger.js after header is injected
                const script = document.createElement('script');
                script.src = '../js/hamburger.js';
                document.body.appendChild(script);
            }
        })
        .catch(error => console.error('Error loading header:', error));
});