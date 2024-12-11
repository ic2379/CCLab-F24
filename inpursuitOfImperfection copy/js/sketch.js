
// array storing lines
var lines = []

// array storing sensed line segments
var lineSegments = [];

let cleanupTimer = 45 * 60; // 45 secs
let cleanupStarted = false;

var backgroundTransparency = 0;

let bg;
let errorSound;
let errorWindow; 

let selectedColor = [0, 0, 0];

function preload() {
  bg = loadImage('assets/paintWindow1.png');
  errorSound = loadSound("assets/errorSound.mp3");
  errorWindow = loadImage('assets/blankErrorWindow.png')
}

function setup() {

  let canvas = createCanvas(828, 507);
  canvas.parent("p5-canvas-container");

  // background(220, backgroundTransparency);

  canvas.mousePressed(()=>false);
  // canvas.mousePressed(handleMouseClick);
  canvas.doubleClicked(()=>false);
  createColorPalette();
}

function draw() {

  if (frameCount > cleanupTimer && !cleanupStarted) {
    adjustStage();
    cleanupStarted = true;
  }

  if(backgroundTransparency != 0 && 
    pmouseX > 79 && pmouseX < 800 &&
    pmouseY > 70 && pmouseY < 391 &&
    mouseX > 79 && mouseX < 800 &&
    mouseY > 70 && mouseY < 391) {

    if (mouseIsPressed) {
      var line = new DrawnLine()
      lines.push(line); 

      detectLineChange();
    }
  
    for (line of lines) {
      line.display();
    }


  }
    
  // let s = "("+mouseX+", "+mouseY+")"
  // text(s, 100, 100);

  // background(220);
  // text(frameCount, 100, 100);

}

function createColorPalette() {
  let colors = [
    [0, 0, 0],      // Black
    [255, 0, 0],    // Red
    [0, 255, 0],    // Green
    [0, 0, 255],    // Blue
    [255, 255, 0],  // Yellow
    [255, 165, 0]   // Orange
  ];

  let xPos = 20;
  for (let i = 0; i < colors.length; i++) {
    let colorButton = createButton('');
    colorButton.position(xPos, 420);
    colorButton.size(40, 40);
    colorButton.style('background-color', color(colors[i][0], colors[i][1], colors[i][2]));
    colorButton.mousePressed(() => selectColor(colors[i]));
    xPos += 45;
  }
}

function selectColor(color) {
  selectedColor = color;
}

class DrawnLine {

  constructor() {
    this.prevX = pmouseX; // previous mouseX position
    this.prevY = pmouseY; 
    this.x = mouseX; 
    this.y = mouseY; 

    // Calculate the angle of the Scurrent line
    this.angle = atan2(this.y - this.prevY, this.x - this.prevX);
  }

  display() {
    
    // fill(0);
    // circle(mouseX,mouseY,1)
    push(); 

    // translate(windowWidth/2, windowHeight/2);
    stroke(selectedColor); 
    line(this.prevX, this.prevY, this.x, this.y); 

    pop();
  }

  // update() {
  //   if (frameCount > 3600) {
  //     adjustStage();
  //   }
  // }

}

function detectLineChange() {
  if (lines.length > 1) {
    let lastLine = lines[lines.length - 1];
    let prevLine = lines[lines.length - 2];

    // calculate the angle difference between the last two lines
    let angleDifference = abs(lastLine.angle - prevLine.angle);

    // normalize the angle difference to be between 0 and PI
    angleDifference = angleDifference > PI ? TWO_PI - angleDifference : angleDifference;

    // threshold for a significant direction change (adjust as needed)
    let threshold = radians(45); // 45 degrees

    if (angleDifference > threshold) {
      lineSegments.push(lastLine);
    }
  }
}


function canvasOpen() {

  // console.log(frameCount);

  background(bg, backgroundTransparency);
  backgroundTransparency = 255;

  if (mouseX > 800 && mouseX < 822 &&
    mouseY > 8.9 && mouseY < 30 && backgroundTransparency != 0) {

    adjustStage();

  }
}

