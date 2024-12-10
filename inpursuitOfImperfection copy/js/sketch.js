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

function accessDenied() {
  errorSound.play();
  push();
  imageMode(CENTER);
  errorWindow.resize(200, 0);
  image(errorWindow, random(height), random(width));
  pop();
}

function mouseClicked() {
  if (mouseX > 800 && mouseX < 822 &&
    mouseY > 8.9 && mouseY < 30 && backgroundTransparency != 0) {
    adjustStage();
  }
}

let date = new Date();
let minutes = date.getMinutes();
let hour = date.getHours();
document.querySelector(".clock").innerHTML = hour + ":" + minutes;
