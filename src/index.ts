import './index.scss';

const thumb: HTMLElement = document.querySelector('.slider__thumb');
const slider: HTMLElement = document.querySelector('.slider');

thumb.onmousedown = function (event: MouseEvent) {
  const shiftX = event.clientX - thumb.getBoundingClientRect().left;
  function moveAt(event: MouseEvent) {
    const sliderBorderLeft = slider.getBoundingClientRect().left;
    const sliderWidth = slider.getBoundingClientRect().right - sliderBorderLeft;
    const thumbWidth = thumb.getBoundingClientRect().right - thumb.getBoundingClientRect().left;
    const eventBorderLeft = event.clientX - sliderBorderLeft - shiftX;


    console.log(sliderWidth - thumbWidth)
    if (eventBorderLeft >= 0 && eventBorderLeft <= 286) {
      thumb.style.left = `${(event.clientX - sliderBorderLeft - shiftX)}px`;
    }
  }

  // moveAt(event);

  document.addEventListener('mousemove', moveAt);

  document.onmouseup = function () {
    document.removeEventListener('mousemove', moveAt);
    document.onmouseup = null;
  };
};
