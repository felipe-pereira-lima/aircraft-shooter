class Bullet extends GameObject {
  constructor(context, position, direction, maxBoundaries) {
    super();
    this.position = position;
    this.direction = direction;

    this.size.x = 2;
    this.size.y = 1;

    this.speed = 5;

    this.image = new Image();
    this.image.src = "images/bullet.gif";
    this.maxBoundaries = maxBoundaries;
    this.context = context;
  }

  update(deltaTime) {
    console.log(deltaTime);
    this.position = this.position.sum(this.direction.mult(this.speed));
    if (
      this.position.x > this.maxBoundaries ||
      this.position.y > this.maxBoundaries
    ) {
      this.isAlive = false;
    }
  }

  draw() {
    this.context.drawImage(this.image, this.position.x, this.position.y);
  }

  notifyCollision(other) {
    if (this.isAlive && other instanceof Enemy) {
      this.isAlive = false;
    }
  }
}
