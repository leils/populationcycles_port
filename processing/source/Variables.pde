
// Set up the Array list holding each and every cell object, define fonts

PFont boldFont, normalFont, medFont,largeFont;
PGraphics sim;
PImage[] renderedSim = new PImage[2];
PImage[] helpGraphic = new PImage[4];


//-------------------------------- Defining Global Variables ----------------------------------//

//int fullWidth = 1440;                                      // Width of entire window
//int fullHeight = 900;                                      // Height of entire window

int fullWidth = 1680;                                    // Width of entire window
int fullHeight = 1050;                                   // Height of entire window

int zoom = 200;                                            // Level of detail of simulation, dictates size of cells, larger number fits more cels in simulation

int cellShape = 0;                                         // 0 == circular cells; 1 == square cells;
int s = int(fullWidth/zoom);                               // size of each cell
int step = 1;                                              // 0 == manual step; 1 == auto step;
int speed = 6;                                             // speed of simulation; higher numbers are slower - default to 6
int minSpeed = 10;
int maxSpeed = 2;



//------------------------------ Defining User-input Variables ---------------------------------//

int wallss = 500;     // Walls lifespan

int grains = 5;       // grain lifespan (in generation number)
int mices = 5;        // mice lifespan (in generation number)
int eagless = 5;      // eagle lifespan (in generation number)

int grainsi = 50;     // Percent chance of grain growth given correct parameters
int micei = 50;       // Percent chance of mice growth given correct parameters
int eaglesi = 50;     // Percent chance of eagle growth given correct parameters

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


color grainc = color(102, 150, 0);    // Grain Color
color micec = color(0, 102, 204);     // Mice Color
color eaglesc = color(204, 0, 0);     // Eagle Color

color wallsc = color(100);

color black = color(0);
color darkGrey = color(50);
color medGrey = color(70); 
color lightGrey = color(100); 
color lighterGrey = color(150);

boolean colorDebug = false;  // when on, press top left to cycle through color palates
int palateNumber = 7; // number of color palates

int cellPalate = 7;  // Color Palate selector, see below

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


float simX = fullWidth*0.01;                               // simulation position X
float simY = fullHeight*0.02;                               // simulation position Y
float simWidth = fullWidth-2*simX;                        // width of simulation
float simHeight = fullHeight*0.65-simY;                      // height of simulation

float txtX = simX;                                      // text position X
//float txtY = simHeight+simY+fullHeight*0.05+simY;            // text position Y
float txtY = fullHeight-50;
float txtWidth = fullWidth*0.48-2*simX;                      // width of text field
float txtHeight = fullHeight*0.23;                           // height of text field

float graphX = simX*0.25;                                      // graph position X
float graphY = simHeight+simY;                          // graph position Y
float graphWidth = fullWidth*0.48;                              // width of graph
float graphHeight = fullHeight-simY*2-simHeight-(fullHeight-txtY);                       // height of graph

float controlsX = fullWidth*0.5+2*simX;                  // controls position X
float controlsY = simHeight+5*simY;                              // controls position Y
float controlsWidth = fullWidth*0.47;                        // width of controls
float controlsHeight = fullHeight*0.24;             // height of controls

float presetsX = controlsX;                      // controls position X
float presetsY = controlsY+controlsHeight-fullHeight*0.075-0.5*simY;                 // controls position Y
float presetsWidth = controlsWidth;                      // width of controls
float presetsHeight = fullHeight*0.08;                      // height of controls


float reactextX = fullWidth-5*simX;  // reaction text position X
float reactextY = controlsY-0.8*simY;                        // reaction text Y



int tabHeight = 50;                                                // Height of each Tab for text
int tabRoundRadius = 8;                                           // How rounded Tab corners are
int tabSpacer = 10;                                                // distance between Tabs
int txtRoundRadius = 15;                                           // How rounded Text box corners are
int simBorderThickness = 4;                                        // Thickness of border around simulation

int simControlsButtonSize = int(fullHeight*0.04);
int simControlsButtonRoundRad = 7;
int simControlsButtonSpacer = 5;
int buttonPadding = 5;

float simControlsX = controlsX+presetsWidth*0.05+simControlsButtonSize*3+simControlsButtonRoundRad+simControlsButtonSpacer;
float simControlsY = simHeight+simY;
float simControlsWidth = controlsWidth-simControlsButtonSize*3-simControlsButtonRoundRad;
float simControlsHeight = presetsHeight*0.5;


float resetButtonX = simControlsX-simControlsButtonSize*3-simControlsButtonRoundRad*0.5-simControlsButtonSpacer;
float resetButtonY = simControlsY+simControlsButtonRoundRad*0.5;

