import './index.scss';

// const thumb: HTMLElement = document.querySelector('.slider__thumb');
// const slider: HTMLElement = document.querySelector('.slider');

// thumb.onmousedown = function (event: MouseEvent) {
//   const shiftX = event.clientX - thumb.getBoundingClientRect().left;
//   function moveAt(event: MouseEvent) {
//     const sliderBorderLeft = slider.getBoundingClientRect().left;
//     const eventBorderLeft = event.pageX - sliderBorderLeft - shiftX;
//     const eventFrameWidth = event.view.frames.outerWidth;

//     if (event.clientX >= eventFrameWidth) {
//       return;
//     }
//     if (eventBorderLeft >= 0 && eventBorderLeft <= 286) {
//       thumb.style.left = `${(eventBorderLeft)}px`;
//     } else if (eventBorderLeft > 286) {
//       thumb.style.left = `${286}px`;
//     } else if (eventBorderLeft < 0) {
//       thumb.style.left = `${0}px`;
//     }
//   }

//   document.addEventListener('mousemove', moveAt);

//   document.onmouseup = function () {
//     document.removeEventListener('mousemove', moveAt);
//     document.onmouseup = null;
//   };
// };

class Slider {
  slider: HTMLElement;

  thumb: HTMLElement;

  shiftX: number;

  sliderBorderLeft: number;

  eventBorderLeft: number;

  eventFrameWidth: number;

  eventFrameHeight: number;

  constructor() {
    this.slider = null;
    this.thumb = null;
    this.shiftX = null;

    this.moveAt = this.moveAt.bind(this);

    this.mouseUp = this.mouseUp.bind(this);
  }

  sliderInit(sliderClass: string, thumbClass: string) {
    this.slider = document.querySelector(`${sliderClass}`);
    this.thumb = document.querySelector(`${thumbClass}`);

    this.thumb.addEventListener('mousedown', this.mouseDown.bind(this));
  }

  mouseDown(event: MouseEvent): void {
    this.shiftX = event.clientX - this.thumb.getBoundingClientRect().left;

    document.addEventListener('mousemove', this.moveAt);

    document.addEventListener('mouseup', this.mouseUp);
  }

  moveAt(event: MouseEvent): void {
    this.sliderBorderLeft = this.slider.getBoundingClientRect().left;
    this.eventBorderLeft = event.clientX - this.sliderBorderLeft - this.shiftX;
    this.eventFrameWidth = event.view.frames.innerWidth;
    this.eventFrameHeight = event.view.frames.innerHeight;

    if (event.clientX >= this.eventFrameWidth) {
      return;
    }
    if (event.clientY >= this.eventFrameHeight || event.clientY <= 0) {
      return;
    }
    if (this.eventBorderLeft >= 0 && this.eventBorderLeft <= 286) {
      this.thumb.style.left = `${(this.eventBorderLeft)}px`;
    } else if (this.eventBorderLeft > 286) {
      this.thumb.style.left = `${286}px`;
    } else if (this.eventBorderLeft < 0) {
      this.thumb.style.left = `${0}px`;
    }
  }

  mouseUp(): void {
    document.removeEventListener('mousemove', this.moveAt);
    document.removeEventListener('mouseup', this.mouseUp);
  }
}

const slider = new Slider();

slider.sliderInit('.slider', '.slider__thumb');