function adjustStage() {

  // popup that goes to next step: finish popup & adjusting the drawing

  // push();
  // imageMode(CENTER);
  // errorWindow.resize(200, 0);
  // image(errorWindow, 100, 100);
  // pop();

  // 

  // Erase the user's drawing
  background(bg);

  lines = [];

  // take line segments and adjust them randomly
  let adjustedSegments = [];
  for (let i = 0; i < lineSegments.length; i++) {
    let segment = lineSegments[i];
    let newX = segment.x + random(-20, 20);
    let newY = segment.y + random(-20, 20);
    let newPrevX = segment.prevX + random(-20, 20);
    let newPrevY = segment.prevY + random(-20, 20);

    // combine lines occasionally
    if (i > 0 && random() > 0.5) {
      newPrevX = adjustedSegments[i - 1].x; // connect to the previous segment
      newPrevY = adjustedSegments[i - 1].y;
    }

    adjustedSegments.push({
      prevX: newPrevX,
      prevY: newPrevY,
      x: newX,
      y: newY,
    });
  }

  // redraw the adjusted segments
  for (let segment of adjustedSegments) {
    push();
    stroke(0);
    line(segment.prevX, segment.prevY, segment.x, segment.y);
    pop();
  }

}

let errorWindows = [];

class AccessDenied {
  constructor() {
    this.windowX = random(width); // Random x-coordinate
    this.windowY = random(height); // Random y-coordinate
    this.width = 200; // Width of the error window
    this.height = 100; // Height of the error window

    this.transparency = 255;
    this.display(); // Display the error window immediately
  }

  display() {
    errorSound.play(); // Play error sound

    if (this.transparency === 0) return;
    
    // Draw the error window
    push();
    imageMode(CENTER);
    errorWindow.resize(this.width, 0);
    image(errorWindow, this.windowX, this.windowY);
    pop();

    // Add "Access Denied" text
    push();
    textAlign(CENTER, CENTER);
    textSize(16);
    fill(255);
    stroke(0);
    strokeWeight(1.5);
    text("Access Denied", this.windowX + 10, this.windowY - 10);
    pop();

    // Add "OK" button text
    push();
    fill(0);
    noStroke();
    textSize(15);
    text("OK", this.windowX - 45, this.windowY + 37);
    pop();

    // Store button data for click detection
    errorWindows.push({
      x: this.windowX - 45 - 15, // Padding around the "OK" button
      y: this.windowY + 37 - 15,
      width: 60, // Approximate width of the "OK" button
      height: 40,
    });
  }
}

function mouseClicked() {
    if (mouseX > 800 && mouseX < 822 &&
      mouseY > 8.9 && mouseY < 30 && backgroundTransparency != 0) {
        adjustStage();
  
    }

    for (let i = 0; i < errorWindows.length; i++) {
      let button = errorWindows[i];
      if (
        mouseX > button.x &&
        mouseX < button.x + button.width &&
        mouseY > button.y &&
        mouseY < button.y + button.height
      ) {
        console.log("OK button clicked on window", i); // Handle "OK" click
        errorWindows.splice(i, 1); // Remove the window from the array
        return; // Stop checking after the first match
      }
    }
}

class FinalMsg {
  constructor(message, duration) {
    this.message = message; // The creepy message
    this.duration = duration; // How long to display the message (in frames)
    this.active = false; // Whether the creepy text is currently being displayed
  }

  start() {
    this.active = true;
    this.remainingTime = this.duration;
  }

  stop() {
    this.active = false;
  }

  update() {
    if (this.active && this.remainingTime > 0) {
      this.remainingTime--;
      this.display();
    } else if (this.remainingTime <= 0) {
      this.stop();
    }
  }

  display() {
    push();
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255, 0, 0); // Red fill
    stroke(0); // Black outline
    strokeWeight(4);

    // Draw text multiple times at random positions for a creepy effect
    for (let i = 0; i < 3; i++) {
      let x = random(width / 2 - 50, width / 2 + 50);
      let y = random(height / 2 - 50, height / 2 + 50);
      text(this.message, x, y);
    }
    pop();
  }
}


let date = new Date()
let minutes = date.getMinutes();
let hour = date.getHours();
document.querySelector(".clock").innerHTML = hour+":"+minutes