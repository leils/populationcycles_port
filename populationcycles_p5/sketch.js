// Main sketch file for Population Cycles

// Create simulation p5 instance
const simulationSketch = (p) => {
  p.preload = () => {
  }

  p.setup = () => {
    p.frameRate(30);
    const simCanvas = p.createCanvas(Math.floor(simWidth), Math.floor(simHeight));
    simCanvas.parent('simulation-canvas');
    p.background(0);

    // Create sim as an offscreen graphics buffer
    sim = p.createGraphics(Math.floor(simWidth), Math.floor(simHeight));
    sim.background(0);

    // TODO: use explo-specific fonts
    p.textFont('Arial');

    // the instances need to happen first! 
    globalSetupOperations(p);

    seedSimulation(p);
    runSimulation(p);
    graphCells();
  }

  p.windowResized = () => {
    // Update dimensions
    fullWidth = window.innerWidth;
    fullHeight = window.innerHeight;

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

    // Resize simulation canvas
    p.resizeCanvas(Math.floor(simWidth), Math.floor(simHeight));
    sim.resizeCanvas(Math.floor(simWidth), Math.floor(simHeight));
  }

  p.draw = () => {
    // TODO: re-write speed and updateRate to be easier to read
    // We run the simulation every 'speed' frames
    let updateRate = 20 - speed;
    // let updateRate = 20;
    if (play && p.frameCount % updateRate == 0) {        // Draw simulation and graph if unpaused, update only every frame divisible by speed variable
      runSimulation();
      graphCells();
      timer = p.millis();
    }
    p.clearScreen();

    displaySimulation();

    // Update simulation-specific text
    updateGenerationText();
  }

  p.clearScreen = () => {
    p.fill(0);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);
  }
};

// Create graph p5 instance
const graphSketch = (p) => {
  p.preload = () => {
  }

  p.setup = () => {
    p.frameRate(30);
    const graphCanvas = p.createCanvas(Math.floor(graphWidth), Math.floor(graphHeight));
    graphCanvas.parent('graph-canvas');
    p.background(0);

    // TODO: use explo-specific fonts
    p.textFont('Arial');
  }

  p.windowResized = () => {
    // Update graph dimensions
    graphWidth = fullWidth * 0.5;
    graphHeight = fullHeight * 0.32;
    graphX = (fullWidth - graphWidth) / 2;
    graphY = simHeight + simY * 2;

    // Update dependent variables
    graphDensity = Math.floor(graphWidth / graphMaxPoints);
    barWidth = graphWidth / graphMaxPoints;

    // Resize graph canvas
    p.resizeCanvas(Math.floor(graphWidth), Math.floor(graphHeight));
  }

  p.draw = () => {
    p.clearScreen();
    displayGraph();

    // Update graph-specific text
    updateReactionText();
  }

  p.clearScreen = () => {
    p.fill(0);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);
  }
};

// Initialize both p5 instances
let simP5Instance, graphP5Instance;

function initializeP5Instances() {
  simP5Instance = new p5(simulationSketch);
  graphP5Instance = new p5(graphSketch);

  // Store references globally
  simP5 = simP5Instance;
  graphP5 = graphP5Instance;
}

function updateGenerationText() {
  const generationDiv = document.getElementById('generation-text');
  generationDiv.textContent = "Simulation Cycle: " + generationCount;
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
  // } else if (generationCount >= 1000) {
  //   message = rtTooLong;
  } else {
    return;
  }
  // TODO: this is a quick hack to make sure we're not running this change every frame. 
  // Should try and make this more efficient
  if (lastMessage != message) {
    updateText(message, "red");
    lastMessage = message;
  }

}

function globalSetupOperations(p) {
  s = Math.floor(fullWidth / zoom);

  rowSize = Math.floor((simWidth - simX) / s);                    // Define size of each row in simulation
  columnSize = Math.floor((simHeight - simY) / s);                // Define size of each column in simulation
  maxcells = Math.floor(rowSize * columnSize);

  showHelp = false;

  generationCount = 0;                                                    // Set Generation to 0

  // Initialize cells array (different from Processing's 2D array)
  cells = Array(maxcells).fill().map(() => [0, 0, 0, 0]);

  sim.background(0);

  renderedSim[0] = sim.get(0, 0, Math.floor(simWidth / 2), sim.height);
  renderedSim[1] = sim.get(Math.floor(simWidth / 2), 0, Math.floor(simWidth / 2), sim.height);

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
  setPalette(p, cellPalate);
}

// THIS WON'T WORK, NEEDS p SENT
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
  lastHeatWave = -100;
  regularHeatWaves = false;
  generationCount = 0;

  seedSimulation();
  runSimulation();
  graphCells();

  play = true;
}

function setPalette(paletteNum) {

  cellColors[CELL_TYPES.GRAIN] = { r: 232, g: 216, b: 124 };    // Grain Color
  cellColors[CELL_TYPES.MICE] = { r: 200, g: 200, b: 200 };     // Mice Color
  cellColors[CELL_TYPES.EAGLE] = { r: 1, g: 93, b: 111 };       // Eagle Color 
  cellColors[CELL_TYPES.WALL] = { r: 150, g: 150, b: 150 };     // Wall Color


  // Update legacy color variables for backward compatibility
  grainc = simP5 ? simP5.color(cellColors[CELL_TYPES.GRAIN].r, cellColors[CELL_TYPES.GRAIN].g, cellColors[CELL_TYPES.GRAIN].b) : null;
  micec = simP5 ? simP5.color(cellColors[CELL_TYPES.MICE].r, cellColors[CELL_TYPES.MICE].g, cellColors[CELL_TYPES.MICE].b) : null;
  eaglesc = simP5 ? simP5.color(cellColors[CELL_TYPES.EAGLE].r, cellColors[CELL_TYPES.EAGLE].g, cellColors[CELL_TYPES.EAGLE].b) : null;
  wallsc = simP5 ? simP5.color(cellColors[CELL_TYPES.WALL].r, cellColors[CELL_TYPES.WALL].g, cellColors[CELL_TYPES.WALL].b) : null;

  black = simP5 ? simP5.color(0) : null;
  darkGrey = simP5 ? simP5.color(50) : null;
  medGrey = simP5 ? simP5.color(70) : null;
  lightGrey = simP5 ? simP5.color(100) : null;
  lighterGrey = simP5 ? simP5.color(150) : null;
  resetColor = simP5 ? simP5.color(255, 0, 0) : null;
}

// May need to also clear screen of graph, previously done together
function clearScreen() {
  simP5.fill(0);
  simP5.noStroke();
  simP5.rect(0, 0, width, height);
}