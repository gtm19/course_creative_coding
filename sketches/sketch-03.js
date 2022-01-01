import canvasSketch from "canvas-sketch";
import { random, math } from "canvas-sketch-util";

const settings = {
  // animate: true,
  dimensions: [ 1080, 1080 ]
};

const sketch = ({ context, width, height }) => {
  
  const agents = [];
  
  for (let i = 0; i < 48; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    agents.push(new Agent(x, y))
  }

  const init = (height, width) => {
    // clear and refill base canvas
    context.clearRect(0, 0, width, height);
    context.fillStyle = '#2E4C6D';
    context.fillRect(0, 0, width, height);
  };

  const addLines = (agents, maxDist) => {
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > maxDist) continue;

        context.strokeStyle = agent.fillColour;
        context.strokeOpacity = 0.5;
        context.lineWidth = math.mapRange(dist, 0, maxDist, 12, 0);
        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
      
    }
  };

  const animate = () => {
    // reset
    init(height, width);

    addLines(agents, 200);

    // move, bounce, and draw each Agent
    agents.forEach(agent => {
      agent.move();
      agent.bounce(height, width);
      agent.draw(context);
    });

    window.requestAnimationFrame(animate);
  };
  
  return () => {
    animate();
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-3, 3), random.range(-3, 3));
    this.radius = random.range(4, 12);
    this.fillColour = "#FC997C";
    this.strokeColour = "#F47340";
  }

  move() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(height, width) {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  draw(context) {

    context.save();
    context.translate(this.pos.x, this.pos.y);

    // line / colour
    context.lineWidth = 4;
    context.fillStyle = this.fillColour;
    context.strokeStyle = this.strokeColour;

    // shadows
    context.shadowColor = 'rgba(0, 0, 0, .2)';
    context.shadowBlur = 8;
    context.shadowOffsetX = 4;
    context.shadowOffsetY = 4;

    // drawing
    context.beginPath();
    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    context.restore();
  }
}