float speedSliderX = simControlsX+simControlsButtonRoundRad*3.5+3*simControlsButtonSpacer+3*simControlsButtonSize+30;
float speedSliderY = simControlsY+simControlsHeight*0.5;
float speedSliderLength = controlsWidth*0.3;
float speedSliderArrow = speedSliderX+speed*(speedSliderLength/minSpeed);
int speedSliderArrowSize = 15;


float paintButtonX = simControlsX+simControlsButtonSize*5+speedSliderLength+simControlsButtonSpacer*7;
float paintButtonY = simControlsY+simControlsButtonRoundRad*0.5;

float zoomButtonX = simControlsX+simControlsButtonSize*6+speedSliderLength+simControlsButtonSpacer*9;
float zoomButtonY = simControlsY+simControlsButtonRoundRad*0.5;




int adjustorBarWidth = int(presetsWidth*0.22);
int adjustorBarHeight = 40;
int adjustorRoundRadius = 3;

float grainIntBarX = controlsX+controlsWidth*0.08;
float grainIntBarY = controlsY+2.5*controlsHeight*0.165;
float grainStrBarX = controlsX+controlsWidth*0.08;
float grainStrBarY = controlsY+2.5*controlsHeight*0.08;

float miceIntBarX = controlsX+controlsWidth*0.38;
float miceIntBarY = controlsY+2.5*controlsHeight*0.165;
float miceStrBarX = controlsX+controlsWidth*0.38;
float miceStrBarY = controlsY+2.5*controlsHeight*0.08;

float eaglesIntBarX = controlsX+controlsWidth*0.68;
float eaglesIntBarY = controlsY+2.5*controlsHeight*0.165;
float eaglesStrBarX = controlsX+controlsWidth*0.68;
float eaglesStrBarY = controlsY+2.5*controlsHeight*0.08;


//----------------------------- Defining Cell Graph Variables ---------------------------------//


int graincount = 0;                        // keeping track of how many of each type of cell
int micecount = 0;
int eaglescount = 0;

float grainBar;                            // declaring variables for the bars at left of the graph
float miceBar;
float eaglesBar;

float grainLine[];                         // declaring variables for the lines in the graph
float miceLine[];
float eaglesLine[];

int graphDensity = int(graphWidth/100);    // graph line density 


//------------------------------- Defining Text Variables ---------------------------------------//
  

String rtAllDead = "Everything extinct!";                                                     //reaction text for everything extinct

String rtGrainDead = "Grain extinct! No food for the mice!";                    //reaction text for grain extinct
String rtMiceDead = "Mice extinct! No food for the eagles!";         //reaction text for mice extinct
String rtEaglesDead = "Eagles extinct! With no one to eat the mice, will grain survive?";     //reaction text for eagles extinct

String rtMiceEaglesDead = "Mice and eagles extinct! Grain rules the world!";              //reaction text for mice and eagles extinct

String rtTooLong = "Reached 1,000 generations, let's start over and see what happens.";                   //reaction text for when the simulation has been running for too many generations

String tab1 = "TRY THIS";                                                                        //Labels for tabs
String tab2 = "WHAT'S GOING ON?";
String tab3 = "REAL-WORLD STORY";

PImage[] txt = new PImage[3];                                                           //Files for tabs

int tabNum = 0;                                                          //link to text file for default text to be displayed

int clickTimer = millis();                            // text slide count
String textState = "down";                           // text state
int slideTime = 1000;
float txtMax = simHeight+simY*2+fullHeight*0.07;
float txtMin = fullHeight-(tabHeight*1.2);
int txtTimeOut = 60000;

//---------------------------- Defining miscellaneous Variables --------------------------------//

int maxcells = floor(((simWidth-simX)/s)*((simHeight-simY)/s));        // Define starting # of cells with (surface area) / (cell area)
float barWidth = graphWidth/100;                         // Define width of bars at left of graph

int rowSize = floor((simWidth-simX)/s);                    // Define size of each row in simulation
int columnSize = floor((simHeight-simY)/s);                // Define size of each column in simulation

int[] neighbors = new int[8];
int[] cellNeighbors = new int[8];                                  // get 8 neighbors for each cell

int grainCount;
int miceCount;
int eaglesCount;

int lineHeight = 14;                                     // Text Line Height
int txtMargin = 5;                                       // Text Margin
int generationCount = 1;                                 // keeping track of generations
int timer = millis();                            // restart countdown

int wallDecayRate = 2;                                   // percent chance for wall to degrade if on edge
color paintType = grainc;
Boolean showSpeedSlider = true;
Boolean slideText = false;

color resetColor = color(100, 0, 0);
int resetBlinkRate = 3000;
int timeOut = 120000;

Boolean showHelp = false;

int[][] cells = new int[maxcells][4];
