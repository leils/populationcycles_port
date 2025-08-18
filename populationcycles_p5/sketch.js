// Main sketch file for Population Cycles
function preload() {
}

function setup() {
  frameRate(30);
  createCanvas(fullWidth, fullHeight);
  background(0);
  
  // Create sim as an offscreen graphics buffer
  sim = createGraphics(Math.floor(simWidth), Math.floor(simHeight));
  sim.background(0);
  
  // TODO: use explo-specific fonts
  textFont('Arial');
  
  globalSetupOperations();
  
  seedSimulation();
  runSimulation();
  graphCells();
}

function windowResized() {
  // Update dimensions
  fullWidth = windowWidth;
  fullHeight = windowHeight;
  
  // Update simulation dimensions
  simWidth = fullWidth * 0.95;
  simHeight = fullHeight * 0.66;
  simX = (fullWidth - simWidth) / 2;
  simY = fullHeight * 0.02;
  
  // Update graph dimensions
  graphWidth = fullWidth * 0.5;
  graphHeight = fullHeight * 0.32;
  graphX = (fullWidth - graphWidth) / 2;
  graphY = simHeight + simY * 2;
  
  // Update dependent variables
  s = Math.floor(simWidth / zoom);
  graphDensity = Math.floor(graphWidth / graphMaxPoints);
  barWidth = graphWidth / graphMaxPoints;
  
  // Resize canvases
  resizeCanvas(fullWidth, fullHeight);
  // sim.resizeCanvas(Math.floor(simWidth), Math.floor(simHeight)); // necessary? 
}

function draw() {
  // TODO: re-write speed and updateRate to be easier to read
  // We run the simulation every 'speed' frames
  let updateRate = 20-speed;
  // let updateRate = 20;
  if (play && frameCount % updateRate == 0) {        // Draw simulation and graph if unpaused, update only every frame divisible by speed variable
    runSimulation();
    graphCells();
    timer = millis();
  }
  clearScreen();
  
  displaySimulation();
  displayGraph();

  updateReactionText();
  updateGenerationText();

  // Display debug info in the console
  // console.log("FPS: " + Math.floor(frameRate()) + " — Generation: " + generationCount + 
  //             " - Total Cells: " + maxcells + " with " + graincount + " grain, " + 
  //             micecount + " mice, and " + eaglescount + " eagles     cell size: " + 
  //             s + " speed: " + speed + " zoom: " + zoom);
}

function updateGenerationText() {
  const generationDiv = document.getElementById('generation-text');
  generationDiv.textContent = "Generations: " + generationCount;
}

// TODO: consolidate with the function in script.js
function updateReactionText() {

  let message = "";
  if (graincount === 0 && micecount === 0 && eaglescount === 0) {
    play = false; // pause on all species extinction
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
  } else {
    return;
  }
  // TODO: this is a quick hack to make sure we're not running this change every frame. 
  // Should try and make this more efficient
  if (lastMessage != message) {
    updateText(message, "red");
    lastMessage = message;

    // const eventDiv = document.getElementById('event-text');
    // eventDiv.style.color = "red";
    // eventDiv.textContent = message;
    // eventDiv.style.display = "block";

    // lastMessage = message;

    // setTimeout(() => {
    //   eventDiv.style.display = "none";
    // }, 10000);
  }
  
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
  // TODO: fix this weird hack to get the lines to span the width of the graph
  let graphLineArrayLength = ((graphWidth) / graphDensity) + 4;
  
  grainLine = new Array(graphMaxPoints).fill(graphY + graphHeight - 2);
  miceLine = new Array(graphMaxPoints).fill(graphY + graphHeight - 2);
  eaglesLine = new Array(graphMaxPoints).fill(graphY + graphHeight - 2);
  
  // TODO: wat 
  graphHeight = fullHeight - (simY * 2) - simHeight - (fullHeight - txtY);
  
  // Set color based on palate choice
  setPalette(cellPalate);
}

function fullReset() {
  grainSpan = midSpan;       // grain lifespan (in generation number)
  miceSpan = midSpan;        // mice lifespan (in generation number)
  eagleSpan = midSpan;      // eagle lifespan (in generation number)

  grainGrowth = midGrowth;     // Percent chance of grain growth given correct parameters
  miceGrowth = midGrowth;       // Percent chance of mice growth given correct parameters
  eagleGrowth = midGrowth;     // Percent chance of eagle growth given correct parameters

  grainLine.fill(graphY + graphHeight - 2);
  miceLine.fill(graphY + graphHeight - 2);
  eaglesLine.fill(graphY + graphHeight - 2);
  heatWaveMarkers = [];

  seedSimulation();
  runSimulation();
  graphCells();

  generationCount = 0;
  play = true;
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