import './subView/thumb.ts';

interface LineParam {
  width: number;
  element: HTMLElement;
  sliderBorderLeft: number;
}

interface ThumbParam {
  element: HTMLElement;
  width: number;
}

interface SliderParameters {
  double: boolean;
  min: number;
  max: number;
  orientation: string;
  interval: number;
  tickMarks: boolean;
  value: number;
  values: [number, number];
  progressBar: boolean;
}

class View {
  sliderParam: SliderParameters;

  lineParam: LineParam;

  container: NodeListOf<HTMLElement>;

  thumb: ThumbParam;

  shiftX: number;

  eventBorderLeft: number;

  eventFrameWidth: number;

  eventFrameHeight: number;

  constructor() {
    this.container = null;
    this.sliderParam = {
      double: null,
      min: null,
      max: null,
      orientation: null,
      interval: null,
      tickMarks: null,
      value: null,
      values: null,
      progressBar: null,
    };
    this.lineParam = {
      width: null,
      element: null,
      sliderBorderLeft: null,
    };
    this.thumb = {
      element: null,
      width: null,
    };
    this.shiftX = null;

    this.moveAt = this.moveAt.bind(this);

    this.mouseUp = this.mouseUp.bind(this);
  }

  sliderInit(initDiv: SliderParameters) {
    this.container = document.querySelectorAll('.range-slider');
    this.sliderParam = initDiv;
    for (let i = 0; i < this.container.length; i += 1) {
      this.container[i].innerHTML = `
        <div class="slider">
          <div class="slider__line">
            ${}
          </div>
        </div>`;
    }
    document.addEventListener('mousedown', this.mouseDown.bind(this));
  }

  mouseDown(event: MouseEvent): void {
    const target = (<HTMLElement>event.target);

    if (target.classList.contains('slider__thumb')) {

      // ===== Start ======
      this.thumb.element = target;
      const thumbWidth = (getComputedStyle(this.thumb.element));
      console.log(parseFloat(thumbWidth.width));
      this.thumb.width = parseFloat(thumbWidth.width);
      this.lineParam.element = this.thumb.element.parentElement;
      this.lineParam.width = parseFloat(getComputedStyle(this.lineParam.element).width);
      // ===== End =====
      this.shiftX = event.clientX - this.thumb.element.getBoundingClientRect().left;

      document.addEventListener('mousemove', this.moveAt);

      document.addEventListener('mouseup', this.mouseUp);
    }
  }

  moveAt(event: MouseEvent): void {
    this.lineParam.sliderBorderLeft = this.lineParam.element.getBoundingClientRect().left;
    this.eventBorderLeft = event.clientX - this.lineParam.sliderBorderLeft - this.shiftX;
    this.eventFrameWidth = event.view.frames.innerWidth;
    this.eventFrameHeight = event.view.frames.innerHeight;

    console.log(this.lineParam.width);
    let maxWidthEvent = this.lineParam.width - this.thumb.width;

    if (event.clientX >= this.eventFrameWidth) {
      return;
    }
    if (event.clientY >= this.eventFrameHeight || event.clientY <= 0) {
      return;
    }
    if (this.eventBorderLeft >= 0 && this.eventBorderLeft <= maxWidthEvent) {
      this.thumb.element.style.left = `${(this.eventBorderLeft)}px`;
    } else if (this.eventBorderLeft > maxWidthEvent) {
      this.thumb.element.style.left = `${maxWidthEvent}px`;
    } else if (this.eventBorderLeft < 0) {
      this.thumb.element.style.left = `${0}px`;
    }
  }

  mouseUp(): void {
    document.removeEventListener('mousemove', this.moveAt);
    document.removeEventListener('mouseup', this.mouseUp);
  }
}

// const slider = new View();

// slider.sliderInit();
