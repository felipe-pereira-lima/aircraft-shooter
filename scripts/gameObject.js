const Lerp = function(value1, value2, amount) {
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
    if (isNaN(amount)) {
      return this;
    }
    return new Vector(Lerp(this.x, to.x, amount), Lerp(this.y, to.y, amount));
  }
  clamp(min, max) {
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

class GameObject {
  constructor() {
    this.name = "";
    this.isAlive = true;
    this.position = new Vector();
    this.size = new Vector();
  }
  update(deltaTime) {}
  draw() {}
  checkCollision(other) {
    return (
      other.position.x + other.size.x > this.position.x &&
      other.position.x < this.position.x + this.size.x &&
      other.position.y + other.size.y > this.position.y &&
      other.position.y < this.position.y + this.size.y
    );
  }
  notifyCollision(other) {
    //
  }
}
