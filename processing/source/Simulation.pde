void seedSimulation()
{
  println("seeding... Inserting a maximum of "+maxcells+" cells.");

 
  for (int i = 1; i < maxcells+1; i++)                                       // Add cells to ArrayList
  {
    int st = 0;
    int intel = 0;
    int c = color(0);                                                       // 25% chance for empty cell

    float r = random(1);
    if (r < 0.25) { 
      c = eaglesc; 
      st = eagless; 
      intel = eaglesi;
      
      eaglescount++;
        
    }                                                                       // 25% chance for eagles
    else if (r < 0.50) { 
      c = micec; 
      st = mices; 
      intel = micei;
      
      micecount++;
      
    }                                                                       // 25% chance for mice (50% - the 25% for eagles)
    else if (r < 0.75) { 
      c = grainc; 
      st = grains; 
      intel = grainsi;
      
      graincount++;
      
    }                                                                     // 25% chance for grains (75% - the 50% for mice)


    cells[i-1][0] = i-1;
    cells[i-1][1] = st;
    cells[i-1][2] = c;
    cells[i-1][3] = intel;                            // adds the new cell
    
  }
  
 

}


void displaySimulation(){                                                  // display the buffer image of the simulation
  image(renderedSim[0], simX, simY, renderedSim[0].width, renderedSim[0].height);
  image(renderedSim[1], simX+renderedSim[0].width, simY, renderedSim[1].width, renderedSim[1].height);
}


//---------------------------------------------------------//


void runSimulation(){

 graincount = 0;                                                          // keeping track of cell counts
 micecount = 0;
 eaglescount = 0;
 

  
    
    int[] indices = new int[maxcells];                                  // iterate through cell list in random order (urn) so as to prevent patterns in cell spread rate
      // Generate a list of random indices
      // http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
      // inside-out algorithm
      for (int i = 1; i < indices.length; i++)
      {
        int j = int(random(0, i+1));
        indices[i] = indices[j];
        indices[j] = i;
      }
      
    
    sim.beginDraw();                                                    // start drawing buffer image
      sim.fill(0);
      sim.noStroke();
      sim.rect(0, 0, sim.width, sim.height);


      for (int i = maxcells-1; i >= 0; i--) {
        
        if(!dead(cells[indices[i]][0])) {
        
            if(cells[indices[i]][2] == grainc){ graincount++; }
            else if(cells[indices[i]][2] == micec){ micecount++; }
            else if(cells[indices[i]][2] == eaglesc){ eaglescount++; }             // update cell count                                                  
      
       
              run(cells[indices[i]][0]);                                               // call cell behavior (please refer to cell_class for specifics
         }
         render(cells[indices[i]][0]);                                                 // add cell to buffer image
         cells[indices[i]][1]--;                                               // reduce cell strength (cell grows older and closer to death)
      
      }
    sim.endDraw();
    
  renderedSim[0] = sim.get(0, 0, int(simWidth/2), sim.height);
  renderedSim[1] = sim.get(int(simWidth/2), 0, int(simWidth/2), sim.height);
  
  
  generationCount++;                                                   // increase generation count
   
}



// ------------------------------------------------------------------------//




 int[] findNeighbors(int cellID) {                                      // function for finding neighbor cells in cell list

                                                                        // check positions 0-7, 0 being directly to the left, moving clockwise
    if(cellID-rowSize <= 1 || cellID+rowSize >= maxcells-1){
              neighbors[0] = cellWrap(cellID - 1);                                // position 0 - west
              neighbors[1] = cellWrap(cellID-1-rowSize);                          // position 1 - northwest
              neighbors[2] = cellWrap(cellID-rowSize);                            // position 2 - north
              neighbors[3] = cellWrap(cellID+1-rowSize);                          // position 3 - norteast
              neighbors[4] = cellWrap(cellID+1);                                  // position 4 - east  
              neighbors[5] = cellWrap(cellID+1+rowSize);                          // position 5 - southeast
              neighbors[6] = cellWrap(cellID+rowSize);                            // position 6 - south
              neighbors[7] = cellWrap(cellID-1+rowSize);                          // position 7 - southwest
    }else{                                                    
              neighbors[0] = (cellID - 1);                                // position 0 - west
              neighbors[1] = (cellID-1-rowSize);                          // position 1 - northwest
              neighbors[2] = (cellID-rowSize);                            // position 2 - north
              neighbors[3] = (cellID+1-rowSize);                          // position 3 - norteast
              neighbors[4] = (cellID+1);                                  // position 4 - east  
              neighbors[5] = (cellID+1+rowSize);                          // position 5 - southeast
              neighbors[6] = (cellID+rowSize);                            // position 6 - south
              neighbors[7] = (cellID-1+rowSize);                          // position 7 - southwest
    }

    return neighbors;                                                   // return array with neighbor cell positions
  }



//-------------------------------------------------------------------------------------//


int cellWrap(int neighborID){                                        // function for cells positioned at edges of rows, and screen
    
    if (neighborID % rowSize == 1) {                                 // if current cell is last in the row
      neighborID += rowSize;                                         // return neighbor cell as first of next row
    } 
    if (neighborID > maxcells-1) {                                   // if current cell is last cell in array
      neighborID -= maxcells;                                        // return neighbor cell as first cell in array
    } 

    if (neighborID % rowSize == 0) {                                 // if current cell is first in the row
      neighborID -= rowSize;                                         // return neighbor cell as last in the previous row
    } 
    if (neighborID < 0) {                                            // if current cell is first cell in array      
      neighborID += maxcells;                                        // return neighbor cell as last cell in array
    }
    return neighborID;                                               // return ID of neighbor cell
}
