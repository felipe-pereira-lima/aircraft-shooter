const BLOCK_SIZE = 30;

class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    Object.assign($canvas, {
      width: $canvas.offsetWidth,
      height: $canvas.offsetHeight
    });
    this.context = this.$canvas.getContext('2d');

    this.keyboardController = new KeyboardController(this);
    this.keyboardController.setKeyBindings();

    this.background = new Background(this);
    this.debug = new Debug(this);
  }

  //control(value) {};

  //randomEnemies() {};

  //removeUnnecessaryProjectiles() {};

  start() {
    this.reset();
    //this.plane = new Plane(this);
    this.loop();
  }

  //reset() {};

  loop() {
    this.flyLogic();
    this.paint();
    window.requestAnimationFrame(timestamp => this.loop(timestamp));
    console.log('que tal?');
  }

  flyLogic() {
    this.plane.flyLogic();
  }

  clear() {
    const { width, height } = this.$canvas;
    this.context.clearRect(0, 0, width, height);
  }

  paint() {
    this.clear();
    this.background.paint();
    //paint enemies blabla later
    this.plane.paint();
    this.debug.paint();
  }
}
