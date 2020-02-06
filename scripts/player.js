class Player extends GameObject {
  constructor(game) {
    super();
    this.kills = 0;
    this.game = game;

    this.position.x = 25;
    this.position.y = 100;
    this.size.x = 50;
    this.size.y = 50;

    this.velocityVector = new Vector();
    this.maxSpeed = 6;
    this.accel = 4;

    this.fireRate = 100;
    this.fireTimeStamp = 0;

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
      this.game.context.canvas.width - this.size.x * 2,
      0,
      this.game.context.canvas.height - this.size.y * 4
    );

    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].isDirty) {
        //when the player shoots, a bullet is added to a list
      } else this.bullets[i].update(deltaTime); //bullet is called
    }
  }

  draw() {
    this.game.context.drawImage(this.image, this.position.x, this.position.y);
    for (let i = 0; i < this.bullets.length; i++) this.bullets[i].draw();
  }

  setKeyboardEventListeners() {
    window.addEventListener("keydown", event => {
      event.preventDefault();
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
        case " ":
          if (this.fireTimeStamp < this.game.time) {
            this.game.gameObjects.push(
              new Bullet(
                this.game.context,
                new Vector(
                  this.position.x + this.size.x * 1.5,
                  this.position.y + this.size.y * 0.75
                ),
                new Vector(1, 0),
                this.game.context.canvas.width
              )
            );
            this.fireTimeStamp = this.game.time + this.fireRate;
            console.log("fire");
          }
          break;
      }
    });
  }
}
