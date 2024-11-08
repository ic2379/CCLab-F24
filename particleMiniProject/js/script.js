// CCLab Mini Project - 9.R Particle World Template


// a display() method to visually represent the particle.
// a minimum of two additional methods (functions) for behavior of your particle (i.e. update() and checkBounds())
// Ensure that these methods align with your concept and the principles of your imaginary world.

// grassy field at night; when user interacts with grass, causes fireflies to all fly up
// fireflies have a trail

let NUM_OF_PARTICLES = 250; // Decide the initial number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");
  
  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    let x = random(width);
    let y = random(height);
    particles.push(new Particle(x, y, 4));
  }

  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100, 100);

}

function draw() {
  background(0);

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
    
  }
}

class Particle {
  // constructor function
  constructor(startX, startY, numLayers = 4) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    // this.dia = 30;

    // this.centerX = 0;
    // this.centerY = 0;

    // adjusts the size of each particle
    this.centerW = 3;
    this.centerH = 3;

    this.brightness = 100; // starts out at brightest and will go darker in update()
    this.saturation = 100; // starts out saturated and will become less saturated in update()
  
    this.transparency = 100;

    this.numLayers = numLayers;

    this.fadeDelay = 0; // Counter to track when to start fading each layer
    
    this.layerTransparency = Array(this.numLayers + 1).fill(100); // Array to hold transparency for each layer
    this.layerSaturation = Array(this.numLayers + 1).fill(100); // Array to hold saturation for each layer
    this.layerHue = Array(this.numLayers + 1).fill(100); // Array to hold saturation for each layer
    
    this.fadeStartTimes = Array.from({ length: this.numLayers + 1 }, (_, i) => i * 20); // Delay for each layer's fade
  
  }
  // methods (functions): particle's behaviors
  update() {
    
    this.fadeDelay++;

    for (let i = 0; i < this.layerTransparency.length; i++) {
    
      if(this.fadeDelay > this.fadeStartTimes[i]) {
        // this.saturation -= 5;
        // this.transparency -=2;

        this.layerTransparency[i] -=2; 
        this.layerTransparency[i] = max(0, this.layerTransparency[i]); 

        this.layerSaturation[i] -= 5;
        this.layerSaturation[i] = max(0, this.layerSaturation[i]);

        this.layerHue[i] -= 5;
        this.layerHue[i] = max(0, this.layerHue[i]);
      }
    }
  }

  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    noStroke();
    // fill(54, this.saturation, this.brightness);
    
    // center
    // rect(this.centerX, this.centerY, this.centerW, this.centerH);

    let numLayers = 3;
    for (let i = 0; i<= numLayers; i++) {

      let offsetX = i * this.centerW;
      let offsetY = i * this.centerH;

      fill(random(360), this.layerSaturation[i], this.brightness, this.layerTransparency[i]);

      rect(offsetX, 0, this.centerW/2, this.centerH);
      rect(-offsetX, 0, this.centerW/2, this.centerH); 
      rect(0, offsetY, this.centerW, this.centerH/2); 
      rect(0, -offsetY, this.centerW, this.centerH/2);

    }

    pop();
  }
}
