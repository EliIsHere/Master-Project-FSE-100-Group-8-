let canvasSize = 400;
let drawAreaSize = 200;
let resetButton, nextButton, quitButton;
let bg;
let currentLetter = 'A'; // Start with 'A'
let userStrokes = []; // Array to store multiple user strokes
let currentStroke = []; // Current stroke being drawn

function setup() {
  //set background image and resize to canvas size
  bg = loadImage(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxhDjaaoaxOs4H2x5gFwD5Ta05PkrSYJQfg&s"
  );
  bg.resize(400, 400);
  //set canvas size
  createCanvas(400, 400);
  
  //set Quit button
  button = createButton("Quit");
  button.position(270, 330);
  button.size(80, 40);
  button.style("font-family", "Comic Sans MS");
  button.style("background-color", color(235, 166, 7));
  
  //when quit button is pressed, switch back to main menu
  button.mousePressed(() => window.location.href = 'https://editor.p5js.org/toantam1712005/full/-1wkZ_ybT');
  
  //set Reset button
  resetButton = createButton("Reset");
  resetButton.position(50, 330);
  resetButton.size(80, 40);
  resetButton.style("font-family", "Comic Sans MS");
  resetButton.style("background-color", color(255, 99, 71));
  resetButton.mousePressed(resetDrawing);
  
  //set next button
  nextButton = createButton("-->");
  nextButton.position(320, 190);
  nextButton.size(40, 40);
  nextButton.style("font-family", "Comic Sans MS");
  nextButton.style("background-color", color(52, 235, 210));
  nextButton.mousePressed(nextAction);
  
  //audio button
  // Music button setup
  musicButton = createButton('♪');
  musicButton.position(175, 340);
  musicButton.size(50, 50);
  musicButton.style('border', 'none');
  musicButton.style('background-color', '#fff');
  
  // Set the button's graphic as a music note
  let musicNote = createGraphics(100, 100);
  musicNote.textSize(60);
  musicNote.textAlign(CENTER, CENTER);
  musicNote.text('♪', 50, 50);
  musicNote.fill(100, 100, 100);
  musicButton.elt.style.backgroundImage = `url(${musicNote.elt.toDataURL()})`;

  // Add functionality: Say "A" when button is pressed
   musicButton.mousePressed(playCurrentLetter);

  
}

function draw() {
  background(bg); //set background
  title(); //set title of exercise
  drawArea(); //set drawing area
  drawTracedPath(); //Animation of person tracing alphabet
}

function playCurrentLetter() {
  console.log(currentLetter);
  let msg = new SpeechSynthesisUtterance(currentLetter);
  window.speechSynthesis.speak(msg);
}

function title() {
  //set title of exercise function
  //title of exercise
  //Box containing title
  drawingContext.setLineDash([0, 0]);
  fill(252, 252, 252);
  stroke(0);
  strokeWeight(2);
  rect(80, 25, 240, 50, 10);
  //title text
  textSize(32);
  fill(0, 0, 0);
  textStyle(ITALIC);
  text("Audible Test", 106, 60);
}

function drawArea() {
  //set drawing area function
  //drawing area
  fill(223, 236, 247);
  stroke(0);
  strokeWeight(3);
  rect(110, 100, 180, 200, 10);
}

function resetDrawing() {
  // Reset all drawing-related variables
  userStrokes = [];
  currentStroke = [];
}

function drawTracedPath() {
  // Draw each stroke that the user has made
  strokeWeight(8);//stroke weight
  drawingContext.setLineDash([0, 0]);//reset line dash so that the strokes doesn't have dashes in them
  noFill();
  //set stroke for each stroke made
  for (let userStroke of userStrokes) {
    stroke(26, 76, 240);//set stroke color to blue
    //connects points made with the stroke
    beginShape();
    for (let point of userStroke) {
      vertex(point.x, point.y);
    }
    endShape();
  }
  //start and end shape based on stroke made using the mouse
  if (mouseIsPressed && isInsideArea(mouseX, mouseY)) {
    currentStroke.push({ x: mouseX, y: mouseY });
    stroke(26, 76, 240);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function isInsideArea(x, y) {
  // Makes sure the mouse is inside the drawing area
  return x > 110 && x < 290 && y > 100 && y < 300;
}

function mouseReleased() {
  // When the mouse is released, save the current stroke and start a new one
  if (currentStroke.length > 0) {
    userStrokes.push(currentStroke);
    currentStroke = []; // Reset for the next stroke
  }
}

function nextAction() {
  console.log("Next button pressed");

  // Move to the next letter in the alphabet
  if (currentLetter < 'Z') {
    currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);
  } else {
    currentLetter = 'A'; // Reset to 'A' after 'Z'
  }
  
  resetDrawing();

  playCurrentLetter();
}
