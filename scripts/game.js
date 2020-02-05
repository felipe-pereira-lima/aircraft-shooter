class Game {
  constructor($canvas) {
    this.canvas = $canvas;
    this.context = $canvas.getContext("2d");
    this.menu = new Menu(this);
    this.player = new Player(this);

    this.gameIsRunning = true;
    this.startTime = new Date().getTime();

    this.background = new Background(this);

    this.enemyRate = 100; //added
    this.enemyTimeStamp = 0; //added
    this.enemy = []; //added

    this.currentTime = 0;
    this.setKeyboardEventListeners(); //added
    this.coreLoop();
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

    this.player.update(deltaTime);
    //update enemy loop added
    for (let i = 0; i < this.enemy.length; i++) {
      this.enemy[i].update(deltaTime);
    }
  }

  draw() {
    this.cleanCanvas();

    this.menu.draw();

    this.background.draw();

    this.player.draw();
    //draw enemy loop added
    for (let i = 0; i < this.enemy.length; i++) this.enemy[i].draw();
  }

  //whole enemy method added
  setKeyboardEventListeners() {
    window.addEventListener("keydown", event => {
      switch (event.key) {
        case "a":
          if (this.enemyTimeStamp < Game.time) {
            this.enemy.push(
              new Enemy(
                this.context,
                new Vector(
                  this.enemy.position + this.enemy.width,
                  this.enemy.position + this.enemy.height
                ),
                new Vector(1, 0),
                this.context.canvas.width
              )
            );
            this.enemyTimeStamp = Game.time + this.enemyRate;
            console.log("enemy!");
          }
          break;
      }
    });
  }

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
