

void setup()
{

  frameRate(30);
  background(0);
  size(1680, 1050);
  smooth();
 //noCursor();
  
  globalSetupOperations();
  
  displayText();
  displayControls();
  
  seedSimulation();
  runSimulation();
  graphCells();

  
}

//---------------------------------------------------------//


void draw() {
  if(step == 1 && frameCount % speed == 0){        // Draw simulation and graph if unpaused, update only every frame divisible by speed variable (if speed is 2, it updates every other frame, if it is 5, every fifth, etc)
   
    runSimulation();
    graphCells();
    timer = millis();
  }
  clearScreen();
  
  displaySimulation();
  displayControls();
  displayGraph();
  displayPresets();
  
  reactionText();
  displayText();
  showHelp();

  println("FPS: "+int(frameRate)+" — Generation: "+generationCount+" - Total Cells: "+maxcells+" with "+graincount+" grain, "+micecount+" mice, and "+eaglescount+" eagles     cell size: "+s+" speed: "+speed+" zoom: "+zoom);

}




//---------------------------------------------------------//



void globalSetupOperations(){
  
  
  s = int(fullWidth/zoom); 

  rowSize = floor((simWidth-simX)/s);                    // Define size of each row in simulation
  columnSize = floor((simHeight-simY)/s);                // Define size of each column in simulation
  maxcells = floor(rowSize*columnSize);

  showHelp = false;
  
  generationCount = 0;                                                    // Set Generation to 0

  cells = new int[maxcells][4];                                              // Creating empty array for cells
  for(int i = 0; i< helpGraphic.length; i++){
    helpGraphic[i] = loadImage("help"+(i+1)+".png");
  }
  sim = createGraphics(int(simWidth), int(simHeight), JAVA2D);
  sim.beginDraw();
    sim.fill(0);
    sim.rect(0, 0, sim.width, sim.height);
  sim.endDraw();
  
  renderedSim[0] = sim.get(0, 0, int(simWidth/2), sim.height);
  renderedSim[1] = sim.get(int(simWidth/2), 0, int(simWidth/2), sim.height);
  
 for(int i = 0; i < txt.length; i++){
   txt[i] = loadImage("text/tab"+(i+1)+".png");
 }
  txtY = txtMin;
  
  boldFont = loadFont("boldfont.vlw");            // load the fonts we're using
  normalFont = loadFont("normalfont.vlw");
  medFont = loadFont("Explo-Black-18.vlw");
  largeFont = loadFont("largefont.vlw");
  
  
 float graphLineArrayLength = (graphWidth)/graphDensity;
  
  grainLine = new float[int(graphLineArrayLength)];                       // Creating Arrays for graph data lines
  miceLine = new float[int(graphLineArrayLength)];
  eaglesLine = new float[int(graphLineArrayLength)];
  
  for (int i = 0; i < grainLine.length; i++) {                            // filling Arrays for graph data lines
    
    grainLine[i] = graphY+graphHeight-2;
    miceLine[i] = graphY+graphHeight-2;
    eaglesLine[i] = graphY+graphHeight-2;
    
  }
  graphHeight = fullHeight-simY*2-simHeight-(fullHeight-txtY);
  
  // Set color based on palate choice
  switch(cellPalate){
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
     grainc = color(191,189,164);      // Grain Color
     micec = color(1,93,111);          // Mice Color
     eaglesc = color(162, 42, 18);       // Eagle Color
     wallsc = color(60);
     paintType = grainc;
    break;
     
    case 7:
     grainc = color(232,216, 124);      // Grain Color
     micec = color(200);          // Mice Color
     eaglesc = color(1,93,111);       // Eagle Color 
     wallsc = color(150);
     paintType = grainc;
    break;
     
  }

  
  
}


void clearScreen() {
  fill(0);
  noStroke();
  rect(0, 0, width, height);
}
