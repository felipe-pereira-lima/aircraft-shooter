const imagePlane = new Image();
imagePlane.src = 'images/ClipartKey_2324607.png';

class Plane {
  constructor(game) {
    this.game = game;
    this.position = {
      x: 0,
      y: BLOCK_SIZE
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.dimensions = {
      x: BLOCK_SIZE,
      y: BLOCK_SIZE * 2
    };
    this.friction = 15;
  }

  move(direction) {
    switch (direction) {
      case 'up':
        this.velocity.y = -1;
        break;
      case 'right':
        this.velocity.x = 1;
        break;
      case 'down':
        this.velocity.y = 1;
        break;
      case 'left':
        this.velocity.x = -1;
        break;
    }
  }

  paint() {
    const context = this.game.context;
    const $canvas = context.canvas;
    const {
      //position,
      dimensions: { x: width, y: height }
    } = this;

    const x = $canvas.width / 2;
    const y = $canvas.height / 2;
  }
}
