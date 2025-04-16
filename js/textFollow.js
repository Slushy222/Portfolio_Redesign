// Store current and target positions
let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;
let isHovering = false;

// Get the text element
const text = document.getElementById('cursorText');

// Initially hide the text
text.style.opacity = 0;
// Make sure the text element doesn't interfere with mouse events
text.style.pointerEvents = 'none';

// Add event listeners to project grid cell images
const projectImages = document.querySelectorAll('.projectGridCell img');
projectImages.forEach(img => {
  img.addEventListener('mouseenter', () => {
    isHovering = true;
  });
  
  img.addEventListener('mouseleave', () => {
    isHovering = false;
    // Hide text when not hovering
    text.style.opacity = 0;
  });
});

document.addEventListener('mousemove', function(e) {
    // Update target position when mouse moves
    targetX = e.pageX;
    targetY = e.pageY;
    
    // Check if currently hovering over any project grid cell images
    // This helps ensure we detect hover state correctly
    if (isHovering) {
        let stillHovering = false;
        projectImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                stillHovering = true;
            }
        });
        isHovering = stillHovering;
    }
});

function animate() {
    // Calculate distance between current and target positions
    const dx = targetX - currentX;
    const dy = targetY - currentY;
    
    // Calculate distance for acceleration factor
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Adjust easing factor based on distance (faster when far away)
    const easingFactor = Math.min(0.07, Math.max(0.05, distance / 200));
    
    // Update current position with easing
    currentX += dx * easingFactor;
    currentY += dy * easingFactor;
    
    // Get the width of the text element to center it
    const textWidth = text.offsetWidth;
    
    // Position text above cursor and center it horizontally
    text.style.transform = `translate(${currentX - (textWidth/2)}px, ${currentY - 30}px)`;
    
    // Only show text when hovering over project grid cell images
    if (isHovering) {
        text.style.opacity = 1;
    } else {
        text.style.opacity = 0;
    }
    
    // Continue animation loop
    requestAnimationFrame(animate);
}

// Start the animation loop
animate();