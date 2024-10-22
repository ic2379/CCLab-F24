console.log("THIS THING WORKs!!!")

let x = 200;
let y = 200;

let targetX = 100;
let targetY = 100;
let targetXSpeed = 3;
let targetYSpeed = 1.5;

let isDragging = false;
let dragInfluenceX = 0;  // Influence from the drag
let dragInfluenceY = 0;

function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container")
}

function draw() {
  let rows = 14;
  let cols = 16;
  let squareSize = width / cols; // auto calculate the size of each square

  for (let y = 0; y<rows; y++) {
    for (let x = 0; x<cols; x++) {
           
      push();
      noStroke();
      
        if ((x + y) % 2 == 0) { // if row number + colmn number is even number, the square should be purple
          fill(190, 66, 237); // purple
        } else {
          fill(160, 158, 255);   // blue
        }

        // positions of the squares
        rect(x*squareSize, y*squareSize, squareSize, squareSize);
      
      pop();
    }
  }
  
  push();
    stroke(176, 59, 0);
    strokeWeight(5);
    strokeCap(PROJECT); // thick, square shaped line

    // pattern of the plus sign colors (diagonal rows)
    let pattern = [
      'dark', 'light', 'dark', 'dark', 
      'light', 'dark', 'light', 'light', 
      'dark', 'light', 'dark', 'dark', 
      'light', 'dark', 'light', 'light', 
      'dark', 'light', 'dark', 'dark', 
      'light', 'dark', 'light', 'light', 
      'dark', 'light', 'dark', 'dark'
    ];

    // Draw plus signs at the intersections
    for (let y = 1; y < rows; y++) { // skip the first and last rows
      for (let x = 1; x < cols; x++) { // skip the first and last columns
        let cx = x * squareSize; // X-coordinate of the intersection
        let cy = y * squareSize; // Y-coordinate of the intersection

        // Calculate the diagonal index in the array (x + y - 2 to account for skipping outermost)
        let diagonalIdx = x + y - 2;

        // go through array elements to follow color pattern
        if (pattern[diagonalIdx] == 'dark') {
          stroke(28, 62, 199);  // dark blue
        } else { // 'light'
          stroke(255); // white
        }

        // plus sign vertical lines
        line(cx, cy - squareSize / 6, cx, cy + squareSize / 6);

        // plus sign horizontal lines
        line(cx - squareSize / 6, cy, cx + squareSize / 6, cy);
      }
    }
  pop();
  
  
  
  // -------------------------moving circles section------------------------  
  
  targetX += targetXSpeed;
  targetY += targetYSpeed;
  
  // red circle target reflects off edges of canvas
  if (targetX > width || targetX < 0) {
    targetXSpeed *= -1;
  }
  if (targetY > height || targetY < 0) {
    targetYSpeed *= -1;
  }

  // red target circle
  fill("red");
  // circle(targetX, targetY, 10);
  
  // line(x, y, mouseX, mouseY);
  
  if (isDragging) {
    stroke(0);
    line(mouseX, mouseY, x, y);  //leash
  }
   
  // white circle (creature)
  fill("white");
  circle(x, y, 20);
  
  // Calculate influence from both the red circle and the user's drag
  let followInfluenceX = lerp(x, targetX, 0.03);  // Influence from following red circle
  let followInfluenceY = lerp(y, targetY, 0.03);

  // Combine influence of dragging (if active) with the influence of the red circle
  x = lerp(x, followInfluenceX + dragInfluenceX, 0.5);
  y = lerp(y, followInfluenceY + dragInfluenceY, 0.5);
}

// When the user presses the mouse, we check if they're dragging the white circle
function mousePressed() {
    isDragging = true;
  
}

// While dragging, update the drag influence on the white circle
function mouseDragged() {
  if (isDragging) {
    // Influence the white circle's position based on the drag
    dragInfluenceX = (mouseX - x) * 0.03;  // Apply a smaller influence
    dragInfluenceY = (mouseY - y) * 0.03;
  }
}

// When the user releases the mouse, stop dragging and reset the influence
function mouseReleased() {
  isDragging = false;
  dragInfluenceX = 0;  // Reset the drag influence
  dragInfluenceY = 0;

  
}
