
let taxiInstance; // cookie dough

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  
  taxiInstance = new Taxi(); // make an instance (cookie)
}

function draw() {
  background(220);

  taxiInstance.display(); // call the object's method
}

// a class is a collection of different functions
// list all its functions and methods

// one method (1) must exist in every class and 
// (2) contains all the class's properties
class Taxi{

  // don't need to write "function" in front of functions inside a class
  constructor(){
    this.x = 100;
    this.y = 100;
    this.scaleFactor = 1;

  }

  display(){
    push();
    translate(this.x, this.y);

    noStroke();
    fill(240, 220, 60);

    // base:
    rect(-50, -50, 100, 30);
    // top"
    rect(-25, -70, 50, 20);
    // wheel 1:
    this.drawWheel(-30, -15);
    // wheel 2:
    this.drawWheel( 30, -15);


    // just to see origin 
    // of translation matrix:
    fill("red");
    circle(0, 0, 5); 
  }

  drawWheel(x, y){
    push();
    translate(x, y);
    
      noStroke();
      fill(0);
      // circle(0,0,30);
      ellipse(0,0,28, 32);
    
    pop();
  }
}