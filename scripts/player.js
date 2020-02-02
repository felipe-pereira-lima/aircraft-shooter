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
    this.moveSpeed = 10;
    this.paint();
    this.move();
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

  move() {
    window.addEventListener('keydown', event => {
      // Stop the default behavior (moving the screen to the left/up/right/down)
      event.preventDefault();

      // React based on the key pressed
      switch (event.keyCode) {
        case 37:
          if (this.positionX > 0) {
            this.positionX -= this.moveSpeed;
            break;
          }
        case 39:
          if (this.positionX < 290) {
            this.positionX += this.moveSpeed;
            break;
          }
      }
    });
  }
}

const plane = new Plane();
