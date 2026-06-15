document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation elements
    const allTag = document.getElementById('allTag');
    const booksTag = document.getElementById('booksTag');
    // const videoTag = document.getElementById('videoTag');
    const brandingTag = document.getElementById('brandingTag');
    const webTag = document.getElementById('webTag');
    
    // Get all project cells
    const projectCells = document.querySelectorAll('.projectGridCell');
    
    // Function to filter projects by category
    function filterProjects(category) {
        projectCells.forEach(cell => {
            const projectCategory = cell.getAttribute('data-category'); // ← read directly from cell
            
            if (category === 'all' || projectCategory === category) {
                cell.style.display = '';
            } else {
                cell.style.display = 'none';
            }
        });

        
        // Add active class to the selected nav item
        document.querySelectorAll('#projectNav li a').forEach(link => {
            link.classList.remove('active');
        });
        
        if (category === 'all') {
            allTag.querySelector('a').classList.add('active');
        } else if (category === 'books') {
            booksTag.querySelector('a').classList.add('active');
        // } else if (category === 'video') {
        //     videoTag.querySelector('a').classList.add('active');
        } else if (category === 'branding') {
            brandingTag.querySelector('a').classList.add('active');
        } else if (category === 'web') {
            webTag.querySelector('a').classList.add('active');
        }
    }
    
    // Event listeners for navigation
    allTag.addEventListener('click', function() {
        filterProjects('all');
    });
    
    booksTag.addEventListener('click', function() {
        filterProjects('books');
    });
    
    // videoTag.addEventListener('click', function() {
    //     filterProjects('video');
    // });
    
    brandingTag.addEventListener('click', function() {
        filterProjects('branding');
    });
    
    webTag.addEventListener('click', function() {
        filterProjects('web');
    });
    
    // For featured links in the carousel
    const featuredLinks = document.querySelectorAll('.featuredCategory');
    featuredLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            const category = this.getAttribute('data-category');
            if (category) {
                filterProjects(category);
                
                // Scroll to the project grid section
                document.getElementById('designOverview').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set "All" as active by default
    filterProjects('all');
});