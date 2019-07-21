export class HomepageCarousel
{
    public view : HTMLElement;
    private _slides : Array<HTMLElement>;
    private _controls : Array<HTMLElement>;
    
    private _slideIndex : number;
    private _dirty : boolean;

    constructor()
    {
        this.view = document.body.querySelector('homepage-hero hero-carousel');
        this._slides = Array.from(this.view.querySelectorAll('slide'));
        this._controls = Array.from(this.view.querySelectorAll('carousel-controls button'));
        this._slideIndex = 0;
        this._dirty = false;
        
        this.init();
    }

    private handleControlButtonClick:EventListener = this.controlButtonClick.bind(this);

    private init() : void
    {
        for (let i = 0; i < this._controls.length; i++)
        {
            this._controls[i].addEventListener('click', this.handleControlButtonClick);
        }
    }

    private controlButtonClick(e:Event) : void
    {
        const target = <HTMLButtonElement>e.currentTarget;
        const direction = parseInt(target.dataset.direction);
        this.swapSlide(direction);
    }

    private swapSlide(direction:number) : void
    {
        if(this._dirty)
        {
            return;
        }

        this._dirty = true;
        let newSlideIndex = this._slideIndex + direction;

        if(newSlideIndex < 0)
        {
            newSlideIndex = this._slides.length - 1;
        }
        else if(newSlideIndex === this._slides.length)
        {
            newSlideIndex = 0;
        }

        console.log(newSlideIndex);

        this._slides[newSlideIndex].classList.add('is-active');
        this._slides[newSlideIndex].style.zIndex = '3';
        this._slides[this._slideIndex].style.zIndex = '1';
        this._slides[this._slideIndex].classList.add('is-fading');

        setTimeout(()=>{
            this._slides[this._slideIndex].classList.remove('is-active');
            this._slides[this._slideIndex].classList.remove('is-fading');
            this._slideIndex = newSlideIndex;
            this._dirty = false;
        }, 650);
    }
}

new HomepageCarousel();