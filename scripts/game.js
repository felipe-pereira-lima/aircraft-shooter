class Game {
  constructor($canvas) {
    this.kills = 0;
    this.canvas = $canvas;
    this.score = document.getElementById("Score");
    this.context = $canvas.getContext("2d");

    this.menu = new Menu(this);
    this.player = new Player(this);

    this.gameIsRunning = false;
    this.startTime = new Date().getTime();

    this.background = new Background(this);
    this.baseRate = 1000;
    this.enemyRate = this.baseRate;
    this.enemyTimeStamp = 200;
    this.enemyRateIncrease = 500;

    this.gameOverImage = new Image();
    this.gameOverImage.src = "images/gameover.png";

    this.gameObjects = [];

    this.currentTime = 0;

    this.menu.draw();
  }

  reset() {
    this.kills = 0;
    this.gameObjects = [];
    this.player.position.x = 25;
    this.player.position.y = 100;
    this.enemyRate = this.baseRate;

    if (!this.gameIsRunning) {
      this.gameIsRunning = true; // = !=gameIsRunning
      this.coreLoop();
    }
  }

  cleanCanvas = () => {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  };

  update(deltaTime) {
    this.background.update();

    if (this.enemyTimeStamp < this.time) {
      const enemy = new Enemy(
        this,
        new Vector(
          this.context.canvas.width,
          Math.random() * this.context.canvas.height * 0.8
        ),
        new Vector(-1, 0),
        this.context.canvas.width
      );
      this.gameObjects.push(enemy);
      this.enemyTimeStamp = this.time + this.enemyRate;
      this.enemyRate = this.enemyRate * 0.99;
    }

    this.player.update(deltaTime);

    for (let i = 0; i < this.gameObjects.length; i++) {
      this.gameObjects[i].update(deltaTime);
      for (let j = 0; j < this.gameObjects.length; j++) {
        if (i === j) {
          continue;
        } else if (
          this.gameObjects[i] instanceof Enemy &&
          this.gameObjects[i].checkCollision(this.player)
        ) {
          this.gameIsRunning = false;
          this.menu.endScreenDraw();
        } else if (
          this.gameObjects[i].constructor !== this.gameObjects[j].constructor &&
          this.gameObjects[i].checkCollision(this.gameObjects[j])
        ) {
          this.gameObjects[i].notifyCollision(this.gameObjects[j]);
          this.gameObjects[j].notifyCollision(this.gameObjects[i]);
        }
      }
      if (
        this.gameObjects.length !== 0 &&
        this.gameObjects[i].isAlive == false
      ) {
        this.gameObjects.splice(i, 1);
        i--;
      }
    }
  }

  draw() {
    this.cleanCanvas();

    if (!this.gameIsRunning) {
      this.menu.draw();
    } else {
      this.background.draw();

      this.player.draw();

      for (let i = 0; i < this.gameObjects.length; i++) {
        this.gameObjects[i].draw();
      }
    }
  }

  coreLoop(timestamp) {
    var oldTime = this.time;
    this.time = timestamp;
    var deltaTime = timestamp - oldTime;

    if (!isNaN(deltaTime)) this.update(deltaTime);

    if (this.gameIsRunning) {
      this.draw();
      this.score.innerText = `Score: ${this.kills}`;
      this.animation = window.requestAnimationFrame(timestamp => {
        this.coreLoop(timestamp);
      });
    }
  }
}
