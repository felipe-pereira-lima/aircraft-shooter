let BLOCK_SIZE = 30;

class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.$canvas.height = 580;
    this.$canvas.width = 420;
    this.context = this.$canvas.getContext('2d');

    /*     this.keyboardController = new KeyboardController(this);
    this.keyboardController.setKeyBindings(); */

    this.background = new Background(this);
  }

  start() {
    this.plane = new Plane(this);
    this.loop();
  }

  loop() {
    this.flyLogic();
    this.draw();
    window.requestAnimationFrame(timestamp => this.loop(timestamp));
  }

  flyLogic() {
    this.plane.flyLogic();
  }

  clear() {
    const { width, height } = this.$canvas;
    this.context.clearRect(0, 0, width, height);
  }

  draw() {
    this.background.draw();
    this.plane.draw();
  }
}
