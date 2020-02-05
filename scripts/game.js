class Game {
  constructor($canvas) {
    this.canvas = $canvas;
    this.context = $canvas.getContext("2d");

    this.player = new Player(this);

    this.gameIsRunning = true;
    this.startTime = new Date().getTime();

    this.background = new Background(this);

    this.enemyRate = 20;
    this.enemyTimeStamp = 0;

    this.enemy = [];

    this.currentTime = 0;
    this.coreLoop();
    this.setKeyboardEventListeners();
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

    for (let i = 0; i < this.enemy.length; i++) {
      this.enemy[i].update(deltaTime);
    }
  }

  draw() {
    this.cleanCanvas();

    this.background.draw();

    this.player.draw();

    for (let i = 0; i < this.enemy.length; i++) this.enemy[i].draw();
  }

  setKeyboardEventListeners() {
    window.addEventListener("keydown", event => {
      switch (event.key) {
        case "a":
          if (this.enemyTimeStamp < Game.time) {
            this.enemy.push(
              new Enemy(
                this.context,
                new Vector(
                  this.enemy.position + this.enemy.width * 1.5,
                  this.enemy.position + this.enemy.height * 0.75
                ),
                new Vector(1, 0),
                this.context.canvas.width
              )
            );
            this.enemyTimeStamp = Game.time + this.enemyRate;
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
