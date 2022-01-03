const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

let text = "A";
let fontSize = 1200;
let fontFamily = "serif";
let manager;

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);


    context.fillStyle = "black";
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseline = "top";
    // context.textAlign = "center";

    const metrics = context.measureText(text);
    console.log(metrics);

    const mx = -1 * metrics.actualBoundingBoxLeft;
    const my = -1 * metrics.actualBoundingBoxAscent;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    //        [-----------------] <- add on the margin around the glyph
    const x = (width - mw)  * 0.5 - mx;
    //                            [--] <- move left of glyph all the way to the left of the canvas
    const y = (height - mh) * 0.5 - my;

    context.save();
    context.translate(x, y);

    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();

    context.fillText(text, 0, 0);
    context.restore();
  };

};

document.addEventListener("keyup", (e) => {
  console.log(e);
  key = e.key;
  if (key !== "Shift") {
    text = e.key;
    manager.render();
  }
});

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();