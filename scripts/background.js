const $canvas = document.querySelector('canvas');
const context = $canvas.getContext('2d');

let x = 0;

const speed = 5;

const backgroundImage = new Image();
backgroundImage.src = 'images/bg.jpg';

const runLogic = () => {
  /*
  if (x < -1 * context.canvas.width) {
    x = 0;
  }
  */
  x -= speed;
  if (x < -790) {
    debugger;
  }
  if (backgroundImage.width) {
    x = x % backgroundImage.width;
  }
};

const paint = () => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.drawImage(backgroundImage, x, 0);

  context.drawImage(backgroundImage, backgroundImage.width + x, 0);
};

const loop = timestamp => {
  runLogic();
  paint();

  window.requestAnimationFrame(loop);
};

loop();
