interface SliderParam {
  width: number;
  element: HTMLElement;
  sliderBorderLeft: number;
}

class View {
  slider: SliderParam;

  container: NodeListOf<HTMLElement>;

  thumb: HTMLElement;

  shiftX: number;

  eventBorderLeft: number;

  eventFrameWidth: number;

  eventFrameHeight: number;

  constructor() {
    this.container = null;

    this.slider = {
      width: null,
      element: null,
      sliderBorderLeft: null,
    };
    this.thumb = null;
    this.shiftX = null;

    this.moveAt = this.moveAt.bind(this);

    this.mouseUp = this.mouseUp.bind(this);
  }

  sliderInit(initDiv: string) {
    this.container = document.querySelectorAll(initDiv);

    for (let i = 0; i < this.container.length; i += 1) {
      this.container[i].innerHTML = `
        <div class="slider">
          <div class="slider__thumb"></div>
        </div>`;
    }
    document.addEventListener('mousedown', this.mouseDown.bind(this));
  }

  mouseDown(event: MouseEvent): void {
    const target = (<HTMLElement>event.target);

    if (target.classList.contains('slider__thumb')) {
      this.thumb = target;
      this.slider.element = this.thumb.parentElement;

      this.shiftX = event.clientX - this.thumb.getBoundingClientRect().left;

      document.addEventListener('mousemove', this.moveAt);

      document.addEventListener('mouseup', this.mouseUp);
    }
  }

  moveAt(event: MouseEvent): void {
    this.slider.sliderBorderLeft = this.slider.element.getBoundingClientRect().left;
    this.eventBorderLeft = event.clientX - this.slider.sliderBorderLeft - this.shiftX;
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

const slider = new View();

slider.sliderInit('.range-slider');
