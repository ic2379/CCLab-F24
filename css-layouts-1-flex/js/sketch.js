

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  background(220);
}

function draw() {
  //
}

let apple;
let appleIMG;

function preload(){
  appleIMG = loadImage("assets/apple.png")
}
function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  apple = new Apple(appleIMG);
  background(220); // move background here to draw cursor on canvas like a brush
}

function draw() {
  // background(220);
  //
  noCursor();
  apple.update();
  apple.display();
}


class Apple{
  constructor(img){
    this.x = 0//width/2;
    this.y = 0//height/2;
    this.img = img;
    this.size = 40;
  }
  update(){

    this.x = mouseX;
    this.y = mouseY; 
    
  }
  display(){
    push();
    translate(this.x, this.y);
    // rect(0, 0, this.size, this.size); 

    push();
    translate(0,0); 
    scale(0.02); 
    image(this.img, 0, 0);
    pop();

    pop();
  }
}