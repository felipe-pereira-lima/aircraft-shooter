class KeyboardController {
  constructor(game) {
    this.game = game;
    this.active = [];
  }

  setKeyBindings() {
    window.addEventListener('keydown', event => {
      const code = event.keyCode;
      const codeMap = {
        32: 'space',
        37: 'left',
        39: 'right'
      };
      if (Object.keys(codeMap).includes(code.toString())) {
        event.preventDefault();
        const value = codeMap[code];
        switch (value) {
          case 'space':
            this.game.control('jump');
            break;
          case 'left':
          case 'right':
            // this.player.move(value);
            if (!this.active.includes(value)) this.active.push(value);
            break;
        }
      }
    });

    window.addEventListener('keyup', event => {
      const code = event.keyCode;
      const codeMap = {
        37: 'left',
        39: 'right'
      };
      if (Object.keys(codeMap).includes(code.toString())) {
        event.preventDefault();
        const value = codeMap[code];
        switch (value) {
          case 'left':
          case 'right':
            const index = this.active.indexOf(value);
            if (index >= 0) this.active.splice(index, 1);
            break;
        }
      }
    });
  }

  control(value) {
    this.game.control(value);
  }
}
