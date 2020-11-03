class Thumb {
  param: boolean;

  constructor() {
    this.param = null;
  }

  init(param: boolean = false): string {
    if (param) {
      this.param = true;

      return '<div class="slider__thumb"></div>';
    }

    return `<div class="slider__thumb"></div>
      <div class="slider__thumb"></div>`;
  }
}
