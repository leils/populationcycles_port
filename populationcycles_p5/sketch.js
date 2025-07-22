// Main sketch file for Population Cycles

function preload() {
}

function setup() {
  frameRate(30);
  createCanvas(fullWidth, fullHeight);
  background(0);
  
  // Create sim as an offscreen graphics buffer (equivalent to PGraphics in Processing)
  sim = createGraphics(Math.floor(simWidth), Math.floor(simHeight));
  sim.background(0);
  
  // TODO: use explo-specific fonts
  textFont('Arial');
  
  globalSetupOperations();
  
  seedSimulation();
  runSimulation();
  graphCells();

  // --- HTML Controls Integration ---
  const resetBtn = document.getElementById('reset-btn');
  const playBtn = document.getElementById('play-btn');
  const speedSlider = document.getElementById('speed-slider');

  if (resetBtn) {
    resetBtn.onclick = () => {
      seedSimulation();
      runSimulation();
      graphCells();
    };
  }
  if (playBtn) {
    playBtn.onclick = () => {
      step = 1 - step;
      playBtn.textContent = step ? 'Pause' : 'Play';
    };
    playBtn.textContent = step ? 'Pause' : 'Play';
  }
  if (speedSlider) {
    speedSlider.oninput = (e) => {
      speed = parseInt(e.target.value, 10);
    };
    speedSlider.value = speed;
  }
}

function draw() {
  // Note: Speed seems to be what we're DIVIDING the framecount by, not like ... how often we're updating the sim
  if (step == 1 && frameCount % speed == 0) {        // Draw simulation and graph if unpaused, update only every frame divisible by speed variable
    runSimulation();
    graphCells();
    timer = millis();
  }
  clearScreen();
  
  displaySimulation();
  displayGraph();

  updateReactionText();

  // Display debug info in the console
  // console.log("FPS: " + Math.floor(frameRate()) + " — Generation: " + generationCount + 
  //             " - Total Cells: " + maxcells + " with " + graincount + " grain, " + 
  //             micecount + " mice, and " + eaglescount + " eagles     cell size: " + 
  //             s + " speed: " + speed + " zoom: " + zoom);
}

function updateReactionText() {
  const reactionDiv = document.getElementById('reaction-text');
  if (!reactionDiv) return;

  let message = "";
  if (graincount === 0 && micecount === 0 && eaglescount === 0) {
    message = rtAllDead;
  } else if (graincount === 0) {
    message = rtGrainDead;
  } else if (micecount === 0 && eaglescount === 0) {
    message = rtMiceEaglesDead;
  } else if (micecount === 0) {
    message = rtMiceDead;
  } else if (eaglescount === 0) {
    message = rtEaglesDead;
  } else if (generationCount >= 1000) {
    message = rtTooLong;
  }
  
  reactionDiv.textContent = message;
}

function globalSetupOperations() {
  s = Math.floor(fullWidth / zoom); 

  rowSize = Math.floor((simWidth - simX) / s);                    // Define size of each row in simulation
  columnSize = Math.floor((simHeight - simY) / s);                // Define size of each column in simulation
  maxcells = Math.floor(rowSize * columnSize);

  showHelp = false;
  
  generationCount = 0;                                                    // Set Generation to 0

  // Initialize cells array (different from Processing's 2D array)
  cells = Array(maxcells).fill().map(() => [0, 0, 0, 0]);
  
  sim.background(0);
  
  renderedSim[0] = sim.get(0, 0, Math.floor(simWidth/2), sim.height);
  renderedSim[1] = sim.get(Math.floor(simWidth/2), 0, Math.floor(simWidth/2), sim.height);
  
  txtY = txtMin;
  
  // Set up graph arrays
  let graphLineArrayLength = (graphWidth) / graphDensity;
  
  grainLine = new Array(Math.floor(graphLineArrayLength)).fill(graphY + graphHeight - 2);
  miceLine = new Array(Math.floor(graphLineArrayLength)).fill(graphY + graphHeight - 2);
  eaglesLine = new Array(Math.floor(graphLineArrayLength)).fill(graphY + graphHeight - 2);
  
  graphHeight = fullHeight - simY * 2 - simHeight - (fullHeight - txtY);
  
  // Set color based on palate choice
  setPalette(cellPalate);
}

function setPalette(paletteNum) {
  // Set color based on palate choice
  switch(paletteNum) {
    case 0:
      grainc = color(102, 150, 0);      // Grain Color
      micec = color(0, 102, 204);       // Mice Color
      eaglesc = color(204, 0, 0);       // Eagle Color 
      wallsc = color(100);
      paintType = wallsc;
      break;
    
    case 1:
      grainc = color(178, 225, 91);     // Grain Color
      micec = color(102, 153, 204);     // Mice Color
      eaglesc = color(204, 80, 80);     // Eagle Color 
      wallsc = color(100);
      paintType = wallsc;
      break;
    
    case 2: 
      grainc = color(55, 82, 0);        // Grain Color
      micec = color(0, 64, 127);        // Mice Color
      eaglesc = color(102, 0, 0);       // Eagle Color 
      wallsc = color(100);
      paintType = wallsc;
      break;
      
    case 3:
      grainc = color(184, 182, 62);     // Grain Color
      micec = color(15, 100, 153);      // Mice Color
      eaglesc = color(204, 0, 0);       // Eagle Color 
      wallsc = color(100);
      paintType = wallsc;
      break;
      
    case 4:
      grainc = color(112, 102, 80);     // Grain Color
      micec = color(101, 128, 140);     // Mice Color
      eaglesc = color(169, 44, 16);     // Eagle Color  
      wallsc = color(200);
      paintType = wallsc;
      break;
      
    case 5:
      grainc = color(184, 144, 41);     // Grain Color
      micec = color(180, 180, 180);     // Mice Color
      eaglesc = color(64, 34, 18);      // Eagle Color 
      wallsc = color(100);
      paintType = wallsc;
      break;
      
    case 6:
      grainc = color(191, 189, 164);    // Grain Color
      micec = color(1, 93, 111);        // Mice Color
      eaglesc = color(162, 42, 18);     // Eagle Color
      wallsc = color(60);
      paintType = grainc;
      break;
      
    case 7:
      grainc = color(232, 216, 124);    // Grain Color
      micec = color(200);               // Mice Color
      eaglesc = color(1, 93, 111);      // Eagle Color 
      wallsc = color(150);
      paintType = grainc;
      break;
  }

  black = color(0);
  darkGrey = color(50);
  medGrey = color(70); 
  lightGrey = color(100); 
  lighterGrey = color(150);
  resetColor = color(255, 0, 0);
}

function clearScreen() {
  fill(0);
  noStroke();
  rect(0, 0, width, height);
}