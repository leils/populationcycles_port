function seedSimulation() {
  console.log("seeding... Inserting a maximum of " + maxcells + " cells.");

  for (let i = 1; i < maxcells + 1; i++) {                                // Add cells to Array
    let st = 0;
    let intel = 0;
    let cellType = CELL_TYPES.EMPTY;                                       // Default to empty cell

    let r = simP5 ? simP5.random(1) : Math.random();
    if (r < 0.25) { 
      cellType = CELL_TYPES.EAGLE; 
      st = eagleSpan; 
      intel = eagleGrowth;

      eaglescount++;

    }                                                                       // 25% chance for eagles
    else if (r < 0.50) { 
      cellType = CELL_TYPES.MICE; 
      st = miceSpan; 
      intel = miceGrowth;

      micecount++;

    }                                                                       // 25% chance for mice (50% - the 25% for eagles)
    else if (r < 0.75) { 
      cellType = CELL_TYPES.GRAIN; 
      st = grainSpan; 
      intel = grainGrowth;

      graincount++;

    }                                                                     // 25% chance for grainSpan (75% - the 50% for mice)


    cells[i-1][0] = i-1;
    cells[i-1][1] = st;
    cells[i-1][2] = cellType;  // Store type instead of color
    cells[i-1][3] = intel;                            // adds the new cell
  }
}


function displaySimulation() {                                         // display the buffer image of the simulation
  if (simP5 && sim) {
    simP5.image(renderedSim[0], 0, 0, renderedSim[0].width, renderedSim[0].height);
    simP5.image(renderedSim[1], renderedSim[0].width, 0, renderedSim[1].width, renderedSim[1].height);
  }
}

function heatWave() {
  if (graincount > 0) {
    markHeatWave();
    // Apply Weak Grain preset
    if (recoveryOn) {
      grainSpan -= spanDamage;
      grainGrowth -= growthDamage;
    } else {
      grainSpan = 2; //reduce grain lifespan
      miceSpan = 5;
      eagleSpan = 5;
      grainGrowth = 20; // reduce grain growth chance
      miceGrowth = 50;
      eagleGrowth = 50;
    }

    updateText("A heat wave strikes; grain has a harder time growing.");
  } else {
    updateText("No grain");
  }
}

function handleEventCadence() {
  console.log("regularHeatWaves: ", regularHeatWaves, " lastHeatWave: ", lastHeatWave, " heatWaveGap: ", heatWaveGap );
  if (regularHeatWaves && (generationCount - lastHeatWave >= heatWaveGap)) {
    heatWave();
    lastHeatWave = generationCount;
  }

}

function runRecovery() {
  // Species slowly return to "normal" over time 
  if (generationCount % spanRecoveryRate == 0) {
    if (grainSpan != midSpan) {
      let increment = grainSpan > midSpan ? -spanRecovery : spanRecovery;
      grainSpan += increment;
    }

    if (miceSpan != midSpan) {
      let increment = miceSpan > midSpan ? -spanRecovery : spanRecovery;
      miceSpan += increment;
    }

    if (eagleSpan != midSpan) {
      let increment = eagleSpan > midSpan ? -spanRecovery : spanRecovery;
      eagleSpan += increment;
    }
  }

  if (generationCount % growthRecoveryRate == 0) {
    if (grainGrowth != midGrowth) {
      let increment = grainGrowth > midGrowth ? -growthRecovery : growthRecovery;
      grainGrowth += increment;
    }

    if (miceGrowth != midGrowth) {
      let increment = miceGrowth > midGrowth ? -growthRecovery : growthRecovery;
      miceGrowth += increment;
    }

    if (eagleGrowth != midGrowth) {
      let increment = eagleGrowth > midGrowth ? -growthRecovery : growthRecovery;
      eagleGrowth += increment;
    }
  }

  // updateSpeciesFitnessSliders();
}

// function updateSpeciesFitnessSliders() {
//   const miceSlider = document.getElementById('mice-slider');
//   const grainSlider = document.getElementById('grain-slider');
//   const eagleSlider = document.getElementById('eagle-slider');

//   grainSlider.value = grainSpan;
//   miceSlider.value = miceSpan;
//   eagleSlider.value = eagleSpan;
// }


