//---------------------------------------------------------//



void graphCells(){

   
  
    
   //define bars at left
//  grainBar = map(graincount, 0, maxcells, graphY+graphHeight-2, graphY+5);
//  miceBar = map(micecount, 0, maxcells, graphY+graphHeight-2, graphY+5);
//  eaglesBar = map(eaglescount, 0, maxcells, graphY+graphHeight-2, graphY+5);

  grainBar = 1-norm(graincount, 0, maxcells);
  miceBar = 1-norm(micecount, 0, maxcells);
  eaglesBar = 1-norm(eaglescount, 0, maxcells);
  

  
  // Slide everything down in the arrays
  for (int i = grainLine.length-1; i > 0; i--) {
    
    grainLine[i] = grainLine[i-1];
    miceLine[i] = miceLine[i-1];  
    eaglesLine[i] = eaglesLine[i-1]; 
  }
  
  // Add new count values
  grainLine[int(graphX+1)] = grainBar;
  miceLine[int(graphX+1)] = miceBar;
  eaglesLine[int(graphX+1)] = eaglesBar;

}


void displayGraph(){
  
  // draw out the graph area 
  stroke(0);
  fill(0);
  rectMode(CORNERS);
  rect(0, graphY, graphWidth, fullHeight);


  // draw lines on the graph
  strokeWeight(1);
  
  int ni = int(graphWidth+3*graphX);
  
  for (int i = 0; i < grainLine.length-1; i++) {
    if(graphY+graphHeight*grainLine[i] < graphY+graphHeight && graphY+graphHeight*grainLine[i+1] < graphY+graphHeight){      // makes sure it's not at 0
      stroke(grainc);
      line(ni, graphY+graphHeight*grainLine[i], ni-graphDensity, graphY+graphHeight*grainLine[i+1]);                               // draws line between points
    }
    if(graphY+graphHeight*miceLine[i] < graphY+graphHeight && graphY+graphHeight*miceLine[i+1] < graphY+graphHeight){
      stroke(micec);
      line(ni, graphY+graphHeight*miceLine[i], ni-graphDensity, graphY+graphHeight*miceLine[i+1]);
    }
    if(graphY+graphHeight*eaglesLine[i] < graphY+graphHeight && graphY+graphHeight*eaglesLine[i+1] < graphY+graphHeight){
      stroke(eaglesc);
      line(ni, graphY+graphHeight*eaglesLine[i], ni-graphDensity, graphY+graphHeight*eaglesLine[i+1]);
    }
    

      ni = ni-graphDensity;

  }
  strokeWeight(2);

  rectMode(CORNERS);
  
  //draw eagles bar
  if(eaglescount > 0){
    stroke(eaglesc);
    fill(eaglesc);
    rect(graphWidth-2*barWidth-1, graphY+graphHeight, graphWidth-3*barWidth, graphY+graphHeight*eaglesBar);
  }
  
  //draw mice bar
  if(micecount > 0){
    stroke(micec);
    fill(micec);
    rect(graphWidth-barWidth-1, graphY+graphHeight, graphWidth-2*barWidth, graphY+graphHeight*miceBar);
  }
  
  //draw grain bar
  if(graincount > 0){
    stroke(grainc);
    fill(grainc);
    rect(graphWidth-1, graphY+graphHeight, graphWidth-barWidth, graphY+graphHeight*grainBar);
  }
 
  strokeWeight(1);
  
  
}
