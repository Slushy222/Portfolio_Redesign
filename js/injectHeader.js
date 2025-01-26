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

                // Navigation link activation logic moved here
                const navLinks = document.querySelectorAll('#projectNav a');
                const bookSelect = document.getElementById('bookLink');
                const webSelect = document.getElementById('webLink');
                const designSelect = document.getElementById('designSelector');

                function resetAndActivateLink(index) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    if (navLinks[index]) {
                        navLinks[index].classList.add('active');
                    }
                }

                // Initial state
                if (navLinks.length > 0) {
                    navLinks[0].classList.add('active');
                }

                // Original nav links click handler
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        resetAndActivateLink(Array.from(navLinks).indexOf(this));
                    });
                });

                // Special selectors
                bookSelect.addEventListener('click', () => resetAndActivateLink(1));
                webSelect.addEventListener('click', () => resetAndActivateLink(5));
                designSelect.addEventListener('click', () => resetAndActivateLink(0));
            }
        })
        .catch(error => console.error('Error loading header:', error));
});