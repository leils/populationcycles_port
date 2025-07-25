// Mouse interaction functions

// This handles key presses
function keyPressed() {
  // Space bar toggles pause/play
  if (key === ' ') {
    play = !play;
  }

  if (key == '0') {
    recoveryOn = !recoveryOn;
    if (recoveryOn) {
      console.log('Recovery mode on');
    } else {
      console.log('Recovery mode off');
    }
  }

  if (key === '1') {
    console.log('scenario 1 - heat wave, weak grain');
     markHeatWave();
    // Apply Weak Grain preset
    grainSpan = 2; //reduce grain lifespan
    miceSpan = 5;
    eagleSpan = 5;
    grainGrowth = 20; // reduce grain growth chance
    miceGrowth = 50;
    eagleGrowth = 50;
  }

  if (key === '2') {
    console.log('scenario 2 - stronger mice introduced');
    markHeatWave(); // TODO: change this to a different color marker or something
    grainSpan = 5;
    miceSpan = 8;
    eagleSpan = 5;
    grainGrowth = 50; 
    miceGrowth = 80;
    eagleGrowth = 50;
  }

  if (key === '3') {
    console.log('scenario 3 - eagles suffer disease');
    markHeatWave(); // TODO: change this to a different color marker or something
    grainSpan = 5;
    miceSpan = 5;
    eagleSpan = 2;
    grainGrowth = 50; 
    miceGrowth = 50;
    eagleGrowth = 20;
  }
  
  // // Arrow keys control speed
  // if (keyCode === RIGHT_ARROW) {
  //   speed = constrain(speed - 1, maxSpeed, minSpeed);
  // } else if (keyCode === LEFT_ARROW) {
  //   speed = constrain(speed + 1, maxSpeed, minSpeed);
  // }
  
  // 'r' key resets simulation
  if (key === 'r') {
    fullReset();
  }
  
  // 'c' key cycles color palettes if in debug mode
  if (key === 'c' && colorDebug) {
    cellPalate = (cellPalate + 1) % palateNumber;
    setPalette(cellPalate);
  }
  
  return false; // Prevent default behavior
} 