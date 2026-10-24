class Carousel {
    constructor(sliderElement, navElement, interval = 6000) {
        this.slider = sliderElement;
        this.nav = navElement;
        this.interval = interval;
        this.navDots = this.nav.querySelectorAll('a');
        this.totalSlides = this.slider.querySelectorAll('.slide').length;
        this.currentSlide = 0;

        this.isDragging = false;
        this.hasMoved = false;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.moveThreshold = 5;
        this.snapRatio = 0.3;

        this.rotationInterval = null;
        this.transitionTimer = null;
        this.isTransitioning = false;
        this.inView = true;

        this.onVisibility = () => this.syncAutoRotation();
        this.onResize = () => this.handleResize();
        this.onPointerDown = (e) => this.dragStart(e);
        this.onPointerMove = (e) => this.drag(e);
        this.onPointerUp = (e) => this.dragEnd(e);
        this.onTransitionEnd = (e) => {
            if (e.target === this.slider && e.propertyName === 'transform') {
                this.finishTransition();
            }
        };
        this.onClickCapture = (e) => {
            if (this.hasMoved) {
                e.preventDefault();
                e.stopPropagation();
                this.hasMoved = false;
            }
        };

        this.init();
    }


    init() {
        if (this.totalSlides < 2) return; 

        this.slider.style.willChange = 'transform';
        this.slider.style.touchAction = 'pan-y';

        this.slider.classList.remove('with-transition');
        this.snapTo(0);
        void this.slider.offsetWidth;
        this.slider.classList.add('with-transition');
        this.updateNavigation();

        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSlide(index, true);
            });
        });

        this.slider.addEventListener('pointerdown', this.onPointerDown);
        this.slider.addEventListener('pointermove', this.onPointerMove);
        this.slider.addEventListener('pointerup', this.onPointerUp);
        this.slider.addEventListener('pointercancel', this.onPointerUp);
        this.slider.addEventListener('click', this.onClickCapture, true);
        this.slider.addEventListener('transitionend', this.onTransitionEnd);
        this.slider.addEventListener('dragstart', (e) => e.preventDefault());
        this.slider.addEventListener('contextmenu', (e) => e.preventDefault());

        document.addEventListener('visibilitychange', this.onVisibility);
        window.addEventListener('resize', this.onResize);

        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                this.inView = entries[entries.length - 1].isIntersecting;
                this.syncAutoRotation();
            }, { threshold: 0 });
            this.observer.observe(this.slider.parentElement || this.slider);
        }

        this.syncAutoRotation();
    }

    destroy() {
        this.stopAutoRotation();
        clearTimeout(this.transitionTimer);
        if (this.observer) this.observer.disconnect();
        document.removeEventListener('visibilitychange', this.onVisibility);
        window.removeEventListener('resize', this.onResize);
        this.slider.removeEventListener('pointerdown', this.onPointerDown);
        this.slider.removeEventListener('pointermove', this.onPointerMove);
        this.slider.removeEventListener('pointerup', this.onPointerUp);
        this.slider.removeEventListener('pointercancel', this.onPointerUp);
        this.slider.removeEventListener('click', this.onClickCapture, true);
        this.slider.removeEventListener('transitionend', this.onTransitionEnd);
    }


    translateFor(index) {
        return -index * this.slider.offsetWidth;
    }

    snapTo(index) {
        this.currentSlide = index;
        this.currentTranslate = this.prevTranslate = this.translateFor(index);
        this.setSliderPosition(this.currentTranslate);
    }

    setSliderPosition(translate) {
        this.slider.style.transform = `translate3d(${translate}px, 0, 0)`;
    }

    dragStart(event) {
        if (this.isTransitioning) return;
        if (event.pointerType === 'mouse' && event.button !== 0) return;

        this.stopAutoRotation();
        this.isDragging = true;
        this.hasMoved = false;
        this.startPos = event.clientX;
        this.slider.setPointerCapture(event.pointerId);
    }

    drag(event) {
        if (!this.isDragging) return;

        const diff = event.clientX - this.startPos;
        if (!this.hasMoved && Math.abs(diff) < this.moveThreshold) return;

        if (!this.hasMoved) {
            this.hasMoved = true;
            this.slider.classList.remove('with-transition');
            this.slider.classList.add('grabbing');
        }

        const atStart = this.currentSlide === 0 && diff > 0;
        const atEnd = this.currentSlide === this.totalSlides - 1 && diff < 0;
        const effective = (atStart || atEnd) ? diff * 0.3 : diff;

        this.currentTranslate = this.prevTranslate + effective;
        this.setSliderPosition(this.currentTranslate);
    }

    dragEnd(event) {
        if (!this.isDragging) return;
        this.isDragging = false;

        if (this.slider.hasPointerCapture(event.pointerId)) {
            this.slider.releasePointerCapture(event.pointerId);
        }
        this.slider.classList.remove('grabbing');

        if (!this.hasMoved) {
            this.startAutoRotation();
            return;
        }

        const width = this.slider.offsetWidth;
        const movedBy = this.currentTranslate - this.prevTranslate;
        let target = this.currentSlide;

        if (Math.abs(movedBy) / width > this.snapRatio) {
            if (movedBy > 0 && target > 0) target--;
            else if (movedBy < 0 && target < this.totalSlides - 1) target++;
        }

        this.slider.classList.add('with-transition');
        this.goToSlide(target, true);

        setTimeout(() => { this.hasMoved = false; }, 0);
    }

    goToSlide(index, resetTimer = false) {
        if (this.isTransitioning) return;

        index = Math.max(0, Math.min(index, this.totalSlides - 1));
        const targetTranslate = this.translateFor(index);
        const needsAnimation = Math.abs(targetTranslate - this.currentTranslate) > 0.5;

        this.currentSlide = index;
        this.prevTranslate = targetTranslate;
        this.currentTranslate = targetTranslate;
        this.updateNavigation();

        this.slider.classList.add('with-transition');

        if (needsAnimation) {
            this.isTransitioning = true;
            clearTimeout(this.transitionTimer);
            this.transitionTimer = setTimeout(() => this.finishTransition(), 1000);
        }
        this.setSliderPosition(targetTranslate);

        if (resetTimer) this.resetAutoRotation();
    }

    finishTransition() {
        clearTimeout(this.transitionTimer);
        this.isTransitioning = false;
    }

    nextSlide() {
        if (this.isDragging || this.isTransitioning) return;
        const next = this.currentSlide >= this.totalSlides - 1 ? 0 : this.currentSlide + 1;
        this.goToSlide(next);
    }

    updateNavigation() {
        this.navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentSlide);
        });
    }

    handleResize() {
        this.slider.classList.remove('with-transition');
        this.snapTo(this.currentSlide);
        void this.slider.offsetWidth;
        this.slider.classList.add('with-transition');
        this.finishTransition();
    }


    syncAutoRotation() {
        if (!document.hidden && this.inView && !this.isDragging) {
            this.startAutoRotation();
        } else {
            this.stopAutoRotation();
        }
    }

    startAutoRotation() {
        this.stopAutoRotation();
        if (document.hidden || !this.inView) return;
        this.rotationInterval = setInterval(() => this.nextSlide(), this.interval);
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
    if (!sliderElement || !navElement) return;

    window.carousel = new Carousel(sliderElement, navElement, 6000);
});