let x = 200;
let y = 200;

let targetX = 100;
let targetY = 100;
let targetXSpeed = 3;
let targetYSpeed = 1.5;

let isDragging = false;
let dragInfluenceX = 0;  // influence from the drag
let dragInfluenceY = 0;

let triggerExit2D = false;

let pullCounter = 0; // Counter for rapid pulls
let speedThreshold = 130;

// let counter = 15;

function setup() {
  // createCanvas(800, 500);
  
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container")
}

function draw() {

  background(255);
  
  let scaleFactor = 0.6 // factor by which the background will scale down
  
  let cols = 16;
  let rows = Math.floor(height / (width/cols));
  let squareSize = width / cols; // auto calculate the size of each square

  if (triggerExit2D) {
    // center the background
    translate((width - (width * scaleFactor)) / 2, (height - (height * scaleFactor)) / 2);
    scale(scaleFactor); // Scale down the background
  }
  
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
    
    push();
      translate(x,y);
      strokeWeight(5);
      stroke(235, 52, 177);
      line(mouseX-120, mouseY-30, x+120, y+30);  // leash
    pop();
    
    // count each time drag speed goes above speed threshold
    let dragSpeed = dist(pmouseX, pmouseY, mouseX, mouseY);
    if (dragSpeed > speedThreshold) {
      pullCounter++; 
    }
    
    // condition for changing the background ("exiting 2D")
    if (pullCounter >= 15) {
      triggerExit2D = true;
    }
    
    console.log("pull counter" + pullCounter);
    
  }
   
  // replaced the white circle with the bear
  drawBear(x, y);
  
  // Calculate influence from both the red circle and the user's drag
  let followInfluenceX = lerp(x, targetX, 0.03);  // Influence from following red circle
  let followInfluenceY = lerp(y, targetY, 0.03);

  // Combine influence of dragging (if active) with the influence of the red circle
  x = lerp(x, followInfluenceX + dragInfluenceX, 0.5);
  y = lerp(y, followInfluenceY + dragInfluenceY, 0.5);
  
  
  // putting toggleBackground(); here gives cool double/transparent effect (doesn't show up well on screen recording)
  // if (counter == 15) {
  // toggleBackground();
  
  
// }
  
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

// ----------------------pixel bear drawing part ----------------------
function drawBear(x, y) {
  
  translate(x, y);  // Move the entire shape to (x, y)
  push();

    noStroke();
    fill(175, 255, 156);
  
    // basic shapes
    circle(x+125, y+10, 50); // head
    ellipse(x+80, y+44, 105, 60); // body
    ellipse(x+40, y+70, 30, 50); // back leg
    rect(x+110, y+47.5, 30, 40); // front leg
    circle(x+25, y+36, 19); // tail
    circle(x+147, y+20, 27); // cheek
    circle(x+105, y-15, 20); // left ear
    circle(x+150, y-15, 20); // right ear
  
    // filling in small parts
    rect(x+113, y-18, 30, 10); // top of head
    rect(x+142, y-8, 12, 20); // front of face
    rect(x+151, y+7, 7, 5);
    rect(x+124, y+30, 13.5, 20);
    rect(x+118, y+85, 15, 10);
    rect(x+107, y+68, 5, 5);
    rect(x+137, y+28, 5, 5);
    rect(x+53, y+68, 5, 5);
    rect(x+47.5, y+85, 5, 5);
    rect(x+25, y+82.5, 5, 5);
    rect(x+22.5, y+44, 10, 30); // back of back leg
    rect(x+17, y+27, 16, 5); // top of tail
    rect(x+92, y+12, 9, 5);
    rect(x+97.5, y-8, 7, 20);
  pop();
  
  
  // outline: red
  push();
    stroke(227, 61, 0);
    strokeCap(PROJECT);
    strokeWeight(5);
  
    line(x+140, y+35, x+150, y+35);
    line(x+155, y+30, x+155, y+30);
    line(x+160, y+25, x+160, y+10);
    line(x+155, y+5, x+155, y-5);
    line(x+160, y-10, x+160, y-20);
    line(x+155, y-25, x+145, y-25); // top of right ear
    line(x+140, y-20, x+115, y-20); // top of head
    line(x+110, y-25, x+100, y-25); // top of left ear
    line(x+95, y-20, x+95, y-10);
    line(x+100, y-5, x+100, y-5);
    line(x+95, y, x+95, y+10);
    line(x+90, y+15, x+60, y+15);
    line(x+55, y+20, x+45, y+20);
    line(x+40, y+25, x+40, y+25);
    line(x+35, y+30, x+35, y+30);
    line(x+30, y+25, x+20, y+25);
    line(x+15, y+30, x+15, y+40); 
    line(x+20, y+45, x+20, y+45); 
    line(x+25, y+50, x+25, y+50); 
    line(x+20, y+55, x+20, y+70);
    line(x+25, y+75, x+25, y+85);
    line(x+30, y+90, x+30, y+90);
    line(x+35, y+95, x+45, y+95);
    line(x+50, y+90, x+50, y+90);
    line(x+55, y+85, x+55, y+75);
    line(x+60, y+70, x+60, y+70);
    line(x+65, y+75, x+95, y+75);
    line(x+100, y+70, x+105, y+70);
    line(x+110, y+75, x+110, y+85);
    line(x+115, y+90, x+115, y+90);
    line(x+120, y+95, x+130, y+95);
    line(x+135, y+90, x+135, y+90);
    line(x+140, y+85, x+140, y+75);
    line(x+140, y+70, x+140, y+45); // longest line on front leg
    line(x+135, y+40, x+135, y+40);
  
    // face
    push();
      strokeWeight(4);
      line(x+110, y+4, x+117, y+4); // left eye
      line(x+137, y+4, x+144, y+4); // right eye
  
      line(x+118, y+18, x+118, y+18); // left mouth dot
      line(x+137, y+18, x+137, y+18); // right mouth dot
    pop();
  
    line(x+123, y+13, x+130, y+13); // nose
    line(x+127, y+18, x+127, y+18); // philtrum
    line(x+122, y+22, x+133, y+22); // mouth
    
  pop();
  
  // shadows
  push();
  
    stroke(132, 237, 107);
    strokeCap(PROJECT);
    strokeWeight(5); 
  
    // head shadow
    line(x+120, y-15, x+140, y-15);
    line(x+145, y-20, x+145, y-15);
  
    // neck shadow
    line(x+95, y+15, x+95, y+20);
    line(x+100, y+20, x+100, y+20);
    line(x+100, y+25, x+105, y+25);
    line(x+105, y+30, x+115, y+30);
    line(x+115, y+35, x+120, y+35);
  
    // belly
    line(x+60, y+65, x+65, y+65);
    line(x+65, y+70, x+95, y+70);
    
    // tail
    line(x+25, y+45, x+25, y+45);
    line(x+20, y+40, x+20, y+40);
  
    // feet
    
  pop();
  
  // highlights
  push();
    stroke(255);
    strokeCap(PROJECT);
    strokeWeight(5);
  
    // head
    line(x+115, y-15, x+115, y-15);
    line(x+110, y-20, x+110, y-20);
  
    // tail
    line(x+30, y+30, x+30, y+30);
  pop();
}