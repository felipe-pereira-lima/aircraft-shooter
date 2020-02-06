Lerp = function(value1, value2, amount) {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;
  return value1 + (value2 - value1) * amount;
};

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  sum(otherVector) {
    if (isNaN(otherVector.x)) {
      return this;
    }
    return new Vector(this.x + otherVector.x, this.y + otherVector.y);
  }
  mult(number) {
    if (isNaN(number)) {
      return this;
    }
    return new Vector(this.x * number, this.y * number);
  }
  lerp(to, amount) {
    //lerp avoids "teleportation" and eases the values
    if (isNaN(amount)) {
      return this;
    }
    return new Vector(Lerp(this.x, to.x, amount), Lerp(this.y, to.y, amount));
  }
  clamp(min, max) {
    //this limits values between the defined range
    if (isNaN(min) || isNaN(max)) {
      return this;
    }
    return new Vector(
      Math.min(Math.max(this.x, min), max),
      Math.min(Math.max(this.y, min), max)
    );
  }
  clampXY(minX, maxX, minY, maxY) {
    if (isNaN(minY) || isNaN(minX) || isNaN(maxX) || isNaN(maxY)) {
      return this;
    }
    return new Vector(
      Math.min(Math.max(this.x, minX), maxX),
      Math.min(Math.max(this.y, minY), maxY)
    );
  }
}
//every other class will inherit the methods above

//2 methods in GameObject: update & draw
class GameObject {
  constructor() {
    this.name     = "";
    this.isAlive  = true;
    this.position = new Vector();
    this.size     = new Vector();
  }
  update(deltaTime) {
    //this method updates positions and logic
    //deltaTime means the difference between the current frame and the frame before
  }
  draw() {
    //this method draws on screen
  }
  checkCollision(other) {
    return other.position.x + other.size.x > this.position.x &&
            other.position.x < this.position.x + this.size.x &&
            other.position.y + other.size.y > this.position.y &&
            other.position.y < this.position.y + this.size.y;
  }
  notifyCollision(other) {
    //
  }
}
