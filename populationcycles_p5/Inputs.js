// Mouse interaction functions

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
  
  // 'c' key cycles color palettes if in debug mode
  if (key === 'c' && colorDebug) {
    cellPalate = (cellPalate + 1) % palateNumber;
    setPalette(cellPalate);
  }
  
  return false; // Prevent default behavior
} 