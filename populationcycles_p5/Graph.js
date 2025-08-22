function graphMask() {
  if (graphP5) {
    return () => graphP5.rect(0, 0, graphWidth, graphHeight);
  }
  return () => {};
}

function graphCells() {

  // Define bars: species percentage of total cells 
  // grainBar = 1 - (graphP5.norm(graincount, 0, maxcells));
  // miceBar = 1 - (graphP5.norm(micecount, 0, maxcells));
  // eaglesBar = 1 - (graphP5.norm(eaglescount, 0, maxcells));

  grainBar = 1 - (graincount / maxcells);
  miceBar = 1 - (micecount / maxcells);
  eaglesBar = 1 - (eaglescount / maxcells);
  
  // Slide everything down in the arrays
  for (let i = grainLine.length - 1; i > 0; i--) {
    grainLine[i] = grainLine[i-1];
    miceLine[i] = miceLine[i-1];  
    eaglesLine[i] = eaglesLine[i-1]; 
  }
  
  // TODO: i'm pretty sure I need to rewrite these bars to index from 0 and just count up ... somewhat like the heat wave markers 
  // I think this is counting weirdly because of ... processing? limitations?? 
  // Add new count values
  grainLine[0] = grainBar;
  miceLine[0] = miceBar;
  eaglesLine[0] = eaglesBar;

  // Shift heat wave markers with the graph
  for (let i = 0; i < heatWaveMarkers.length; i++) {
    heatWaveMarkers[i]++;
    // Remove markers that have moved off the graph
    // Each position represents graphDensity pixels, so we remove markers
    // when they've moved graphWidth/graphDensity positions (same as grainLine.length)
    // if (heatWaveMarkers[i] * graphDensity >= graphWidth) {
    //   heatWaveMarkers.splice(i, 1);
    //   i--;
    // }
  }
}

function displayGraph() {
  if (!graphP5) return;
  
  // Draw graph background
  graphP5.push();
  graphP5.clip(() => graphMask());
  graphP5.fill(0);
  graphP5.noStroke();
  graphP5.rect(0, 0, graphWidth, graphHeight);
  
  // Draw graph border
  graphP5.stroke(50);
  graphP5.strokeWeight(1);
  graphP5.noFill();
  graphP5.rect(0, 0, graphWidth, graphHeight);

  // Draw heat wave markers
  drawHeatWaveMarkers();
  
  // Draw graph lines
  drawGraphLines();
  
  
  // Draw population bars
  drawPopulationBars();
  graphP5.pop();
}

function drawGraphLines() {
  if (!graphP5) return;
  
  // Draw the grid lines
  graphP5.stroke(30);
  graphP5.strokeWeight(1);
  
  // Horizontal grid lines
  for (let i = 1; i < 4; i++) {
    const yPos = i * (graphHeight / 4);
    graphP5.line(0, yPos, graphWidth, yPos);
  }
  
  // Draw the graph lines using beginShape
  graphP5.noFill();

  graphP5.push();
  // TODO: fix this weird hack to get the lines to span the width of the graph
  graphP5.translate(-2*barWidth,0);  // ensure our lines meet the bars at the right edge of the graph
  
  // Draw eagle line
  const eagleColor = cellColors[CELL_TYPES.EAGLE];
  graphP5.stroke(eagleColor.r, eagleColor.g, eagleColor.b);
  graphP5.strokeWeight(2);
  graphP5.beginShape();
  for (let i = 0; i < eaglesLine.length; i++) {
    if (eaglesLine[i] < 1) { // Only draw points if they're valid, as a % of 100
      graphP5.vertex(graphWidth - (i * graphDensity) , (graphHeight * eaglesLine[i]));
    }
  }
  graphP5.endShape();
  
  // Draw mice line
  const miceColor = cellColors[CELL_TYPES.MICE];
  graphP5.stroke(miceColor.r, miceColor.g, miceColor.b);
  graphP5.strokeWeight(2);
  graphP5.beginShape();
  for (let i = 0; i < miceLine.length; i++) {
    if (miceLine[i] < 1) { // Only draw points if they're valid
      graphP5.vertex(graphWidth - (i * graphDensity) , (graphHeight * miceLine[i]));
    }
  }
  graphP5.endShape();
  
  // Draw grain line
  const grainColor = cellColors[CELL_TYPES.GRAIN];
  graphP5.stroke(grainColor.r, grainColor.g, grainColor.b);
  graphP5.strokeWeight(2);
  graphP5.beginShape();
  for (let i = 0; i < grainLine.length; i++) {
    if (grainLine[i] < 1) { // Only draw points if they're valid
      graphP5.vertex(graphWidth - (i * graphDensity) , (graphHeight * grainLine[i]));
    }
  }
  graphP5.endShape();

  graphP5.pop();
}

function drawPopulationBars() {
  if (!graphP5) return;
  
  // Draw the bar chart area
  const barChartWidth = barWidth * 3;
  graphP5.fill(20);
  graphP5.stroke(40);
  graphP5.rect(graphWidth - barChartWidth, 0, barChartWidth, graphHeight);
  
  // Draw the bars
  graphP5.noStroke();
  
  // Eagles bar
  if (eaglescount > 0) {
    const eagleColor = cellColors[CELL_TYPES.EAGLE];
    graphP5.fill(eagleColor.r, eagleColor.g, eagleColor.b);
    graphP5.rect(graphWidth - barWidth, graphHeight, barWidth, -graphHeight * (1 - eaglesBar));
  }
  
  // Mice bar
  if (micecount > 0) {
    const miceColor = cellColors[CELL_TYPES.MICE];
    graphP5.fill(miceColor.r, miceColor.g, miceColor.b);
    graphP5.rect(graphWidth - 2 * barWidth, graphHeight, barWidth, -graphHeight * (1 - miceBar));
  }
  
  // Grain bar
  if (graincount > 0) {
    const grainColor = cellColors[CELL_TYPES.GRAIN];
    graphP5.fill(grainColor.r, grainColor.g, grainColor.b);
    graphP5.rect(graphWidth - 3 * barWidth, graphHeight, barWidth, -graphHeight * (1 - grainBar));
  }
} 

function drawHeatWaveMarkers() {
  if (!graphP5) return;
  
  graphP5.push();
  // graphP5.stroke(255, 0, 0, 100);  // Semi-transparent red
  graphP5.noStroke();
  graphP5.fill(255, 0, 0, 80);
  graphP5.strokeWeight(4);
  
  for (let i = 0; i < heatWaveMarkers.length; i++) {
    let x = graphWidth - heatWaveMarkers[i] * graphDensity;
    let barWidth = (((growthDamage / growthRecovery) * growthRecovery) * graphDensity);
    // graphP5.line(x, 0, x, graphHeight);
    graphP5.rect(x, 0, barWidth, graphHeight);

  }
  graphP5.pop();
}

// Call this when a heat wave occurs
function markHeatWave() {
  // TODO: pushing at 2 is a hack because we shifted the bars or something ... fix
  heatWaveMarkers.push(2);  // Add marker at current position (right edge of graph)
} 