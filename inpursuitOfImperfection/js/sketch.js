
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

let finalMessage;

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

  if (!finalMessageStarted && millis() >= countTime) {
    finalMessage.start();
    finalMessageStarted = true; // Prevent starting the message again
  }

  // Continuously update the final message if it has started
  if (finalMessageStarted) {
    finalMessage.update();
  }
    
  // let s = "("+mouseX+", "+mouseY+")"
  // text(s, 100, 100);

  // background(220);
  // text(frameCount, 100, 100);

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
    
    // fill(0);
    // circle(mouseX,mouseY,1)
    push(); 

    // translate(windowWidth/2, windowHeight/2);
    stroke(2); 
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

let countTime; 
let finalMessageStarted = false;

function adjustStage() {

  countTime = millis() +5000;

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


  finalMessage = new FinalMsg("do you like it?", 300); // can adjust frames duration
  
  if (millis() >= countTime) {
    finalMessage.start();
  }

}

let errorWindows = [];

class AccessDenied {
  constructor() {
    this.windowX = random(width); 
    this.windowY = random(height); 
    this.width = 200; 
    this.height = 100; 

    this.transparency = 255;
    this.display(); 
  }

  display() {
    errorSound.play(); 

    if (this.transparency === 0) return;
    
    push();
    imageMode(CENTER);
    errorWindow.resize(this.width, 0);
    image(errorWindow, this.windowX, this.windowY);
    pop();

    push();
    textAlign(CENTER, CENTER);
    textSize(16);
    fill(255);
    stroke(0);
    strokeWeight(1.5);
    text("Access Denied", this.windowX + 10, this.windowY - 10);
    pop();

    // "OK" text
    push();
    fill(0);
    noStroke();
    textSize(15);
    text("OK", this.windowX - 45, this.windowY + 37);
    pop();

    // button location for detect click 
    errorWindows.push({
      x: this.windowX - 45 - 15, 
      y: this.windowY + 37 - 15,
      width: 60, 
      height: 40,
    });
  }
}

function mouseClicked() {
    if (mouseX > 800 && mouseX < 822 &&
      mouseY > 8.9 && mouseY < 30 && backgroundTransparency != 0) {
        adjustStage();
  
    }

    // for (let i = 0; i < errorWindows.length; i++) {
    //   let button = errorWindows[i];
    //   if (
    //     mouseX > button.x &&
    //     mouseX < button.x + button.width &&
    //     mouseY > button.y &&
    //     mouseY < button.y + button.height
    //   ) {
    //     console.log("OK button clicked on window", i); 
    //     errorWindows.splice(i, 1); 
    //     return; 
    //   }
    // }
}

class FinalMsg {
  constructor(message, duration) {
    this.message = message;
    this.duration = duration;
    this.active = false;
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
    fill(255, 0, 0); 
    stroke(0);
    strokeWeight(4);

    // draw text multiple times at random positions
    for (let i = 0; i < 3; i++) {
      let x = random(width);
      let y = random(height);
      text(this.message, x, y);
    }
    pop();
  }
}



let date = new Date()
let minutes = date.getMinutes();
let hour = date.getHours();
document.querySelector(".clock").innerHTML = hour+":"+minutes