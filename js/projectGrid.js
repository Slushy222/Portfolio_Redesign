document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('#projectNav a');
    const bookSelect = document.getElementById('bookLink');
    const webSelect = document.getElementById('webLink');
    const designSelect = document.getElementById('designNav');
    const gridItems = document.querySelectorAll('#projectGridContainer article');
    
    function resetAndActivateLink(index) {
        // Remove 'active' class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add 'active' class to specified link
        if (navLinks[index]) {
            navLinks[index].classList.add('active');
            
            // Get the filter value from the active link's parent li id
            const filterValue = navLinks[index].parentElement.id.replace('Tag', '').toLowerCase();
            
            // Filter grid items
            filterGridItems(filterValue);
        }
    }
    
    function filterGridItems(category) {
        // Handle all items case
        if (category === 'all') {
            gridItems.forEach(item => item.style.display = '');
        } else {
            // Filter items based on data-category attribute
            gridItems.forEach(item => {
                const itemCategories = (item.getAttribute('data-category') || '').split(' ');
                if (itemCategories.includes(category)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        // Update grid layout based on visible items
        updateGridLayout();
    }
    
    function updateGridLayout() {
        const container = document.getElementById('projectGridContainer');
        const visibleItems = Array.from(gridItems).filter(item => item.style.display !== 'none');
        
        // Adjust grid layout based on number of visible items
        if (visibleItems.length <= 2) {
            container.style.gridTemplateColumns = 'repeat(1, 1fr)';
        } else if (visibleItems.length <= 4) {
            container.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            container.style.gridTemplateColumns = 'repeat(3, 1fr)';
        }
    }
    
    // Initial state
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
        const initialCategory = navLinks[0].parentElement.id.replace('Tag', '').toLowerCase();
        filterGridItems(initialCategory);
    }
    
    // Original nav links click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            resetAndActivateLink(Array.from(navLinks).indexOf(this));
        });
    });
    
    // Special selectors
    bookSelect.addEventListener('click', () => resetAndActivateLink(1));
    webSelect.addEventListener('click', () => resetAndActivateLink(4));
    designSelect.addEventListener('click', () => resetAndActivateLink(0));
});