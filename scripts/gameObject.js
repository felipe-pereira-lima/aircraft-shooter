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
    //this means interpolação linear
    if (isNaN(amount)) {
      return this;
    }
    return new Vector(Lerp(this.x, to.x, amount), Lerp(this.y, to.y, amount));
  }
  clamp(min, max) {
    //this limits values up to a certain value
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
//every other class will inherit the stuff from Vector + GameObject
//2 methods: update & draw

class GameObject {
  constructor() {
    this.position = new Vector();
  }
  update(deltaTime) {
    //this method updates positions and logic
  }
  draw() {
    //this method draws on screen
  }
}
