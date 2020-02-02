class Plane {
  constructor() {
    this.positionX = 20;
    this.positionY = 190;
    this.dimensions = 50;
    this.speed = 20;
    this.LEFTLIMIT = 10;
    this.RIGHTLIMIT = 290;
    this.TOPLIMIT = 10;
    this.BOTTOMLIMIT = 410;
    this.moveSpeed = 15;
    this.moveUp();
    this.moveLeft();
    this.moveRight();
    this.moveDown();
    this.paint(); //método do carro! faltou fazer isso
  }

  paint() {
    const planeUrl = 'images/ClipartKey_2324607.png';
    const imagePlane = new Image();
    imagePlane.src = planeUrl;
    console.log('paint has been called'); //this is just to test
    imagePlane.addEventListener('load', () => {
      context.drawImage(imagePlane, this.positionX, this.positionY, 100, 100);
    });
  }

  moveUp() {
    this.y -= 25;
  }
  moveDown() {
    this.y += 25;
  }
  moveLeft() {
    this.x -= 25;
  }
  moveRight() {
    this.x += 25;
  }
}

const plane = new Plane();
