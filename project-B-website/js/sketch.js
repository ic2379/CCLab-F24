
// array storing lines
var lines = []

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");
  // background(220);
}

function draw() {
  background(220);

  if (mouseIsPressed) {
    var line = new DrawnLine()
    lines.push(line); 
  }

  for (line of lines) {
    line.display();
  }

}

class DrawnLine {

  constructor() {
    this.prevX = pwinMouseX; 
    this.prevY = pwinMouseY; 
    this.x = winMouseX; 
    this.y = winMouseY; 
  }

  display() {
    stroke(255); 
    line(this.prevX, this.prevY, this.x, this.y); 
  }
}