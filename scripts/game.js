class Game {
  constructor($canvas) {
    Game.kills = 0;
    this.canvas = $canvas;
    this.context = $canvas.getContext("2d");
    this.menu = new Menu(this);
    this.player = new Player(this);

    this.gameIsRunning = true;
    this.startTime = new Date().getTime();

    this.background = new Background(this);

    this.enemyRate = 1000; //added
    this.enemyTimeStamp = 500; //added
    this.enemyRateIncrease = 50;
    this.minEnemyRate = 100;
    
    this.gameObjects = [];

    this.currentTime = 0;
    this.coreLoop();
  }

  cleanCanvas = () => {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  };

  update(deltaTime) {
    this.background.update();

    console.log(Game.kills);

    if (this.enemyTimeStamp < Game.time) {
        this.gameObjects.push(
            new Enemy( this.context, 
                       new Vector(this.context.canvas.width, Math.random() * this.context.canvas.height * 0.65),
                       new Vector(-1, 0),
                       this.context.canvas.width
            )
        );
        this.enemyTimeStamp = Game.time + this.enemyRate;
        this.enemyRate = Math.max(this.minEnemyRate, this.enemyRate * 0.95);
    }

    this.player.update(deltaTime);
    //update enemy loop added
    for (let i = 0; i < this.gameObjects.length; i++) {
      this.gameObjects[i].update(deltaTime);
      for(let j = 0; j < this.gameObjects.length; j++) {
        if(i == j)
            continue;
        if(this.gameObjects[i] instanceof Enemy && this.gameObjects[i].checkCollision(this.player)) {
            this.gameIsRunning = false;
            return;
        }
        if(this.gameObjects[i].constructor === this.gameObjects[j].constructor) {
            continue;
        }
        if(this.gameObjects[i].checkCollision(this.gameObjects[j])) {

            this.gameObjects[i].notifyCollision(this.gameObjects[j]);
            this.gameObjects[j].notifyCollision(this.gameObjects[i]);
        }
      }
    }
    for (let i = 0; i < this.gameObjects.length; i++) {
        if(this.gameObjects[i].isAlive == false) {
            this.gameObjects.splice(i, 1);
            i--;
        }
    }
    //console.log(this.gameObjects.length);
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
  coreLoop = timestamp => {
    var oldTime = Game.time;
    Game.time = timestamp;

    var deltaTime = timestamp - oldTime;
    if (!isNaN(deltaTime)) this.update(deltaTime);
    this.draw();

    if (this.gameIsRunning) {
      window.requestAnimationFrame(this.coreLoop);
    }
  };
}
