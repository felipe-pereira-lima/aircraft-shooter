class Bullet extends GameObject {
  constructor(context, position, direction, maxBoundaries) {
    super();
    this.position = position;
    this.direction = direction;

    this.speed = 5;
    this.isDirty = false;

    this.image = new Image();
    this.image.src = "images/bullet.gif";
    this.maxBoundaries = maxBoundaries;
    this.context = context;
  }

  update(deltaTime) {
    this.position = this.position.sum(this.direction.mult(this.speed));
    if (
      this.position.x > this.maxBoundaries ||
      this.position.y > this.maxBoundaries
    )
      this.isDirty = true;
  }

  draw() {
    this.context.drawImage(this.image, this.position.x, this.position.y);
  }
}
