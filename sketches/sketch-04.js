import canvasSketch from "canvas-sketch";
import { random } from "canvas-sketch-util";

const settings = {
  animate: true,
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = 12;
    const rows = 12;
    const numCells = cols * rows;

    const gridWidth  = width  * 0.8;
    const gridHeight = height * 0.8;
    const cellWidth  = gridWidth / cols;
    const cellHeight = gridHeight / rows;

    const marginX = (width  - gridWidth)  * 0.5;
    const marginY = (height - gridHeight) * 0.5;
    
    
    for (let i = 0; i < numCells; i++) {

      // e.g. 0, 1, 2, 3, 4, 5, 6, 7...
      const col = i % cols;
      // e.g. 0, 0, 0, 0, 1, 1, 1, 1...
      const row = Math.floor(i / cols);
      
      // move origin along required number of cols / rows
      let x = col * cellWidth;
      let y = row * cellHeight;

      const n = random.noise2D(x + frame * 5, y + frame * 5, 0.001);
      const angle = 0.2 * n * Math.PI * 2

      const scale = (n + 1) / 2 * 24;

      // include overall plot margin
      x += marginX;
      y += marginY;

      // move origin to vertical and horizonatal centre of cell
      x += cellWidth * 0.5;
      y += cellHeight * 0.5;

      // calculate within cell widths and height, taking into account
      // a small margin
      const w = cellWidth  * 0.8;
      const h = cellHeight * 0.8;

      context.save();

      // actually do all the translations detailed above
      context.translate(x, y);
      context.rotate(angle);

      context.lineWidth = scale;
      context.beginPath();
      // put pointer half a width to left of centre
      context.moveTo(-0.5 * w, 0);
      // draw line across the within-cell width defined above
      context.lineTo( 0.5 * w, 0);
      context.stroke();

      context.restore();

    }

  };
};

canvasSketch(sketch, settings);
