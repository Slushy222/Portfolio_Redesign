document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('#projectNav a');

    const bookSelect = document.getElementById('bookLink');
    const webSelect = document.getElementById('webLink');


    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove 'active' class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add 'active' class to clicked link
            this.classList.add('active');
        });
    });

    bookSelect.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        navLinks[1].classList.add('active');
    });

    webSelect.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        navLinks[5].classList.add('active');
    });


});