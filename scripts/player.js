class Player {
  constructor(game) {
    this.game = game;
    this.positionX = 20;
    this.positionY = 190;
    this.width = 50;
    this.height = 50;
    this.speed = 10;
    this.image = new Image();
    this.image.src = 'images/cup.png';
    console.log(this.game);
    this.setKeyboardEventListeners();
  }

  drawImage() {
    this.game.context.drawImage(this.image, this.positionX - 10, this.positionY - 10); //double check
  }

  setKeyboardEventListeners() {
    window.addEventListener('keydown', event => {
      switch (event.key) {
        case 'ArrowDown':
          if (this.positionY + this.height < this.game.context.canvas.height) {
            this.positionY += this.speed;
          }
          break;
        case 'ArrowUp':
          if (this.positionY > 0) {
            this.positionY -= this.speed;
          }
          break;
        case 'ArrowRight':
          if (this.positionX + this.width < this.game.context.canvas.width) {
            this.positionX += this.speed;
          }
          break;
        case 'ArrowLeft':
          if (this.positionX > 0) {
            this.positionX -= this.speed;
          }
          break;
      }
    });
  }
}
