class Menu {
  constructor(game) {
    this.game = game;
    this.screen = "menu";
    this.image = new Image();
    this.image.src = "images/menu.png";
    this.setKeyboardEventListeners();
  }

  draw() {
    window.addEventListener("load", event => {
      this.game.context.drawImage(this.image, 0, 0, 620, 480);
    });
  }

  setKeyboardEventListeners() {
    window.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 13:
          if (this.screen === "menu") {
            this.game.gameIsRunning = true;
            this.game.reset();
          }
          break;
      }
    });
  }
}
