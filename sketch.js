let canvasSize = 400;
let drawAreaSize = 200;
let resetButton, nextButton, quitButton;
let bg;
let currentLetter = 'A'; // Start with 'A'

function setup() {
  bg = loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxhDjaaoaxOs4H2x5gFwD5Ta05PkrSYJQfg&s');
  background(bg);
   bg.resize(400, 400); // Display the background once during setup
  createCanvas(canvasSize, canvasSize).position(0, 50);

  // Load and resize the background image for initial setup

  // Music button setup
  musicButton = createButton('♪');
  musicButton.position(175, 370);
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

  // Reset button setup
  resetButton = createButton("Reset");
  resetButton.position(10, 60);
  resetButton.mousePressed(resetCanvas);

  // Next button setup
  nextButton = createButton("Next");
  nextButton.position(width - 60, height + 20);
  nextButton.mousePressed(nextAction);

  // Quit button setup
  quitButton = createButton("Quit");
  quitButton.position(10, height + 20);
  quitButton.mousePressed(quitAction);
  
  quitButton.mousePressed(() => window.location.href = "https://editor.p5js.org/toantam1712005/full/-1wkZ_ybT")
}

function playCurrentLetter() {
  console.log(currentLetter);
  let msg = new SpeechSynthesisUtterance(currentLetter);
  window.speechSynthesis.speak(msg);
}

function draw() {
  
  fill(200, 100, 0);
  textSize(40);
  text('Write the Letter', 70, 35);
  textSize(20);
  text('Press the Button', 130, 65);

  // Draw the border around the center drawing area as a guide
  stroke(10);
  noFill();
  rectMode(CENTER);
  rect(width / 2, height / 2, drawAreaSize, drawAreaSize);

  // Allow drawing only within the drawing area if the mouse is pressed
  noFill();
  if (
    mouseIsPressed &&
    mouseX > width / 2 - drawAreaSize / 2 &&
    mouseX < width / 2 + drawAreaSize / 2 &&
    mouseY > height / 2 - drawAreaSize / 2 &&
    mouseY < height / 2 + drawAreaSize / 2
  ) {
    stroke(0);
    strokeWeight(10);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function resetCanvas() {
  // Clear canvas by drawing a blank background and reset the guide border
  background(bg);
}

function nextAction() {
  console.log("Next button pressed");

  // Move to the next letter in the alphabet
  if (currentLetter < 'Z') {
    currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);
  } else {
    currentLetter = 'A'; // Reset to 'A' after 'Z'
  }

  playCurrentLetter();
}

function quitAction() {
  console.log("Quit button pressed");
  // Add any additional code for "Quit" functionality here
}
