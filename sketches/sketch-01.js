const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080],
  pixelsPerInch: 300
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const drawSquare = (x, y, width, height, fill = "#FF5959") => {
      context.lineWidth = 4;
      context.beginPath();
      context.rect(x, y, width, height);
      context.fillStyle = fill;
      context.fill();
    }

    const w = width * 0.1;
    const h = w;
    const gap = width * 0.03;
    const offset = width * 0.02;
    const ix = width * 0.19;
    const iy = ix;
    let x, y;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (w + gap) * i;
        y = iy + (w + gap) * j;

      drawSquare(x, y, w, h);

      if (Math.random() > 0.6) {
          drawSquare(x + offset, y + offset, w - offset * 2, h - offset * 2, fill = "#676FA3");
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
