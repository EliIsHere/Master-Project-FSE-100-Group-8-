let progress = 0; // Progress of the trace
let speed = 1; 

function setup() {
  createCanvas(400, 400);
  bg = loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxhDjaaoaxOs4H2x5gFwD5Ta05PkrSYJQfg&s ');
  bg.resize(400,400);
  
  
  musicButton = createButton('♪');
  musicButton.position(175, 60);
  musicButton.size(50, 50);
  musicButton.style('border', 'none');
  musicButton.style('background-color', '#fff');
  
  // Set the button's graphic as a music note
  let musicNote = createGraphics(100, 100);
  musicNote.textSize(60);
  musicNote.textAlign(CENTER,CENTER);
  musicNote.text('♪', 50, 50); // Music note character
  musicNote.fill(100,100,100);
  musicButton.elt.style.backgroundImage = `url(${musicNote.elt.toDataURL()})`;
  
  // Add functionality: Say "A" when button is pressed
  musicButton.mousePressed(playNoteA);
  
  strokeWeight(5);
  stroke(0);
}


function playNoteA() {
  console.log("A");
  let msg = new SpeechSynthesisUtterance('A');
  window.speechSynthesis.speak(msg);
}


function draw() {
  background(bg);
  fill(200,100,0);
  text('Write the Letter',70,35);
  textSize(20);
  text('Press the Button',130,55);
  textSize(20);
  fill(0,255,0);
  strokeWeight(4);
  text('Accuracy',160,355);
  textSize(40);
  fill(200,100,0);
  rect(100,115,200,220);
  fill(255,0,0);
  ellipse(200,375,100,20);
  
//tempoary place holder for the tracing
  
 if (progress <= 100) {
    let x1 = lerp(175, 200, progress / 100); // Start from left diagonal
    let y1 = lerp(300, 150, progress / 100);
    line(175, 300, x1, y1);
  }
  
  // Tracing the right diagonal of "A" (centered)
  if (progress > 100 && progress <= 200) {
    let x2 = lerp(200, 225, (progress - 100) / 100); // Right diagonal
    let y2 = lerp(150, 300, (progress - 100) / 100);
    line(200, 150, x2, y2);
  }
  
  // Tracing the horizontal middle bar of "A" (centered)
  if (progress > 200 && progress <= 300) {
    let x3 = lerp(185, 215, (progress - 200) / 100); // Middle bar
    let y3 = lerp(225, 225, (progress - 200) / 100);
    line(185, 225, x3, y3);
  }

  // Increment progress
  if (progress <= 300) {
    progress += speed;
  }
  
  
}