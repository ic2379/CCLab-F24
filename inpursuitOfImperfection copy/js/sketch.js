var lines = [];
var lineSegments = [];
var backgroundTransparency = 0;

let bg;
let errorSound;
let errorWindow;

let cleanupTimer = 45 * 60; // 45 secs
let cleanupStarted = false;

function preload() {
  bg = loadImage('assets/paintWindow1.png');
  errorSound = loadSound("assets/errorSound.mp3");
  errorWindow = loadImage('assets/blankErrorWindow.png');
}

function setup() {
  let canvas = createCanvas(828, 507);
  canvas.parent("p5-canvas-container");
  canvas.mousePressed(() => false);
  canvas.doubleClicked(() => false);
}

function draw() {
  if (frameCount > cleanupTimer && !cleanupStarted) {
    adjustStage();
    cleanupStarted = true;
  }

  if (backgroundTransparency != 0 &&
    pmouseX > 79 && pmouseX < 800 &&
    pmouseY > 70 && pmouseY < 391 &&
    mouseX > 79 && mouseX < 800 &&
    mouseY > 70 && mouseY < 391) {

    if (mouseIsPressed) {
      var line = new DrawnLine();
      lines.push(line);
      detectSignificantDirectionChange();
    }

    for (let line of lines) {
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

    // Calculate the angle of the current line
    this.angle = atan2(this.y - this.prevY, this.x - this.prevX);
  }

  display() {
    push();
    stroke(0);
    line(this.prevX, this.prevY, this.x, this.y);
    pop();
  }
}

function detectSignificantDirectionChange() {
  if (lines.length > 1) {
    let lastLine = lines[lines.length - 1];
    let prevLine = lines[lines.length - 2];

    // Calculate the angle difference between the last two lines
    let angleDifference = abs(lastLine.angle - prevLine.angle);

    // Normalize the angle difference to be between 0 and PI
    angleDifference = angleDifference > PI ? TWO_PI - angleDifference : angleDifference;

    // Threshold for a significant direction change (adjust as needed)
    let threshold = radians(45); // 45 degrees

    if (angleDifference > threshold) {
      lineSegments.push(lastLine);
    }
  }
}

function adjustStage() {

  // 

  // Erase the user's drawing
  background(bg);

  lines = [];

  // Take line segments and adjust them randomly
  let adjustedSegments = [];
  for (let i = 0; i < lineSegments.length; i++) {
    let segment = lineSegments[i];
    let newX = segment.x + random(-20, 20);
    let newY = segment.y + random(-20, 20);
    let newPrevX = segment.prevX + random(-20, 20);
    let newPrevY = segment.prevY + random(-20, 20);

    // Combine lines occasionally
    if (i > 0 && random() > 0.5) {
      newPrevX = adjustedSegments[i - 1].x; // Connect to the previous segment
      newPrevY = adjustedSegments[i - 1].y;
    }

    adjustedSegments.push({
      prevX: newPrevX,
      prevY: newPrevY,
      x: newX,
      y: newY,
    });
  }

  // Redraw the adjusted segments
  for (let segment of adjustedSegments) {
    push();
    stroke(0);
    line(segment.prevX, segment.prevY, segment.x, segment.y);
    pop();
  }
}

function canvasOpen() {
  background(bg, backgroundTransparency);
  backgroundTransparency = 255;

  if (mouseX > 800 && mouseX < 822 &&
    mouseY > 8.9 && mouseY < 30 && backgroundTransparency != 0) {
    adjustStage();
  }
}

let errorWindows = []; // Track all error windows

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
    text("OK", this.windowX - 35, this.windowY + 33);
    pop();

    // Store button data for click detection
    errorWindows.push({
      x: this.windowX - 35 - 10, // Padding around the "OK" button
      y: this.windowY + 33 - 10,
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

let date = new Date();
let minutes = date.getMinutes();
let hour = date.getHours();
document.querySelector(".clock").innerHTML = hour + ":" + minutes;
