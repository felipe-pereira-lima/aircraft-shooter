class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
  }
}

function startGame() {
  plane.paint();
  plane.move();
}
