document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('#projectNav a');
    const bookSelect = document.getElementById('bookLink');
    const webSelect = document.getElementById('webLink');
    const designSelect = document.getElementById('designNav');

    function resetAndActivateLink(index) {
        // Remove 'active' class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add 'active' class to specified link
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
});