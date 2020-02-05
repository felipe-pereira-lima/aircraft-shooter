class Player extends GameObject {
  constructor(game) {
    super();
    this.game = game;

    this.position.x = 25;
    this.position.y = 100;
    this.velocityVector = new Vector();
    this.maxSpeed = 6;
    this.accel = 4;

    this.fireRate = 100;
    this.fireTimeStamp = 0;

    this.width = 50;
    this.height = 50;
    this.image = new Image();
    this.image.src = "images/cup.png";

    this.bullets = [];

    console.log(this.game);

    this.setKeyboardEventListeners();
  }

  update(deltaTime) {
    this.velocityVector = this.velocityVector.clamp(
      -this.maxSpeed,
      this.maxSpeed
    );
    this.position = this.position.sum(this.velocityVector);
    this.velocityVector = this.velocityVector.lerp(
      new Vector(),
      deltaTime * 0.005
    );
    this.position = this.position.clampXY(
      0,
      this.game.context.canvas.width - this.width * 2,
      0,
      this.game.context.canvas.height - this.height * 4
    );

    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].isDirty) {
        //when the player shoots, a bullet is added to a li
      } else this.bullets[i].update(deltaTime); //bullet is called
    }
  }

  draw() {
    this.game.context.drawImage(this.image, this.position.x, this.position.y);
    for (let i = 0; i < this.bullets.length; i++) this.bullets[i].draw();
  }

  setKeyboardEventListeners() {
    window.addEventListener("keydown", event => {
      switch (event.key) {
        case "ArrowDown":
          this.velocityVector.y += this.accel;
          break;
        case "ArrowUp":
          this.velocityVector.y -= this.accel;
          break;
        case "ArrowRight":
          this.velocityVector.x += this.accel;
          break;
        case "ArrowLeft":
          this.velocityVector.x -= this.accel;
          break;
        case "Enter":
          if (this.fireTimeStamp < Game.time) {
            this.bullets.push(
              new Bullet(
                this.game.context,
                new Vector(
                  this.position.x + this.width * 1.5,
                  this.position.y + this.height * 0.75
                ),
                new Vector(1, 0),
                this.game.context.canvas.width
              )
            );
            this.fireTimeStamp = Game.time + this.fireRate;
            console.log("fire");
          }
          break;
      }
    });
  }
}
