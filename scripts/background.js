const $canvas = document.querySelector('canvas');
const context = $canvas.getContext('2d');

var background = new Image();
background.src = 'https://i.pinimg.com/originals/be/ba/cc/bebacca37611dbb7004be7363f74dfb9.jpg';

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function() {
  context.drawImage(background, 0, 0);
};
