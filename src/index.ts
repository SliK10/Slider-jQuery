import './index.scss';

const thumb: HTMLElement = document.querySelector('.slider__thumb');
const slider: HTMLElement = document.querySelector('.slider');

thumb.onmousedown = function (event: MouseEvent) {
  const shiftX = event.clientX - thumb.getBoundingClientRect().left;
  function moveAt(event: MouseEvent) {
    const sliderBorderLeft = slider.getBoundingClientRect().left;
    const eventBorderLeft = event.pageX - sliderBorderLeft - shiftX;

    console.log(eventBorderLeft);
    console.log(event);
    if (eventBorderLeft >= 0 && eventBorderLeft <= 286) {
      thumb.style.left = `${(eventBorderLeft)}px`;
    } else if (eventBorderLeft > 286) {
      thumb.style.left = `${286}px`;
    } else if (eventBorderLeft < 0) {
      thumb.style.left = `${0}px`;
    }
  }

  document.addEventListener('mousemove', moveAt);

  document.onmouseup = function () {
    document.removeEventListener('mousemove', moveAt);
    document.onmouseup = null;
  };
};
