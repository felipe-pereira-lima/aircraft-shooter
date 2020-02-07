class Menu {
  constructor(game) {
    this.game = game;
    this.screen = "menu";
    this.imageOver = new Image();
    this.imageOver.src = "images/gameover.png";

    this.setKeyboardEventListeners();
  }

  draw() {
    this.image = new Image();
    this.image.src = "images/menu.png";
    this.image.addEventListener("load", () => {
      this.game.context.drawImage(this.image, 0, 0, 620, 480);
    });
  }

  endScreenDraw() {
    this.game.context.drawImage(this.imageOver, 0, 0, 620, 480);
  }

  setKeyboardEventListeners() {
    window.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 13:
          this.game.reset();

          break;
      }
    });
  }
}
