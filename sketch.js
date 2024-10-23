let buttons = [];
let cloudPositions = [];  // Array to store cloud positions
let activeButton = null;  // Track which button is currently active

function setup() {
  createCanvas(400, 600);
  textAlign(CENTER, CENTER);
  
  // Initialize cloud positions
  cloudPositions = [
    { x: 100, y: 50, size: 80, speed: 0.5 },
    { x: 250, y: 80, size: 100, speed: 0.7 },
    { x: 50, y: 150, size: 70, speed: 0.3 },
    { x: 300, y: 100, size: 90, speed: 0.6 }
  ];
  
  let buttonTexts = ['Letter Tracing', 'Alphabet Test', 'Shape Practice', 'Audible Test'];
  for (let i = 0; i < buttonTexts.length; i++) {
    buttons.push(new Button(width/2, 300 + i*70, 200, 50, buttonTexts[i]));
  }
}

function draw() {
  background(135, 206, 235);  // Sky blue background
  
  // Draw and update clouds
  for (let cloud of cloudPositions) {
    drawCloud(cloud.x, cloud.y, cloud.size);
    // Update cloud position
    cloud.x += cloud.speed;
    
    // Reset cloud position when it moves off screen
    if (cloud.x > width + cloud.size) {
      cloud.x = -cloud.size;
    }
  }
  
  // Draw a sun
  fill(255, 255, 0);
  circle(375, 20, 100);
  
  // Draw a simple farm scene
  fill(34, 139, 34);  // Green for grass
  rect(0, height * 0.7, width, height * 0.3);
  
  // Draw the detailed house
  drawHouse(50, height * 0.4, 150, 180);
  
  fill(255, 255, 255, 150);
  rect(50, 50, width-100, height-100, 10);
  
  fill(139, 69, 19);
  textSize(32);
  text('Writing Farm', width/2, 100);
  
  for (let button of buttons) {
    button.display();
  }
}

function drawHouse(houseX, houseY, houseWidth, houseHeight) {
  const frontY = houseY + houseHeight * .4;
  const frontHeight = houseHeight * .6;
  
  // front (bright red)
  fill(255, 0, 0);
  rect(houseX, frontY, houseWidth, frontHeight);
  
  // roof (brown)
  fill(139, 69, 19);
  triangle(houseX, frontY,
           houseX + houseWidth * .5, houseY,
           houseX + houseWidth, frontY);
           
  const windowWidth = houseWidth * .25;
  const windowHeight = frontHeight * .25;
  const windowY = frontY + frontHeight * .15;
  const leftWindowX = houseX + houseWidth * .1;
  const rightWindowX = (houseX + houseWidth) -
                       (houseWidth * .1) - windowWidth;
                       
  // windows (now yellow)
  fill(255, 255, 0);  // Changed to yellow
  rect(leftWindowX, windowY, windowWidth, windowHeight);
  stroke(0);
  line(leftWindowX, windowY + windowHeight * .5,
       leftWindowX + windowWidth, windowY + windowHeight * .5);
  line(leftWindowX + windowWidth * .5, windowY,
       leftWindowX + windowWidth * .5, windowY + windowHeight);
       
  rect(rightWindowX, windowY, windowWidth, windowHeight);
  line(rightWindowX, windowY + windowHeight * .5,
       rightWindowX + windowWidth, windowY + windowHeight * .5);
  line(rightWindowX + windowWidth * .5, windowY,
       rightWindowX + windowWidth * .5, windowY + windowHeight);
       
  const doorWidth = houseWidth * .25;
  const doorHeight = frontHeight * .4;
  const doorX = houseX + houseWidth * .5 - doorWidth * .5;
  const doorY = houseY + houseHeight - doorHeight;
  
  // door
  noStroke();
  fill(139, 69, 19);
  rect(doorX, doorY, doorWidth, doorHeight);
  
  // doorknob
  fill(0);
  const doorknobX = doorX + doorWidth * .2;
  const doorknobY = doorY + doorHeight * .5;
  const doorknobSize = houseWidth * .05;
  circle(doorknobX, doorknobY, doorknobSize);
}

function mousePressed() {
  for (let button of buttons) {
    if (button.isMouseOver()) {
      if (activeButton === button) {
        // If clicking the same button again, deactivate it
        activeButton = null;
      } else {
        // Set this button as active
        activeButton = button;
      }
      startGame(button.text);
    }
  }
}

function startGame(gameType) {
  console.log("Starting game:", gameType);
  // Add your game logic here
}

class Button {
  constructor(x, y, w, h, text) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.colors = {
      default: color(76, 175, 80),      // Default green
      hover: color(69, 160, 73),        // Darker green when hovered
      active: color(255, 165, 0)        // Orange when active
    };
  }
  
  display() {
    push();
    if (this === activeButton) {
      fill(this.colors.active);         // Orange when active
    } else if (this.isMouseOver()) {
      fill(this.colors.hover);          // Darker green when hovered
    } else {
      fill(this.colors.default);        // Default green
    }
    rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h, 5);
    fill(255);
    textSize(16);
    text(this.text, this.x, this.y);
    pop();
  }
  
  isMouseOver() {
    return mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 &&
           mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2;
  }
}

function drawCloud(x, y, size) {
  fill(255);
  noStroke();
  ellipse(x, y, size * 0.8, size * 0.5);
  ellipse(x - size * 0.3, y, size * 0.6, size * 0.4);
  ellipse(x + size * 0.3, y, size * 0.6, size * 0.4);
}