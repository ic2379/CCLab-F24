
// array storing lines
var lines = []

var backgroundTransparency = 0;

let bg;

function preload() {
  bg = loadImage('assets/paintWindow1.png');
}

function setup() {

  let canvas = createCanvas(828, 507);
  canvas.parent("p5-canvas-container");

  background(220, backgroundTransparency);

  canvas.mousePressed(()=>false);
  canvas.doubleClicked(()=>false);
}

function draw() {
  // background(220);

  if(backgroundTransparency != 0) {

    if (mouseIsPressed) {
      var line = new DrawnLine()
      lines.push(line); 
    }
  
    for (line of lines) {
      line.display();
    }

  }

}

class DrawnLine {

  constructor() {
    this.prevX = pmouseX; // previous mouseX position
    this.prevY = pmouseY; 
    this.x = mouseX; 
    this.y = mouseY; 
  }

  display() {
    
    // fill(0);
    // circle(mouseX,mouseY,1)
    push(); 

    // translate(windowWidth/2, windowHeight/2);
    stroke(0); 
    line(this.prevX, this.prevY, this.x, this.y); 

    pop();
  }

  update() {

  }

}


function canvasOpen() {

  // console.log(1);
  background(bg, backgroundTransparency);
  backgroundTransparency = 255;

}