function runSimulation() {
  graincount = 0;                                                        // keeping track of cell counts
  micecount = 0;
  eaglescount = 0;

  // Create array with indices 0 to maxcells-1
  let indices = Array.from(Array(maxcells).keys());

  // Fisher-Yates shuffle
  // http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    let j = Math.floor((simP5 ? simP5.random(0, i + 1) : Math.random() * (i + 1)));
    [indices[i], indices[j]] = [indices[j], indices[i]]; // Swap elements
  }

  sim.push();                                                          // save current drawing state
  sim.fill(0);
  sim.noStroke();
  sim.rect(0, 0, sim.width, sim.height);

  for (let i = maxcells - 1; i >= 0; i--) {
    if (!dead(cells[indices[i]][0])) {
      if (cells[indices[i]][2] === CELL_TYPES.GRAIN) { 
        graincount++; 
      }
      else if (cells[indices[i]][2] === CELL_TYPES.MICE) { 
        micecount++; 
      }
      else if (cells[indices[i]][2] === CELL_TYPES.EAGLE) { 
        eaglescount++; 
      }             // update cell count                                                  

      run(cells[indices[i]][0]);                                      // call cell behavior (please refer to cell_class for specifics)
    }

    render(cells[indices[i]][0]);                                     // add cell to buffer image
    cells[indices[i]][1]--;                                           // reduce cell strength (cell grows older and closer to death)
  }

  sim.pop();                                                          // restore previous drawing state

  renderedSim[0] = sim.get(0, 0, Math.floor(simWidth / 2), sim.height);
  renderedSim[1] = sim.get(Math.floor(simWidth / 2), 0, Math.floor(simWidth / 2), sim.height);

  handleEventCadence();

  if (recoveryOn) {
    runRecovery();
  }

  generationCount++;                                                   // increase generation count
}


function findNeighbors(cellID) {                                      // function for finding neighbor cells in cell list
  // check positions 0-7, 0 being directly to the left, moving clockwise
  if (cellID - rowSize <= 1 || cellID + rowSize >= maxcells - 1) {
    neighbors[0] = cellWrap(cellID - 1);                              // position 0 - west
    neighbors[1] = cellWrap(cellID - 1 - rowSize);                    // position 1 - northwest
    neighbors[2] = cellWrap(cellID - rowSize);                        // position 2 - north
    neighbors[3] = cellWrap(cellID + 1 - rowSize);                    // position 3 - northeast
    neighbors[4] = cellWrap(cellID + 1);                              // position 4 - east  
    neighbors[5] = cellWrap(cellID + 1 + rowSize);                    // position 5 - southeast
    neighbors[6] = cellWrap(cellID + rowSize);                        // position 6 - south
    neighbors[7] = cellWrap(cellID - 1 + rowSize);                    // position 7 - southwest
  } else {
    neighbors[0] = (cellID - 1);                                      // position 0 - west
    neighbors[1] = (cellID - 1 - rowSize);                            // position 1 - northwest
    neighbors[2] = (cellID - rowSize);                                // position 2 - north
    neighbors[3] = (cellID + 1 - rowSize);                            // position 3 - northeast
    neighbors[4] = (cellID + 1);                                      // position 4 - east  
    neighbors[5] = (cellID + 1 + rowSize);                            // position 5 - southeast
    neighbors[6] = (cellID + rowSize);                                // position 6 - south
    neighbors[7] = (cellID - 1 + rowSize);                            // position 7 - southwest
  }

  return neighbors;                                                   // return array with neighbor cell positions
}


function cellWrap(neighborID) {                                       // function for cells positioned at edges of rows, and screen
  if (neighborID % rowSize == 1) {                                    // if current cell is last in the row
    neighborID += rowSize;                                            // return neighbor cell as first of next row
  }
  if (neighborID > maxcells - 1) {                                    // if current cell is last cell in array
    neighborID -= maxcells;                                           // return neighbor cell as first cell in array
  }

  if (neighborID % rowSize == 0) {                                    // if current cell is first in the row
    neighborID -= rowSize;                                            // return neighbor cell as last in the previous row
  }
  if (neighborID < 0) {                                               // if current cell is first cell in array      
    neighborID += maxcells;                                           // return neighbor cell as last cell in array
  }
  return neighborID;                                                  // return ID of neighbor cell
} 