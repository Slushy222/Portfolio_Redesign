class Carousel {
    constructor(sliderElement, navElement, interval = 6000) {
        this.slider = sliderElement;
        this.nav = navElement;
        this.interval = interval;
        this.currentSlide = 0;
        this.slides = this.slider.querySelectorAll('.slide');
        this.navDots = this.nav.querySelectorAll('a');
        this.totalSlides = this.slides.length;
        
        // Drag properties
        this.isDragging = false;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.animationID = 0;
        this.dragThreshold = 50; // Reduced threshold for more responsive feel
        
        // Timer reference
        this.rotationInterval = null;
        this.isTransitioning = false;
        
        this.init();
        this.visibilityChangeHandler = this.handleVisibilityChange.bind(this); 
        document.addEventListener('visibilitychange', this.visibilityChangeHandler);
    }

    handleVisibilityChange() { 
        if (document.hidden) { 
            this.stopAutoRotation(); 
        } else { 
            this.startAutoRotation(); 
        } 
    }

    init() {
        this.updateNavigation();
        this.slider.classList.add('with-transition');
        this.startAutoRotation();
        
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                if (!this.isTransitioning) {
                    this.goToSlide(index, true);
                }
            });
        });
    
        // Drag event listeners
        this.slider.addEventListener('mousedown', this.dragStart.bind(this));
        this.slider.addEventListener('mousemove', this.drag.bind(this));
        this.slider.addEventListener('mouseup', this.dragEnd.bind(this));
        this.slider.addEventListener('mouseleave', this.dragEnd.bind(this));
        
        this.slider.addEventListener('touchstart', this.dragStart.bind(this));
        this.slider.addEventListener('touchmove', this.drag.bind(this));
        this.slider.addEventListener('touchend', this.dragEnd.bind(this));
        
        this.slider.addEventListener('contextmenu', e => e.preventDefault());
    
        // Handle transition end
        this.slider.addEventListener('transitionend', () => {
            this.isTransitioning = false;
        });
    }

    dragStart(event) {
        if (this.isTransitioning) return;
        
        this.stopAutoRotation();
        this.isDragging = true;
        this.slider.classList.remove('with-transition');
        this.slider.classList.add('grabbing');
        
        if (event.type === 'mousedown') {
            this.startPos = event.clientX;
        } else {
            this.startPos = event.touches[0].clientX;
        }
        
        cancelAnimationFrame(this.animationID);
    }

    drag(event) {
        if (!this.isDragging) return;
        
        event.preventDefault();
        
        const currentPosition = event.type === 'mousemove' 
            ? event.clientX 
            : event.touches[0].clientX;
        
        const diff = currentPosition - this.startPos;
        const sliderWidth = this.slider.offsetWidth;
        this.currentTranslate = this.prevTranslate + diff;
        
        // Add resistance at the edges
        if (this.currentSlide === 0 && diff > 0) {
            this.currentTranslate = this.prevTranslate + (diff * 0.3);
        } else if (this.currentSlide === this.totalSlides - 1 && diff < 0) {
            this.currentTranslate = this.prevTranslate + (diff * 0.3);
        }
        
        this.setSliderPosition(this.currentTranslate);
    }

    dragEnd() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.slider.classList.remove('grabbing');
        
        const sliderWidth = this.slider.offsetWidth;
        const movedBy = this.currentTranslate - this.prevTranslate;
        
        this.slider.classList.add('with-transition');
        
        // Calculate how far we've moved as a percentage of slide width
        const movePercentage = Math.abs(movedBy) / sliderWidth;
        
        // If we've moved more than 30% of the slide width
        if (movePercentage > 0.3) {
            if (movedBy > 0 && this.currentSlide > 0) {
                // Moved right more than 30% - go to previous slide
                this.currentSlide--;
            } else if (movedBy < 0 && this.currentSlide < this.totalSlides - 1) {
                // Moved left more than 30% - go to next slide
                this.currentSlide++;
            }
        }
        
        // If we haven't moved more than 30%, goToSlide will snap back to current slide
        this.goToSlide(this.currentSlide, true);
    }

    setSliderPosition(translate) {
        this.slider.style.transform = `translateX(${translate}px)`;
    }

    goToSlide(index, resetTimer = false) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentSlide = index;
        const sliderWidth = this.slider.offsetWidth;
        this.currentTranslate = -index * sliderWidth;
        this.prevTranslate = this.currentTranslate;
        
        this.slider.classList.add('with-transition');
        this.setSliderPosition(this.currentTranslate);
        this.updateNavigation();
        
        if (resetTimer) {
            this.resetAutoRotation();
        }
    }

    updateNavigation() {
        this.navDots.forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    nextSlide() {
        if (!this.isDragging && !this.isTransitioning) {
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
            this.goToSlide(this.currentSlide);
        }
    }

    startAutoRotation() {
        if (!document.hidden) {
            this.stopAutoRotation();
            this.rotationInterval = setInterval(() => this.nextSlide(), this.interval);
        }
    }

    stopAutoRotation() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
            this.rotationInterval = null;
        }
    }

    resetAutoRotation() {
        this.stopAutoRotation();
        this.startAutoRotation();
    }
}
  
document.addEventListener('DOMContentLoaded', () => {
    const sliderElement = document.querySelector('.slider');
    const navElement = document.querySelector('.sliderNav');
    
    const carousel = new Carousel(sliderElement, navElement, 5000);
});
