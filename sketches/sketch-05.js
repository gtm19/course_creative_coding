const canvasSketch = require('canvas-sketch');
import { random } from 'canvas-sketch-util';

const settings = {
  dimensions: [ 1080, 1080 ]
};

let text = "A";
let fontFamily = "serif";
// going to have some async fun with this later
let manager;

const sketch = ({ width, height }) => {
  
  // need to create a smaller, fake canvas which we're then
  // going to read data from to make the real canvas
  const typeCanvas = document.createElement("canvas");
  const typeContext = typeCanvas.getContext("2d");

  const cellWidth = 20;
  const cols = Math.floor(width  / cellWidth); // = 54
  const rows = Math.floor(height / cellWidth); // = 54
  const numCells = cols * rows; // = 2916

  typeCanvas.width  = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'white';
    typeContext.fillRect(0, 0, cols, rows);

    typeContext.fillStyle = "black";
    typeContext.font = `${cols}px ${fontFamily}`;

    const metrics = typeContext.measureText(text);

    const mx = -1 * metrics.actualBoundingBoxLeft;
    const my = -1 * metrics.actualBoundingBoxAscent;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    //        [-----------------] <- add on the margin around the glyph
    const typeX = (cols - mw)  * 0.5 - mx;
    //                            [--] <- move left of glyph all the way to the left of the canvas
    const typeY = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(typeX, typeY);

    // // In case a box around the glyph is helpful
    // typeContext.beginPath();
    // typeContext.rect(mx, my, mw, mh);
    // typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    // this is an array of rgba values like this:
    // [r, g, b, a, r, g, b, a, ...]
    // where each 4 consecutive values are the rgba
    // values for a single pixel
    // 
    // if cols and rows are both 54, this means the length is:
    // 54 * 54 * 4 = 11,664
    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.textBaseline = "middle";
    context.textAlign = "center";

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = cellWidth * (0.5 + col);
      const y = cellWidth * (0.5 + row);

      const r = typeData[i * 4 + 0];
      // not needed as we're dealing with black and white:
      // const g = typeData[i * 4 + 1];
      // const b = typeData[i * 4 + 2];
      // const a = typeData[i * 4 + 3];

      // means it's basically white so we can skip over it
      if (r > 200) continue;
      // otherwise pick a glyph
      const glyph = getGlyph(r);

      context.save();
      context.translate(x, y);

      const glyphSize = Math.random() < 0.1 ? 4 : 2
      context.font = `${cellWidth * glyphSize}px ${fontFamily}`
      context.fillStyle = "black";

      context.fillText(glyph, 0, 0);
      context.restore();
    }
    // // In case seeing a preview of the small image in 
    // // the top left is something you want to see
    // context.drawImage(typeCanvas,0 ,0);
  };
};

const getGlyph = (v) => {
  if (v > 200)  return "" ;
  const glyphs = "_/■ #".split("");

  return random.pick(glyphs);
};

document.addEventListener("keyup", (e) => {
  const key = e.key;
  if (key !== "Shift") {
    text = e.key;
    manager.render();
  }
});

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();
