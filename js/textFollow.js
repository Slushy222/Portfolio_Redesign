// Store current and target positions
let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;
let isHovering = false;

// Get the text element
const text = document.querySelector('.cursorText');

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


const aboutImage = document.querySelectorAll('#taylorImageContainer img');

aboutImage.forEach(img => {
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
         aboutImage.forEach(img => {
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
    const dx = targetX - currentX;
    const dy = targetY - currentY;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const easingFactor = Math.min(0.07, Math.max(0.05, distance / 200));
    currentX += dx * easingFactor;
    currentY += dy * easingFactor;
    
    const textWidth = text.offsetWidth;
    
    text.style.transform = `translate(${currentX - (textWidth * 1.1)}px, ${currentY - 35}px)`;
    
    if (isHovering) {
        text.style.opacity = 1;
    } else {
        text.style.opacity = 0;
    }
    
    requestAnimationFrame(animate);
}

animate();