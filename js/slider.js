'use strict'

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');
const btnPrev = document.querySelector('.slider__button--prev');
const btnNext = document.querySelector('.slider__button--next');
let curSlide = 0;
let xDown = null;
let yDown = null;


const createDots = function(){
   slides.forEach((_,index) => dotContainer.insertAdjacentHTML('beforeend',`<a class="dots__dot dots__dot--active" data-slide="${index}"></a>`))
}
createDots();

const activeDot = (slide) => {
    document.querySelectorAll('.dots__dot').forEach(dot => {
        dot.classList.remove('dots__dot--active');
    });

    document.querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList
    .add('dots__dot--active');
}



const gotoSlide = slide => {
    slides.forEach((s,idx) => {
        s.style.transform = `translateX(${100 * (idx - slide)}%)`;
    })
    activeDot(slide);
}
gotoSlide(0);


const prevSlide = () => {
    if (curSlide === 0) {
        curSlide = slides.length -1;
    }else{
        curSlide--;
    }
    gotoSlide(curSlide)
}
const nextSlide = () => {
    if (curSlide === slides.length -1) {
        curSlide = 0;
    }else{
        curSlide++;
    }

    gotoSlide(curSlide);

}
const getTouches = evt => evt.touches || evt.originalEvent.touches;
const handleTouchStart = evt => {
    const [firstTouch] = getTouches(evt);
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

const handleTouchMove = evt => {
    if(!xDown || !yDown){
        return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
           nextSlide();
        }else{
            prevSlide();
        }
    }

    xDown = null;
    yDown = null;


}

dotContainer.addEventListener('click',e => {
    if(e.target.classList.contains('dots__dot')){
        const {slide} = e.target.dataset;
        gotoSlide(slide);
    }
})


document.addEventListener('keydown',e => {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
})

btnNext.addEventListener('click',nextSlide);
btnPrev.addEventListener('click',prevSlide);

slides.forEach(slide => {
    slide.addEventListener('touchstart', handleTouchStart,false);

    slide.addEventListener('touchmove',handleTouchMove,false);
})

