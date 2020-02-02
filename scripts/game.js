class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
  }
}

function startGame() {
  plane.paint();
  plane.moveUp(); //YOU NEED TO CALL THE GOD DAMN FUNCTION!
}
