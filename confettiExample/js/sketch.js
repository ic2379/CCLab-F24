let confettis = [];
let numConfetti = 10;

let bgHue;

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  
  // for(let i = 0; i < numConfetti; i++){
  //   confettis.push(new Confetti(width/2, height/2))
  // }

  colorMode(HSB); // use Hue/Sat/Brightness to define colors instead of RGB
  
  bgHue = random(255);

}

function draw() {
  background(bgHue, 10, 190);

  // for(let i = 0; i < numConfetti; i++){
        confettis.push(new Confetti(mouseX, mouseY))
  // }
    
  fill(0);
  text(confettis.length, 20, 20);

  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].display();
  }

  // if statement to delete the oldest confetti from the array
  // while(confettis.length > 100){
  //   confettis.splice(0, 1); 
    // splice(start idx, number of elements to delete)
  // }

  // delete the confetti that goes off canvas (onCanvas == false)
  for(let i = confettis.length - 1; i >= 0; i--){
    
    if(confettis[i].onCanvas == false){
      confettis.splice(i, 1);
    }
  }

}

class Confetti{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);
    
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);   // negative Y, which causes to go upwards

    this.hue = random(255);

    // boolean for if confetti is outside canvas
    this.onCanvas = true;

  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;

    // add to the speedY each frame which slows object's upward motion
    // and then brings it back down
    this.speedY += 0.1;

    // limit the horizontal movement of the object (bc falls in an arc)
    // keep bringing the speedX gradually closer to 0
    this.speedX *= 0.99;

    // confetti position on canvas?
    if(this.y > height) {
      this.onCanvas = false;
    }
  }

  display(){    
    push();
    translate(this.x, this.y);

      fill(this.hue, 255, 255);
      noStroke();
      circle(0, 0, this.size);
   
    pop();
  }

}

// function mousePressed() {

//   for(let i = 0; i < numConfetti; i++){
//     confettis.push(new Confetti(mouseX, mouseY))
//   }
// }