// TODO: Many of these should really be in a config file, not "variables"

// P5 instances for separate canvases
let simP5;  // Simulation p5 instance
let graphP5; // Graph p5 instance

// Cell type constants
const CELL_TYPES = {
  EMPTY: 0,    // Empty/dead cell
  GRAIN: 1,    // Grain cell
  MICE: 2,     // Mice cell
  EAGLE: 3,    // Eagle cell
  WALL: 4      // Wall cell
};

// Color map for cell types (RGB values, not p5 colors)
let cellColors = {
  [CELL_TYPES.EMPTY]: { r: 0, g: 0, b: 0 },      // Black
  [CELL_TYPES.GRAIN]: { r: 102, g: 150, b: 0 },   // Green
  [CELL_TYPES.MICE]: { r: 0, g: 102, b: 204 },    // Blue
  [CELL_TYPES.EAGLE]: { r: 204, g: 0, b: 0 },     // Red
  [CELL_TYPES.WALL]: { r: 100, g: 100, b: 100 }   // Grey
};

let sim; // Graphics buffer for the simulation
let renderedSim = [null, null];
let lastMessage = "";

//-------------------------------- Defining Global Variables ----------------------------------//

// Window dimensions
let fullWidth = window.innerWidth;
let fullHeight = window.innerHeight;

// Simulation dimensions (95% width, top 2/3 height)
let simWidth = fullWidth * 0.95;
let simHeight = fullHeight * 0.66;
let simX = (fullWidth - simWidth) / 2;  // Center horizontally
let simY = fullHeight * 0.02;           // Small top margin

// Graph dimensions (50% width, bottom 1/3 height)
let graphWidth = fullWidth * 0.5;
let graphHeight = fullHeight * 0.32;    // Bottom 1/3 minus margins
// let graphX = (fullWidth - graphWidth) / 2;  // Center horizontally
let graphX = fullWidth * 0.5; // Right end of graph should line up with the center of the screen? 
let graphY = simHeight + simY * 2;      // Position below simulation

let zoom = 200;                                          // Level of detail of simulation
let s = Math.floor(simWidth / zoom);                    // size of each cell
let play = true;
let speed = 6;                                         // speed of simulation
const minSpeed = 2;
const maxSpeed = 19;

// ----------------------------- Variables for input testing -----------------------------------//

let recoveryOn = true;
let spanRecoveryRate = 10; // Recover increments every X generations
let growthRecoveryRate = 10; // Recover increments every X generations
let spanRecovery = 1;
let growthRecovery = 5;
let spanDamage = 2;
let growthDamage = 20;

const lowSpan = 2;
const midSpan = 5;
const highSpan = 8;

const lowgrowth = 20;
const midGrowth = 50;
const highGrowth = 80;

//------------------------------ Defining User-input Variables ---------------------------------//

let wallSpan = 500;     // Walls lifespan

let grainSpan = midSpan;       // grain lifespan (in generation number)
let miceSpan = midSpan;        // mice lifespan (in generation number)
let eagleSpan = midSpan;      // eagle lifespan (in generation number)

let grainGrowth = midGrowth;     // Percent chance of grain growth given correct parameters
let miceGrowth = midGrowth;       // Percent chance of mice growth given correct parameters
let eagleGrowth = midGrowth;     // Percent chance of eagle growth given correct parameters

/* PRESETS

    strength - g m e -  g   m   e - intelligence
               
Weak Grain:    2 5 5 - 20  50  50
Stong Grain:   7 5 5 - 70  50  50

Weak Mice:     4 3 5 - 50  30  50
Strong Mice:   5 8 5 - 50  80  50

Weak Eagles:   5 5 3 - 50  50  30
Strong Eagles: 4 4 7 - 40  40  70

*/

//------------------------------ Color Variables --------------------------------//

// Legacy color variables (kept for backward compatibility)
let grainc, micec, eaglesc, wallsc;
let black, darkGrey, medGrey, lightGrey, lighterGrey;

let colorDebug = false;  // when on, press top left to cycle through color palates
let palateNumber = 7; // number of color palates

let cellPalate = 7;  // Color Palate selector, see below

/*
Cell Color Palate Presets:
asterisk indicates palate is ok for most colorblindness

0 == default RGB;
1 == pastel RGB;
2 == dark RGB;
3 == corrected triad - Red, Yellow, Blue;

4 == * adjusted triad - brown, blue, red;
5 == * vaguely representative of animals' actual color - yellow, grey, brown;
6 == * beige, blue, red;
7 == * kelp, sea urchin, otters - green, purple, brown

*/

//----------------------- Defining position and size of each section --------------------------//

// let simX = fullWidth * 0.01;                               // simulation position X
// let simY = fullHeight * 0.02;                               // simulation position Y
// let simWidth = fullWidth - 2 * simX;                        // width of simulation
// let simHeight = fullHeight * 0.65 - simY;                      // height of simulation

// let txtY = fullHeight - 50;                                // Required for graph height calculation

// let graphX = simX * 0.25;                                      // graph position X
// let graphY = simHeight + simY;                          // graph position Y
// let graphWidth = fullWidth * 0.48;                              // width of graph
// let graphHeight = fullHeight - simY * 2 - simHeight - (fullHeight - txtY);  // height of graph


//----------------------------- Graph Variables ---------------------------------//

let graincount = 0;                        // keeping track of how many of each type of cell
let micecount = 0;
let eaglescount = 0;

let grainBar;                            // declaring variables for the bars at left of the graph
let miceBar;
let eaglesBar;

let grainLine;                         // declaring variables for the lines in the graph
let miceLine;
let eaglesLine;

// Array to store positions of heat wave events in the graph
let heatWaveMarkers = [];

let graphMaxPoints = 100;
let graphDensity = Math.floor(graphWidth / graphMaxPoints);    // graph line density 
let barWidth = graphWidth / graphMaxPoints;                         // Define width of bars at left of graph

//------------------------------- Message Variables ---------------------------------------//

const rtAllDead = "Everything extinct! Press Reset to try a new scenario.";
const rtGrainDead = "Grain extinct! No food for the mice!";
const rtMiceDead = "Mice extinct! No food for the eagles!";
const rtEaglesDead = "Eagles extinct! With no one to eat the mice, will grain survive?";
const rtMiceEaglesDead = "Mice and eagles extinct! Grain rules the world!";
const rtTooLong = "Reached 1,000 generations, let's start over and see what happens.";

// Text and tab variables that are needed bc the some remnants still rely on them
let tabHeight = 50;
let txtMin = fullHeight - (tabHeight * 1.2);
let resetColor;
let slideText = false;
let timer = 0;

//---------------------------- Simulation State Variables --------------------------------//

let maxcells;        // Define starting # of cells with (surface area) / (cell area)
let rowSize;         // Define size of each row in simulation
let columnSize;      // Define size of each column in simulation

let neighbors = [0, 0, 0, 0, 0, 0, 0, 0];
let cellNeighbors = [0, 0, 0, 0, 0, 0, 0, 0];

let generationCount = 1;                                 // keeping track of generations
let wallDecayRate = 2;                                   // percent chance for wall to degrade if on edge
let paintType;

// Cell array
let cells = []; 