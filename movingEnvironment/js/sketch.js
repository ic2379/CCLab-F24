

let obstacles = [];

let myFly;

let gameOver = false;

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < 3; i++) {
    obstacles.push(new Obstacle());
  }

  myFly = new Fly();

}

function draw() {

  background(220);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].display();
    obstacles[i].update();
  }

  myFly.display();
  myFly.update();

  // check collision
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].checkCollision(myFly.x, myFly.y);
  }

  if(gameOver){
    text("Game OVER", 100, 200);
  }

}

class Obstacle {
  constructor() {

    // begin out of frame to the right
    this.x = random(width, 2*width);
    // random y location 
    this.y = random(0, height);
    // needs negative speed to move it to left
    this.obSpeed = -2;

    // optional: random sizes and speeds
    this.size = 40;
  }

  display() {

    push();
    translate(this.x, this.y);

    noStroke();
    fill(0);
    rect(0, 0, this.size, this.size);

    pop();
  }

  checkCollision(otherX, otherY){
    // check collision with other object
    if(otherX > this.x && otherX < this.x + this.size &&
      otherY > this.y && otherY < this.y + this.size){
        console.log("COLLISION!!!!!!!!!!!");
        gameOver = true;
      }
  }

  update() {

    // move left
    this.x += this.obSpeed;

    // detect when out of frame
    if (this.x < -this.size) {
      // reset x to right side out of frame and random y
      this.x = width;
      this.y = random(0, height);

    }

  }
}

class Fly {
  constructor(){

    // constant x
    this.x = width/3;
    // y start in middle
    this.y = height/2; 
    // speed y
    this.speedY = 0;
    // radius (size)
    this.r = 3;
  }

  display(){

    push();
    translate(this.x, this.y);

    circle(0, 0, this.r*2);

    pop();

  }

  update(){

    // gravity should affect speedY
    this.speedY += 0.1;

    // user keypress also affect speedY 
    if(keyIsPressed == true && key == "w"){

      this.speedY -= 0.3;

    }

    // speedY should be applied to y location 
    this.y += this.speedY;

    // make sure fly doesn't fall out of frame
    if(this.y > height-this.r){
      this.y = height-this.r;
    }

  }
}