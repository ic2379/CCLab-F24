

// for sounds, you need an initial interaction
// from the user with the website
// the sound will not play by itself from the beginning
// usually do this with function mousePressed()


let bugSound; // global var to represent the sound file 
let bug1;

let plant1; 

// have a separate preload function
// to save time when loading assets (images, sound files)
function preload() {

  // writing relative file path since sound file is not in /js folder
  bugSound = loadSound("assets/sounds/8000__cfork__cf_fx_bloibb.mp3")
}


function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  
  bug1 = new Bug();

  plant1 = new Plant(200, 200);
}

function draw() {
  background(220);

  bug1.display();
  bug1.update();

  plant1.display();
  plant1.update();
}

class Bug {
  constructor() {

    this.x = width/2;
    this.y = height/2; 

    this.sound = bugSound; 

    this.speedX = random(-1, 10); 
    this.speedY = random(-1, 10); 

    this.moving = false;

  }

  display() {

    push();
    translate(this.x, this.y);
    fill(0);
    circle(0, 0, 2);

    pop();

  }

  update() {

    if(this.moving) {

      this.x += this.speedX;
      this.y += this.speedY; 

    }

    if(this.x < 0 || this.x > width) {
      this.speedX = -this.speedX;
      this.shout();
    } 
    if(this.y < 0 || this.y > height) {
      this.speedY = -this.speedY;
      this.shout();
    }

  }

  shout() {
    this.sound.play();
  }

}

class Plant {
  constructor(startX, startY) {

    this.x = startX;
    this.y = startY;

    this.plantHeight = 0;

    this.watered = false;

  }

  display() {

    push();
    translate(this.x, this.y); 

    // plant 
    stroke("green")
    strokeWeight(10); 
    line(0, -40, 0, -40-this.plantHeight);

    // pot
    fill("brown");
    noStroke();
    rect(-20, -40, 40, 40);

    pop(); 

  }

  update() {

    if (this.watered == true) {
      if(this.plantHeight < 60) {
        this.plantHeight++;
      }
    }

  }

  checkClick() {

    if(mouseX > this.x-20 && mouseX < this.x+20 &&
       mouseY > this.y-40 && mouseY < this.y) {

        // console.log("i got clicked!!")

        this.watered = true;
        
       }

  }
}

function mousePressed() {
  bug1.moving = true;
  plant1.checkClick();
}