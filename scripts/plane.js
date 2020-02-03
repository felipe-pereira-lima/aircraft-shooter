class Plane {
  constructor(game) {
    this.game = game;
    this.positionX = 20;
    this.positionY = 190;
  }
  move() {}

  draw() {
    const planeUrl = 'images/ClipartKey_2324607.png';
    const imagePlane = new Image();
    imagePlane.src = planeUrl;
    console.log('paint has been called'); //this is just to test
    imagePlane.addEventListener('load', () => {
      context.drawImage(imagePlane, this.positionX, this.positionY, 100, 100);
    });
  }
}

const plane = new Plane();
