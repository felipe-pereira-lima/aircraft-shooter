class Background extends GameObject {
  constructor(game) {
    super();
    this.game = game;
    this.x = 0;

    this.speed = 5;

    this.backgroundImage = new Image();
    this.backgroundImage.src = "images/bg.jpg";
    this.backgroundImage.width = 600;
  }

  update(deltaTime) {
    this.x -= this.speed;
    if (this.x < -790) {
      debugger;
    }
    if (this.backgroundImage.width) {
      this.x = this.x % this.backgroundImage.width;
    }
  }

  draw() {
    this.game.context.clearRect(
      0,
      0,
      this.game.context.canvas.width,
      this.game.context.canvas.height
    );
    this.game.context.drawImage(this.backgroundImage, this.x, 0);

    this.game.context.drawImage(
      this.backgroundImage,
      this.backgroundImage.width + this.x,
      0
    );
  }
}
