"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HomepageCarousel {
    constructor() {
        this.handleControlButtonClick = this.controlButtonClick.bind(this);
        this.view = document.body.querySelector('homepage-hero hero-carousel');
        this._slides = Array.from(this.view.querySelectorAll('slide'));
        this._controls = Array.from(this.view.querySelectorAll('carousel-controls button'));
        this._slideIndex = 0;
        this._dirty = false;
        this.init();
    }
    init() {
        for (let i = 0; i < this._controls.length; i++) {
            this._controls[i].addEventListener('click', this.handleControlButtonClick);
        }
    }
    controlButtonClick(e) {
        const target = e.currentTarget;
        const direction = parseInt(target.dataset.direction);
        this.swapSlide(direction);
    }
    swapSlide(direction) {
        if (this._dirty) {
            return;
        }
        this._dirty = true;
        let newSlideIndex = this._slideIndex + direction;
        if (newSlideIndex < 0) {
            newSlideIndex = this._slides.length - 1;
        }
        else if (newSlideIndex === this._slides.length) {
            newSlideIndex = 0;
        }
        console.log(newSlideIndex);
        this._slides[newSlideIndex].classList.add('is-active');
        this._slides[newSlideIndex].style.zIndex = '3';
        this._slides[this._slideIndex].style.zIndex = '1';
        this._slides[this._slideIndex].classList.add('is-fading');
        setTimeout(() => {
            this._slides[this._slideIndex].classList.remove('is-active');
            this._slides[this._slideIndex].classList.remove('is-fading');
            this._slideIndex = newSlideIndex;
            this._dirty = false;
        }, 650);
    }
}
exports.HomepageCarousel = HomepageCarousel;
new HomepageCarousel();
