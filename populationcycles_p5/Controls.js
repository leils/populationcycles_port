function displayControls() {
  // Clear the control area background
  fill(0);
  noStroke();
  rect(0, simHeight, fullWidth, fullHeight - simHeight);

  // Draw border around Simulation
  stroke(50);
  strokeWeight(simBorderThickness);
  noFill();
  rect(simX, simY, simWidth - simX, simHeight - simY - 2);
  strokeWeight(1);

  // Draw generation count
  fill(200);
  noStroke();
  textAlign(LEFT);
  textSize(14);
  text("Generation:", simX, simHeight + 15);
  text(generationCount, simX + 100, simHeight + 15);

  // Draw the control panels
  drawControlArea();
}

function drawControlArea() {
  // Draw control background
  const controlAreaX = fullWidth / 2;
  const controlAreaY = simHeight + 50;
  const controlAreaWidth = fullWidth / 2 - 20;
  const controlAreaHeight = 250;
  
  // Draw reset button
  // drawResetButton();
  
  // Draw playback controls (prev, play/pause)
  // drawPlaybackControls();
  
  // Draw speed slider
  // drawSpeedSlider();
  
  // Draw tool buttons (paint, zoom)
  // drawToolButtons();
  
  // Draw species panels
  // drawSpeciesPanels();
}

// function drawResetButton() {
//   // Reset button as a red rectangle
//   fill(170, 0, 0);
//   stroke(100);
//   strokeWeight(1);
//   rect(fullWidth - 150, simHeight + 20, 100, 35, 5);
  
//   // Reset text
//   fill(255);
//   textSize(16);
//   textAlign(CENTER, CENTER);
//   text("RESET", fullWidth - 100, simHeight + 37);
// }

// function drawPlaybackControls() {
//   // Back/previous button
//   fill(40);
//   stroke(80);
//   rect(fullWidth - 250, simHeight + 20, 40, 35, 5);
  
//   // Draw back icon (double triangle)
//   fill(200);
//   triangle(
//     fullWidth - 235, simHeight + 27,
//     fullWidth - 225, simHeight + 37,
//     fullWidth - 235, simHeight + 47
//   );
//   triangle(
//     fullWidth - 225, simHeight + 27,
//     fullWidth - 215, simHeight + 37,
//     fullWidth - 225, simHeight + 47
//   );
  
//   // Play/pause button
//   fill(40);
//   stroke(80);
//   rect(fullWidth - 200, simHeight + 20, 40, 35, 5);
  
//   // Draw play/pause icon
//   if (step === 0) { // Paused - show play icon
//     fill(200);
//     triangle(
//       fullWidth - 190, simHeight + 27,
//       fullWidth - 190, simHeight + 47,
//       fullWidth - 170, simHeight + 37
//     );
//   } else { // Playing - show pause icon
//     fill(200);
//     rect(fullWidth - 190, simHeight + 27, 7, 20);
//     rect(fullWidth - 178, simHeight + 27, 7, 20);
//   }
// }

// function drawSpeedSlider() {
//   // Speed slider track
//   fill(30);
//   stroke(80);
//   rect(fullWidth - 350, simHeight + 45, 140, 10, 5);
  
//   // Speed slider thumb
//   fill(200);
//   noStroke();
//   ellipse(
//     map(speed, minSpeed, maxSpeed, fullWidth - 350, fullWidth - 210),
//     simHeight + 50,
//     15, 15
//   );
  
//   // Speed text
//   fill(150);
//   textSize(12);
//   textAlign(CENTER);
//   text("SPEED", fullWidth - 280, simHeight + 30);
// }

// function drawToolButtons() {
//   // Paint button
//   fill(paintType);
//   stroke(100);
//   strokeWeight(1);
//   rect(fullWidth - 400, simHeight + 20, 40, 35, 5);
  
//   // Paint icon
//   stroke(255);
//   strokeWeight(2);
//   line(fullWidth - 390, simHeight + 30, fullWidth - 370, simHeight + 45);
//   fill(255);
//   noStroke();
//   ellipse(fullWidth - 370, simHeight + 45, 6, 6);
  
//   // Zoom button
//   fill(40);
//   stroke(100);
//   strokeWeight(1);
//   rect(fullWidth - 450, simHeight + 20, 40, 35, 5);
  
//   // Zoom icon
//   stroke(200);
//   strokeWeight(1);
//   noFill();
//   ellipse(fullWidth - 435, simHeight + 35, 15, 15);
//   stroke(200);
//   strokeWeight(2);
//   line(fullWidth - 428, simHeight + 42, fullWidth - 420, simHeight + 50);
// }

// function drawSpeciesPanels() {
//   const panelWidth = 200;
//   const panelHeight = 180;
//   const panelSpacing = 20;
//   const startX = fullWidth - 3 * panelWidth - 2 * panelSpacing - 20;
//   const startY = simHeight + 80;
  
//   // Draw grain panel
//   drawSpeciesPanel("GRAIN", grainc, startX, startY, panelWidth, panelHeight);
  
//   // Draw mice panel
//   drawSpeciesPanel("MICE", micec, startX + panelWidth + panelSpacing, startY, panelWidth, panelHeight);
  
//   // Draw eagles panel
//   drawSpeciesPanel("EAGLES", eaglesc, startX + 2 * (panelWidth + panelSpacing), startY, panelWidth, panelHeight);
// }

