class Game {
  constructor($canvas) {
    this.canvas = $canvas;
    this.context = $canvas.getContext('2d');
    this.plane = new Player(this);
    this.gameIsRunning = true;
    this.startTime = new Date().getTime();
    this.background = new Background(this);
    this.currentTime = 0;
    this.loop();
  }

  cleanCanvas = () => {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  };

  paint = () => {
    this.cleanCanvas();
    this.background.paint();
    this.plane.drawImage();
  };

  /* background = () => {
    this.background.paint()
  } */

  loop = timestamp => {
    this.background.runLogic();
    this.paint();

    if (this.gameIsRunning) {
      window.requestAnimationFrame(this.loop);
    }
  };
}
