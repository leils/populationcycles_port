/*

Cell array:

cell[i][0] == Cell ID
cell[i][1] == Cell Lifespan
cell[i][2] == Cell Type (color)
cell[i][3] == Cell Fitness

*/


//-----------------------------------------------------------------------------//


function run(id) {
  
  /*
  
  Rules of cell growth (runs each generation):

   - For each cell, check 8 neighbors individually
   
   - For each neighbor:
     - If conditions are favorable for growth (empty cell for grain, grain for mice, mice for eagles), check against fitness
     - If fitness check succeeds, grow into neighbor cell
   
   - cell stays alive based on its lifespan, then dies, leaving empty cell
  
  */
      
  cellNeighbors = findNeighbors(id);                                  // get 8 neighbors for each cell
      
  for (let i = 0; i < 8; i++) {                                       // for each neighbor cell
    
    if (cells[id][2] === wallsc) {                                    // if current cell is a wall
    
      if (cells[cellNeighbors[i]][1] === 0) {                         // and neighbor is wall
        if (random(1000) < wallDecayRate * 5) {                       // set chance to decay very low
          cells[id][1] = 0;                                           // if succeeds, decay
        }
      } else if (cells[cellNeighbors[i]][2] !== wallsc) {             // but if neighbor is not a wall
        if (random(1000) < wallDecayRate / 2) {                       // set chance to decay high
          cells[id][1] = 0;                                           // if succeeds, decay
        }
      }
      /* 
         this is structured this way to keep walls intact so they do not decay in the middle.
         In other words, walls decay from the outside, in
      */
      
    } else if (canEat(cells[id][2], cells[cellNeighbors[i]][2], cells[cellNeighbors[i]][1])) {    // if current cell can eat the neighbor cell
      if (random(200) < cells[id][3]) {                                                           // check against current cell fitness
        setType(cells[cellNeighbors[i]][0], cells[id][2]);                                        // if check succeeds, spread current cell
      }
    }
  }
}


//-----------------------------------------------------------------------------//

function canEat(cellType, eatType, eatStr) {
  // function to determine whether a neighbor cell can be eaten

  if (cellType === eaglesc) {
    // if current cell is an eagle
    if (eatType === micec && eatStr > 0) {                            // if potential meal is both a mouse, and alive
      return true;                                                    // return a true value (potential meal can be eaten)
    } else {
      return false;                                                   // if meal is anything but an alive mouse
    }                                                                 // return a false value (potential meal cannot be eaten)
    
  } else if (cellType === micec) {
    // if current cell is a mouse
    if (eatType === grainc && eatStr > 0) {                           // if potential meal is both grain, and alive
      return true;                                                    // return a true value (potential meal can be eaten)
    } else {
      return false;                                                   // if meal is anything but alive grain
    }                                                                 // return a false value (potential meal cannot be eaten)
    
  } else if (cellType === grainc) {
    // if current cell is grain
    if (eatStr < 1) {                                                 // if there is room to grow (if neighbor cell is empty)
      /* it should be noted that there are no actual empty cells,
         it is really checking if neighbor cell is dead,
         since dead cells display as black, or empty
      */
      return true;                                                    // return a true value (grain can spread)
    } else {
      return false;                                                   // if neighbor cell is occupied
    }                                                                 // return a false value (grain cannot spread)
    
  } else {
    return false;                                                     // returns false if neighbor cell is a wall, or unspecified
  }
}


//-----------------------------------------------------------------------------//

function setType(id, newType) {                                       // if neighbor cell can be eaten,
                                                                      // this is the function to convert the consumed neighbor cell
  if (newType === grainc) {
    cells[id][2] = grainc;
    cells[id][1] = grains;
    cells[id][3] = grainsi;
  }
  else if (newType === micec) {
    cells[id][2] = micec;
    cells[id][1] = mices;
    cells[id][3] = micei;
  }
  else if (newType === eaglesc) {
    cells[id][2] = eaglesc;
    cells[id][1] = eagless;
    cells[id][3] = eaglesi;
  }
  else if (newType === wallsc) {
    cells[id][2] = newType;
    cells[id][1] = wallss;
  }
}


//-----------------------------------------------------------------------------//


function render(id) {                                                 // draw the actual dots to represent lifeforms in each cell
  if (!dead(cells[id][0])) {                                          // if it's not dead
    sim.fill(cells[id][2]);                                           // make it the correct color
    sim.stroke(cells[id][2]);
    
    if (cellShape === 0) {                                            // then draw a circle if cellShape is set to 0
      sim.ellipse(0.8 * s + (cells[id][0] % rowSize) * s, 
                  0.5 * s + Math.floor(cells[id][0] / rowSize) * s, 
                  s, s);
    }
    else if (cellShape === 1) {                                       // or draw a square if cellShape is set to 1
      let x = Math.floor(0.5 * s + (cells[id][0] % rowSize) * s);
      let y = Math.floor(0.3 * s + Math.floor(cells[id][0] / rowSize) * s);
      
      sim.set(x, y, cells[id][2]);
      sim.set(x + 1, y, cells[id][2]);
      sim.set(x, y + 1, cells[id][2]);
      sim.set(x + 1, y + 1, cells[id][2]);
      sim.set(x, y + 2, cells[id][2]);
      sim.set(x + 1, y + 2, cells[id][2]);
      sim.set(x + 2, y + 2, cells[id][2]);
      sim.set(x + 2, y + 1, cells[id][2]);
      sim.set(x + 2, y, cells[id][2]);
    }
  }
}


//-----------------------------------------------------------------------------//

function dead(id) {                                                   // check to see if cell is alive or not
  if (cells[id][1] < 1) {                                             // if lifespan is less than 1
    return true;                                                      // cell is dead
  } 
  else {                                                              // if lifespan is 1 or more
    return false;                                                     // cell is alive
  }
}

function paintCells(paintedCellID) {
  fill(paintType);
  stroke(paintType);
  
  let paintedCells = findNeighbors(paintedCellID);
  let paintedNeighbors;
  
  if (frameCount % 3 === 0) {
    sim.push();
  }
  
  for (let i = 0; i < 8; i++) {
    setType(cells[paintedCells[i]][0], paintType);
    
    if (frameCount % 3 === 0) {
      render(cells[paintedCells[i]][0]);
    }
    
    if (zoom > 300) {
      paintedNeighbors = findNeighbors(paintedCells[i]);
      for (let j = 0; j < 8; j++) {
        setType(cells[paintedNeighbors[j]][0], paintType);
        if (frameCount % 3 === 0) {
          render(cells[paintedNeighbors[j]][0]);
        }
      }
    }
  }
  
  setType(cells[paintedCellID][0], paintType);
  
  if (frameCount % 3 === 0) {
    render(cells[paintedCellID][0]);
    sim.updatePixels();
    renderedSim[0] = sim.get(0, 0, Math.floor(simWidth/2), sim.height);
    renderedSim[1] = sim.get(Math.floor(simWidth/2), 0, Math.floor(simWidth/2), sim.height);
    sim.pop();
  }
  
  if (txtY <= txtMax) { 
    slideText = true;
    clickTimer = millis();
  }
  
  showHelp = false;
} 