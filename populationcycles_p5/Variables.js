// Font variables
let boldFont, normalFont, medFont, largeFont;
let sim;
let renderedSim = [null, null];
// let helpGraphic = [null, null, null, null];

//-------------------------------- Defining Global Variables ----------------------------------//

let fullWidth = 1680;                                    // Width of entire window
let fullHeight = 1050;                                   // Height of entire window

let zoom = 200;                                          // Level of detail of simulation, dictates size of cells, larger number fits more cels in simulation

// let cellShape = 0;                                       // 0 == circular cells; 1 == square cells;
let s = Math.floor(fullWidth / zoom);                   // size of each cell
let step = 1;                                           // 0 == manual step; 1 == auto step;
let speed = 10;                                        // speed of simulation; higher numbers are slower - default to 10
let minSpeed = 1;
let maxSpeed = 60;

//------------------------------ Defining User-input Variables ---------------------------------//

let wallss = 500;     // Walls lifespan

let grains = 5;       // grain lifespan (in generation number)
let mices = 5;        // mice lifespan (in generation number)
let eagless = 5;      // eagle lifespan (in generation number)

let grainsi = 50;     // Percent chance of grain growth given correct parameters
let micei = 50;       // Percent chance of mice growth given correct parameters
let eaglesi = 50;     // Percent chance of eagle growth given correct parameters

/* PRESETS

    strength - g m e -  g   m   e - intelligence
               
Weak Grain:    2 5 5 - 20  50  50
Stong Grain:   7 5 5 - 70  50  50

Weak Mice:     4 3 5 - 50  30  50
Strong Mice:   5 8 5 - 50  80  50

Weak Eagles:   5 5 3 - 50  50  30
Strong Eagles: 4 4 7 - 40  40  70

*/

//------------------------------ Defining Color Name Variables --------------------------------//

let grainc;
let micec; 
let eaglesc;
let wallsc;

let black;
let darkGrey;
let medGrey;
let lightGrey; 
let lighterGrey;

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

let simX = fullWidth * 0.01;                               // simulation position X
let simY = fullHeight * 0.02;                               // simulation position Y
let simWidth = fullWidth - 2 * simX;                        // width of simulation
let simHeight = fullHeight * 0.65 - simY;                      // height of simulation

let txtY = fullHeight - 50;                                // Required for graph height calculation

let graphX = simX * 0.25;                                      // graph position X
let graphY = simHeight + simY;                          // graph position Y
let graphWidth = fullWidth * 0.48;                              // width of graph
let graphHeight = fullHeight - simY * 2 - simHeight - (fullHeight - txtY);  // height of graph

// UI Control positions - no longer needed with HTML controls
// let controlsX = fullWidth * 0.5 + 2 * simX;
// let controlsY = simHeight + 5 * simY;
// let controlsWidth = fullWidth * 0.47;
// let controlsHeight = fullHeight * 0.24;

// let presetsX = controlsX;
// let presetsY = controlsY + controlsHeight - fullHeight * 0.075 - 0.5 * simY;
// let presetsWidth = controlsWidth;
// let presetsHeight = fullHeight * 0.08;

// let reactextX = fullWidth - 5 * simX;
// let reactextY = controlsY - 0.8 * simY;

// let tabRoundRadius = 8;
// let tabSpacer = 10;
// let txtRoundRadius = 15;
// let simBorderThickness = 4;

// let simControlsButtonSize = Math.floor(fullHeight * 0.04);
// let simControlsButtonRoundRad = 7;
// let simControlsButtonSpacer = 5;
// let buttonPadding = 5;

// let simControlsX = controlsX + presetsWidth * 0.05 + simControlsButtonSize * 3 + simControlsButtonRoundRad + simControlsButtonSpacer;
// let simControlsY = simHeight + simY;
// let simControlsWidth = controlsWidth - simControlsButtonSize * 3 - simControlsButtonRoundRad;
// let simControlsHeight = presetsHeight * 0.5;

// let resetButtonX = simControlsX - simControlsButtonSize * 3 - simControlsButtonRoundRad * 0.5 - simControlsButtonSpacer;
// let resetButtonY = simControlsY + simControlsButtonRoundRad * 0.5;

// let speedSliderX = simControlsX + simControlsButtonRoundRad * 3.5 + 3 * simControlsButtonSpacer + 3 * simControlsButtonSize + 30;
// let speedSliderY = simControlsY + simControlsHeight * 0.5;
// let speedSliderLength = controlsWidth * 0.3;
// let speedSliderArrow = speedSliderX + speed * (speedSliderLength / minSpeed);
// let speedSliderArrowSize = 15;

// let paintButtonX = simControlsX + simControlsButtonSize * 5 + speedSliderLength + simControlsButtonSpacer * 7;
// let paintButtonY = simControlsY + simControlsButtonRoundRad * 0.5;

// let zoomButtonX = simControlsX + simControlsButtonSize * 6 + speedSliderLength + simControlsButtonSpacer * 9;
// let zoomButtonY = simControlsY + simControlsButtonRoundRad * 0.5;

// let adjustorBarWidth = Math.floor(presetsWidth * 0.22);
// let adjustorBarHeight = 40;
// let adjustorRoundRadius = 3;

// Species panel positions - no longer needed with HTML controls
// let grainIntBarX = controlsX + controlsWidth * 0.08;
// let grainIntBarY = controlsY + 2.5 * controlsHeight * 0.165;
// let grainStrBarX = controlsX + controlsWidth * 0.08;
// let grainStrBarY = controlsY + 2.5 * controlsHeight * 0.08;

// let miceIntBarX = controlsX + controlsWidth * 0.38;
// let miceIntBarY = controlsY + 2.5 * controlsHeight * 0.165;
// let miceStrBarX = controlsX + controlsWidth * 0.38;
// let miceStrBarY = controlsY + 2.5 * controlsHeight * 0.08;

// let eaglesIntBarX = controlsX + controlsWidth * 0.68;
// let eaglesIntBarY = controlsY + 2.5 * controlsHeight * 0.165;
// let eaglesStrBarX = controlsX + controlsWidth * 0.68;
// let eaglesStrBarY = controlsY + 2.5 * controlsHeight * 0.08;

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

let graphDensity = Math.floor(graphWidth / 100);    // graph line density 
let barWidth = graphWidth / 100;                         // Define width of bars at left of graph

//------------------------------- Message Variables ---------------------------------------//

let rtAllDead = "Everything extinct!";
let rtGrainDead = "Grain extinct! No food for the mice!";
let rtMiceDead = "Mice extinct! No food for the eagles!";
let rtEaglesDead = "Eagles extinct! With no one to eat the mice, will grain survive?";
let rtMiceEaglesDead = "Mice and eagles extinct! Grain rules the world!";
let rtTooLong = "Reached 1,000 generations, let's start over and see what happens.";

// Text and tab variables that are needed bc the some remnants still rely on them
let tabHeight = 50;
let txtMin = fullHeight - (tabHeight * 1.2);
let resetColor;
let slideText = false;
let timer = 0;

// Text and tab variables - no longer needed with HTML controls
// let tab1 = "TRY THIS";
// let tab2 = "WHAT'S GOING ON?";
// let tab3 = "REAL-WORLD STORY";
// let tabNum = 0;
// let clickTimer = 0;
// let textState = "down";
// let slideTime = 1000;
// let txtMax = simHeight + simY * 2 + fullHeight * 0.07;
// let txtTimeOut = 60000;
// let timeOut = 10000;
// let resetBlinkRate = 2000;
// let lineHeight = 14;
// let txtMargin = 5;

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