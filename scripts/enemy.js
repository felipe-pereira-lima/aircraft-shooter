//class added

class Enemy extends GameObject {
  constructor(game, position, direction, maxBoundaries) {
    super();
    this.game = game;
    this.position = position;
    this.direction = direction;
    this.size.x = 40;
    this.size.y = 50;

    this.speed = 3;

    this.image = new Image();
    this.image.src = "images/foe.png";
    this.maxBoundaries = maxBoundaries;
  }

  update(deltaTime) {
    this.position = this.position.sum(this.direction.mult(this.speed));
    if (this.position.x < -this.size.x) this.isAlive = false;
  }

  draw() {
    this.game.context.drawImage(this.image, this.position.x, this.position.y);
  }

  notifyCollision(other) {
    if (this.isAlive && other instanceof Bullet) {
      this.isAlive = false;
      this.game.kills++;
    }
  }
}
