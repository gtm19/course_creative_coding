import canvasSketch from "canvas-sketch";
import { random } from "canvas-sketch-util";

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#222831';
    context.fillRect(0, 0, width, height);

    const cx = 0;
    const cy = 0;
    const w = width * 0.03;
    const h = w * 25;
    let x, y;

    const num = 36;
    const radius = width * 0.75;

    for (let i = 0; i < num; i++) {
      const slice = Math.PI * 2 / num;
      const angle = i * slice * random.range(0.98, 1.02);

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      // notches
      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.5, 1.5), 1);
  
      context.beginPath();
      context.fillStyle = "#F05454";
      context.rect(-w * 0.5, -h * random.range(0.3, 0.6), w, h);
      context.fill();
  
      context.restore();

      // Arcs
      context.save();

      context.translate(cx, cy);
      context.rotate(-angle);
      context.lineWidth = random.range(15, 30);
      context.strokeStyle = "#DDDDDD";

      context.beginPath();
      context.arc(0, 0, radius * random.range(0.65, 1.35), -slice * random.range(1, -15), slice * random.range(7, 18));
      context.stroke();

      context.restore();
    }

  };
};

canvasSketch(sketch, settings);
