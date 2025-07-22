// Mouse interaction functions

// NOTE: Holy shit creating click handlers for the tabs by hardcoding?? no no no 
// Removing this, we'll figure out if we even need tabs and these buttons :P 
// This handles tab clicking
// function mouseClicked() {
//   // Check if help is showing and user clicks the X to close
//   if (showHelp && mouseX > width - 40 && mouseX < width && mouseY > 0 && mouseY < 60) {
//     showHelp = false;
//     return;
//   }
  
//   // Check if help button is clicked
//   if (mouseX > width - 40 && mouseX < width - 10 && mouseY > 10 && mouseY < 40) {
//     showHelp = !showHelp;
//     return;
//   }
  
//   // Check if click is in tab area
//   if (mouseY > txtY && mouseY < txtY + tabHeight) {
//     // Tab 1
//     if (mouseX > txtX && mouseX < txtX + txtWidth / 3 - tabSpacer) {
//       tabNum = 0;
//     }
//     // Tab 2
//     else if (mouseX > txtX + txtWidth / 3 && mouseX < txtX + 2 * txtWidth / 3 - tabSpacer) {
//       tabNum = 1;
//     }
//     // Tab 3
//     else if (mouseX > txtX + 2 * txtWidth / 3 && mouseX < txtX + txtWidth) {
//       tabNum = 2;
//     }
    
//     // Show the text panel if clicking on a tab
//     if (txtY < txtMax) {
//       slideText = true;
//       textState = "down";
//       clickTimer = millis();
//     }
//   }
  
//   // Check for color debug mode
//   if (colorDebug && mouseX < 50 && mouseY < 50) {
//     cellPalate = (cellPalate + 1) % palateNumber;
//     setPalette(cellPalate);
//   }
// }

// note: I think we don't actually want this anymore, it's too complicated as an interaction
// This handles mouse dragging (for painting cells)
// function mouseDragged() {
//   // If help is showing, don't allow painting
//   if (showHelp) return false;
  
//   // Check if drag is within simulation area
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
  
//   return false; // Prevent default behavior
// }

// This handles key presses
function keyPressed() {
  // Space bar toggles pause/play
  if (key === ' ') {
    step = 1 - step;
  }
  
  // // Arrow keys control speed
  // if (keyCode === RIGHT_ARROW) {
  //   speed = constrain(speed - 1, maxSpeed, minSpeed);
  // } else if (keyCode === LEFT_ARROW) {
  //   speed = constrain(speed + 1, maxSpeed, minSpeed);
  // }
  
  // 'r' key resets simulation
  if (key === 'r') {
    seedSimulation();
    runSimulation();
    graphCells();
  }
  
  // 'h' key toggles help
  // if (key === 'h') {
  //   showHelp = !showHelp;
  // }
  
  // 'Escape' key closes help if it's open
  // if (keyCode === ESCAPE && showHelp) {
  //   showHelp = false;
  // }
  
  // // Number keys 1-3 select tabs
  // if (key === '1') {
  //   // tabNum = 0;
  //   slideText = true;
  //   // textState = "down";
  //   clickTimer = millis();
  // } else if (key === '2') {
  //   tabNum = 1;
  //   slideText = true;
  //   // textState = "down";
  //   clickTimer = millis();
  // } else if (key === '3') {
  //   tabNum = 2;
  //   slideText = true;
  //   // textState = "down";
  //   clickTimer = millis();
  // }
  
  // 'c' key cycles color palettes if in debug mode
  if (key === 'c' && colorDebug) {
    cellPalate = (cellPalate + 1) % palateNumber;
    setPalette(cellPalate);
  }
  
  return false; // Prevent default behavior
} 