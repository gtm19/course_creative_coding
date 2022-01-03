import canvasSketch from "canvas-sketch";
import { random, math } from "canvas-sketch-util";
import { Pane } from "tweakpane";

const settings = {
  animate: true,
  dimensions: [ 1080, 1080 ]
};

const params = {
  // grid
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 20,
  // noise
  freq: 0.001,
  amp: 0.2,
  // animatiom
  frame: 0,
  animate: true,
  // style
  lineCap: "butt",
  background: "#FFFFFF",
  lineColour: "#000000"
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = params.background;
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
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

      const f = params.animate ? frame : params.frame

      const n = random.noise3D(x, y, f * 10, params.freq);
      const angle = params.amp * n * Math.PI * 2

      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

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
      context.lineCap = params.lineCap;
      context.strokeStyle = params.lineColour;
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

const createPane = () => {
  const pane = new Pane();
  
  const folderGrid = pane.addFolder(
    { title: "Grid" }
  );  
  folderGrid.addInput(params, "cols", { min: 2, max: 50, step: 1  });
  folderGrid.addInput(params, "rows", { min: 2, max: 50, step: 1  });
  
  folderGrid.addInput(params, "scaleMin", { min: 1, max: 100 });
  folderGrid.addInput(params, "scaleMax", { min: 1, max: 100 });

  const folderNoise = pane.addFolder(
    { title: "Noise", expanded: false  }
  );
  folderNoise.addInput(params, "freq", { min: -0.01, max: 0.01 });
  folderNoise.addInput(params, "amp", { min: 0, max: 1 });

  const folderAnimation = pane.addFolder(
    { title: "Animation", expanded: false  }
  );
  folderAnimation.addInput(params, "animate");
  folderAnimation.addInput(params, "frame", { min:0, max: 999, step: 1 });

  const folderStyle = pane.addFolder(
    { title: "Style", expanded: false }
  )
  folderStyle.addInput(params, "lineCap", {
    options: {
      butt: "butt",
      round: "round",
      square: "square"
    }
  });
  folderStyle.addInput(params, "background", { picker: 'inline', expanded: true });
  folderStyle.addInput(params, "lineColour", { picker: 'inline', expanded: true });
};

createPane();

canvasSketch(sketch, settings);
