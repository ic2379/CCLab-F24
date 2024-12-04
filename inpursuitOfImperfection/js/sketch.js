
// array storing lines
var lines = []

var backgroundTransparency = 0;

let bg;
let errorSound;
let errorWindow; 

function preload() {
  bg = loadImage('assets/paintWindow1.png');
  errorSound = loadSound("assets/errorSound.mp3");
  errorWindow = loadImage('assets/errorWindow.png')
}

function setup() {

  let canvas = createCanvas(828, 507);
  canvas.parent("p5-canvas-container");

  background(220, backgroundTransparency);

  canvas.mousePressed(()=>false);
  // canvas.mousePressed(handleMouseClick);
  canvas.doubleClicked(()=>false);
}

function draw() {
  // background(bg);

  if(backgroundTransparency != 0 && 
    pmouseX > 79 && pmouseX < 800 &&
    pmouseY > 70 && pmouseY < 391 &&
    mouseX > 79 && mouseX < 800 &&
    mouseY > 70 && mouseY < 391) {

    if (mouseIsPressed) {
      var line = new DrawnLine()
      lines.push(line); 
    }
  
    for (line of lines) {
      line.display();
    }

    // if (pmouseX > 800 && pmouseX < 822 &&
    //   pmouseY > 9 && pmouseY < 29 &&
    //   mouseX > 800 && mouseX < 822 &&
    //   mouseY > 9 && mouseY < 29 && mouseIsPressed) {

    //     backgroundTransparency = 0;

    // }

    if (pmouseX > 800 && pmouseX < 822 &&
      pmouseY > 9 && pmouseY < 29 &&
      mouseX > 800 && mouseX < 822 &&
      mouseY > 9 && mouseY < 29 && mouseIsPressed) {
  
        canvasClose();
  
    }

  }

  // let s = "("+mouseX+", "+mouseY+")"
  // text(s, 100, 100);

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

class paintCanvas {
  
  constructor() {

  }

  display() {

  }

  update() {

  }

}


function canvasOpen() {

  // console.log(1);
  background(bg, backgroundTransparency);
  backgroundTransparency = 255;

}

// function handleMouseClick() {

//   if (pmouseX > 800 && pmouseX < 822 &&
//     pmouseY > 9 && pmouseY < 29 &&
//     mouseX > 800 && mouseX < 822 &&
//     mouseY > 9 && mouseY < 29 && mouseIsPressed) {

//       canvasClose();

//   }
// }

function canvasClose() {

  backgroundTransparency = 0;

}

function accessDenied() {

  errorSound.play();

  push();
  imageMode(CENTER);
  image(errorWindow, random(height), random(width));
  pop();

}