// function drawSpeciesPanel(title, speciesColor, x, y, w, h) {
//   // Panel background
//   fill(speciesColor);
//   stroke(50);
//   strokeWeight(1);
//   rect(x, y, w, h, 5);
  
//   // Title
//   fill(0);
//   textSize(20);
//   textAlign(CENTER);
//   text(title, x + w/2, y + 25);
  
//   // Lifespan slider
//   fill(50);
//   stroke(30);
//   rect(x + 20, y + 50, w - 40, 25, 5);
  
//   // Lifespan label
//   fill(255);
//   textSize(14);
//   textAlign(CENTER);
//   text("LIFESPAN", x + w/2, y + 63);
  
//   // Fitness slider
//   fill(50);
//   stroke(30);
//   rect(x + 20, y + 90, w - 40, 25, 5);
  
//   // Fitness label
//   fill(255);
//   textSize(14);
//   textAlign(CENTER);
//   text("FITNESS", x + w/2, y + 103);
  
//   // Weak button
//   fill(40);
//   stroke(30);
//   rect(x + 20, y + 130, w - 40, 20, 5);
  
//   // Weak text
//   fill(255);
//   textSize(12);
//   textAlign(CENTER);
//   text("WEAK " + title, x + w/2, y + 142);
  
//   // Strong button
//   fill(40);
//   stroke(30);
//   rect(x + 20, y + 155, w - 40, 20, 5);
  
//   // Strong text
//   fill(255);
//   textSize(12);
//   textAlign(CENTER);
//   text("STRONG " + title, x + w/2, y + 167);
// }

// Handle mouse clicks for controls
// function mousePressed() {
//   // Check if click is within simulation area
//   if (mouseX > simX && mouseX < simX + simWidth && mouseY > simY && mouseY < simY + simHeight) {
//     // Convert mouse position to cell index
//     let cellX = Math.floor((mouseX - simX) / s);
//     let cellY = Math.floor((mouseY - simY) / s);
//     let cellIndex = cellY * rowSize + cellX;
    
//     // Make sure index is valid
//     if (cellIndex >= 0 && cellIndex < maxcells) {
//       paintCells(cellIndex);
//     }
//   }
  
//   // Check if reset button is clicked
//   if (mouseX > fullWidth - 150 && mouseX < fullWidth - 50 &&
//       mouseY > simHeight + 20 && mouseY < simHeight + 55) {
//     // Reset simulation
//     seedSimulation();
//     runSimulation();
//     graphCells();
//   }
  
//   // Check if play/pause button is clicked
//   if (mouseX > fullWidth - 200 && mouseX < fullWidth - 160 &&
//       mouseY > simHeight + 20 && mouseY < simHeight + 55) {
//     // Toggle play/pause
//     step = 1 - step;
//   }
  
//   // Check if speed slider is clicked
//   if (mouseX > fullWidth - 350 && mouseX < fullWidth - 210 &&
//       mouseY > simHeight + 40 && mouseY < simHeight + 60) {
//     // Set speed based on slider position
//     speed = Math.floor(map(mouseX, fullWidth - 350, fullWidth - 210, minSpeed, maxSpeed));
//     speed = constrain(speed, maxSpeed, minSpeed);
//   }
  
//   // Check species panels for clicks
//   const panelWidth = 200;
//   const panelHeight = 180;
//   const panelSpacing = 20;
//   const startX = fullWidth - 3 * panelWidth - 2 * panelSpacing - 20;
//   const startY = simHeight + 80;
  
//   // Check grain panel weak/strong buttons
//   if (mouseY > startY + 130 && mouseY < startY + 150 &&
//       mouseX > startX + 20 && mouseX < startX + panelWidth - 20) {
//     // Weak grain preset
//     grains = 2;
//     grainsi = 20;
//   } else if (mouseY > startY + 155 && mouseY < startY + 175 &&
//              mouseX > startX + 20 && mouseX < startX + panelWidth - 20) {
//     // Strong grain preset
//     grains = 7;
//     grainsi = 70;
//   }
  
//   // Check mice panel weak/strong buttons
//   if (mouseY > startY + 130 && mouseY < startY + 150 &&
//       mouseX > startX + panelWidth + panelSpacing + 20 && 
//       mouseX < startX + 2 * panelWidth + panelSpacing - 20) {
//     // Weak mice preset
//     mices = 3;
//     micei = 30;
//   } else if (mouseY > startY + 155 && mouseY < startY + 175 &&
//              mouseX > startX + panelWidth + panelSpacing + 20 && 
//              mouseX < startX + 2 * panelWidth + panelSpacing - 20) {
//     // Strong mice preset
//     mices = 8;
//     micei = 80;
//   }
  
//   // Check eagles panel weak/strong buttons
//   if (mouseY > startY + 130 && mouseY < startY + 150 &&
//       mouseX > startX + 2 * (panelWidth + panelSpacing) + 20 && 
//       mouseX < startX + 3 * panelWidth + 2 * panelSpacing - 20) {
//     // Weak eagles preset
//     eagless = 3;
//     eaglesi = 30;
//   } else if (mouseY > startY + 155 && mouseY < startY + 175 &&
//              mouseX > startX + 2 * (panelWidth + panelSpacing) + 20 && 
//              mouseX < startX + 3 * panelWidth + 2 * panelSpacing - 20) {
//     // Strong eagles preset
//     eagless = 7;
//     eaglesi = 70;
//   }
// }
//} 