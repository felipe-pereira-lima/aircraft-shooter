class Game {
  constructor($canvas) {
    this.kills = 0;
    this.canvas = $canvas;
    this.context = $canvas.getContext("2d");
    this.menu = new Menu(this);
    this.player = new Player(this);

    this.gameIsRunning = true; //false?
    this.startTime = new Date().getTime();

    this.background = new Background(this);
    //TODO - Enemies properties should be in the enemies constructor
    this.enemyRate = 3000; //added
    this.enemyTimeStamp = 1000; //added
    this.enemyRateIncrease = 4;
    this.minEnemyRate = 500;

    this.gameObjects = [];

    this.currentTime = 0;
    //TODO -Your game shouldnt start right away
    this.menu.draw();
  }

  reset() {
    this.gameObjects = [];
    this.player.position.x = 25;
    this.player.position.y = 100;
    if (!this.animation) {
      this.coreLoop();
    }
  }

  //TODO - Create or a button or a keyboard event listener that is going to start you game
  //TODO - Reorganize you code to have a start that triggers the loop

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
      this.enemyRate = Math.max(this.minEnemyRate, this.enemyRate * 0.975);
    }

    this.player.update(deltaTime);

    //update enemy loop added
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
        } else if (
          this.gameObjects[i].constructor !== this.gameObjects[j].constructor &&
          this.gameObjects[i].checkCollision(this.gameObjects[j])
        ) {
          this.gameObjects[i].notifyCollision(this.gameObjects[j]);
          this.gameObjects[j].notifyCollision(this.gameObjects[i]);
        }
      }
      // Check if is alive
      if (this.gameObjects[i].isAlive == false) {
        this.gameObjects.splice(i, 1);
        i--;
      }
    }
  }

  draw() {
    this.cleanCanvas();

    this.menu.draw();

    this.background.draw();

    this.player.draw();
    //draw enemy loop added
    for (let i = 0; i < this.gameObjects.length; i++)
      this.gameObjects[i].draw();
  }

  //called core because it is in the loop that the game will run.
  coreLoop(timestamp) {
    var oldTime = this.time;
    this.time = timestamp;
    var deltaTime = timestamp - oldTime;

    //TODO - figure out why you are using it
    if (!isNaN(deltaTime)) this.update(deltaTime);

    this.draw();

    if (this.gameIsRunning) {
      this.animation = window.requestAnimationFrame(timestamp => {
        this.coreLoop(timestamp);
      });
    }
  }
}
