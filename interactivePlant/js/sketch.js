
let bugSound; // global var to represent the sound file 

function preload() {

  // writing relative file path since sound file is not in /js folder
  bugSound = loadSound("assets/sounds/8000__cfork__cf_fx_bloibb.mp3")
}


function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  background(220);
}

function draw() {
  //
}

function mousePressed() {
  bugSound.play();
}