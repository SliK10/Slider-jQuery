import './index.scss';

class Slider {
  classElem: string;

  elem: HTMLElement;

  shiftX: number;

  shiftY: number;

  constructor(name: string) {
    this.classElem = name;
    this.elem;
    this.shiftX;
    this.shiftY;
  }

  sliderInit() {
    this.elem = document.querySelector(this.classElem);
    this.elem.addEventListener('mousedown', this.dragAndDrop.bind(this));
    this.elem.ondragstart = () => false;
  }

  dragAndDrop(event: MouseEvent) {
    this.shiftX = event.clientX - this.elem.getBoundingClientRect().left;
    this.shiftY = event.clientY;

    this.elem.style.position = 'absolute';
    this.elem.style.zIndex = '1000';
    // document.body.append(this.elem);

    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    console.log('======');
    document.addEventListener('mouseup', this.removeListener.bind(this));
  }

  onMouseMove(event: MouseEvent) {
    this.moveAt(event.pageX);
  }

  moveAt(pageX: number) {
    this.elem.style.left = `${pageX - this.shiftX}px`;
    this.elem.style.top = `${this.shiftY}px`;
  }

  removeListener() {
    document.removeEventListener('mousemove', this.onMouseMove);
    this.elem.addEventListener('mouseup', null);
    console.log('событие отработало');
  }
}

const mySlidr = new Slider('.slider__thumb');

mySlidr.sliderInit();
