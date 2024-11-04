/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new IsaDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class IsaDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    //..
    //..
    //..
    this.angle1 = 0;
    this.angle2 = 0.5;
    this.wiggleSpeed = 0.1;
    this.size = 100; // size of the main body parts
    // this.earOffset = 25;
    this.moveX = random(-1, 1); // adding randomness in x 
    this.moveY = random(-1, 1); // randomness in y
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    // Add wiggle motion using angle and trigonometric functions
    this.angle1 += this.wiggleSpeed;
    this.angle2 += this.wiggleSpeed * 1.2; // slightly faster wiggle

    // aadds a slight "float" within bounds
    this.x += this.moveX * cos(this.angle1) * 0.5;
    this.y += this.moveY * sin(this.angle1) * 0.5;

    // keep within the 200x200 square
    if (this.x < width / 2 - 100 || this.x > width / 2 + 100) this.moveX *= -1;
    if (this.y < height / 2 - 100 || this.y > height / 2 + 100) this.moveY *= -1;
  
    // something to wiggle the ears by changing angles
  
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    let frontX = cos(this.angle1) * 10;
    let frontY = sin(this.angle1) * 5;

    // back body part
    fill(255, 220, 220);
    noStroke();
    ellipse(cos(this.angle2) * 15, sin(this.angle2) * 5, this.size, this.size * 0.6);

    // front body part
    fill(255, 230, 230);
    ellipse(cos(this.angle1) * 10, sin(this.angle1) * 5, this.size * 0.8, this.size * 0.5);

    // ears
    fill(255, 200, 200);
    // ellipse(-25, -this.size / 4, 15, 30);  // left ear
    // ellipse(25, -this.size / 4, 15, 30);   // right ear
    push();
    translate(frontX - 15, frontY - this.size / 3); // left ear position
    rotate(sin(this.angle1) * 0.5); // tilt using angle1
    ellipse(0, 0, 10, 25);
    pop();

    push();
    translate(frontX + 15, frontY - this.size / 3); // right ear position
    rotate(sin(this.angle1) * 0.5); // tilt using angle1
    ellipse(0, 0, 10, 25);
    pop();

    // legs
    ellipse();
    ellipse();

    fill(150, 100, 100);
    // ellipse(-10, 10, 5, 5);
    // ellipse(10, -5, 5, 5);
    // ellipse(5, 15, 3, 3);

    // face
    // ellipse(-15, -7, 7, 5); // eyebrows
    // ellipse(20, -7, 7, 5);
    ellipse(-10, 3, 5, 5); // eyes
    ellipse(15, 3, 5, 5);
    rect(0, 5, 5, 2);

    // push();
    // strokeCap(PROJECT);
    // strokeWeight(5);
    // // line(-15, 3, -10, 3);
    // // line(10, 3, );
    // pop();


    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/