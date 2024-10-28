let bg;
let button;
let buttonColor;
let progress = 0;
let totalProgress = 500; // Total tracing steps for the star
let speed = 1; // Speed of tracing

function setup() {
  // Set background image and resize to canvas size
  bg = loadImage(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxhDjaaoaxOs4H2x5gFwD5Ta05PkrSYJQfg&s"
  );
  bg.resize(400, 400);

  // Set canvas size
  createCanvas(400, 400);

  // Set up the button
  buttonColor = color(235, 166, 7); // Initial button color
  button = createButton("Next -->");
  button.position(160, 330);
  button.size(80, 40);
  button.style("font-family", "Comic Sans MS");
  button.style("background-color", buttonColor);
  button.mousePressed(changeColor); // Change color when clicked
}

function draw() {
  background(bg); // Set background
  title(); // Draw the title of the exercise
  drawArea(); // Draw the area for tracing
  drawTracedPath(); // Animation of the person tracing the star shape
  progressBar(); // Show the progress bar
}

// Set title of exercise
function title() {
  // Title box
  drawingContext.setLineDash([0, 0]);
  fill(252, 252, 252);
  stroke(0);
  strokeWeight(2);
  rect(80, 25, 240, 50, 10);

  // Title text
  textSize(32);
  fill(0, 0, 0);
  textStyle(ITALIC);
  text("Star Tracing", 120, 60);
}

// Set drawing area
function drawArea() {
  // Drawing area box
  fill(223, 236, 247);
  stroke(0);
  strokeWeight(3);
  rect(110, 100, 180, 200, 10);
}

// Change button color
function changeColor() {
  buttonColor = color(20, 145, 247); // Change color
  button.style("background-color", buttonColor);
  console.log("Next button pressed");
}

// Animate the traced path of the star
function drawTracedPath() {
  // Set dotted line style
  drawingContext.setLineDash([5, 5]); // 5 pixels dash, 5 pixels gap

  // Tracing the star shape
  let starCoords = [
    [200, 120], [220, 180], [280, 180], [230, 220], [250, 280],
    [200, 240], [150, 280], [170, 220], [120, 180], [180, 180]
  ];

  let numPoints = starCoords.length;

  for (let i = 0; i < numPoints; i++) {
    let nextIndex = (i + 1) % numPoints;
    let startX = starCoords[i][0];
    let startY = starCoords[i][1];
    let endX = starCoords[nextIndex][0];
    let endY = starCoords[nextIndex][1];

    let progressSegment = totalProgress / numPoints;

    if (progress > i * progressSegment) {
      let segmentProgress = constrain((progress - i * progressSegment) / progressSegment, 0, 1);
      let currentX = lerp(startX, endX, segmentProgress);
      let currentY = lerp(startY, endY, segmentProgress);

      line(startX, startY, currentX, currentY);
    }
  }

  // Increment progress if not complete
  if (progress <= totalProgress) {
    progress += speed;
  }
}

// Draw the progress bar
function progressBar() {
  // Percentage of progress
  let percentage = int((progress / totalProgress) * 100);

  // Progress bar
  fill(255);
  rect(100, 370, 200, 20); // Background
  fill(0, 255, 0);
  rect(100, 370, map(progress, 0, totalProgress, 0, 200), 20); // Fill according to progress

  // Show percentage text
  fill(0);
  textSize(16);
  text(percentage + "% Completed", 150, 385);
}
