function graphMask() {
  rect(0, graphY, graphWidth, fullHeight - graphY - (fullHeight - txtY));
}

function graphCells() {
  // Define bars: species percentage of total cells 
  grainBar = 1 - norm(graincount, 0, maxcells);
  miceBar = 1 - norm(micecount, 0, maxcells);
  eaglesBar = 1 - norm(eaglescount, 0, maxcells);
  
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
  // Draw graph background
  push();
  clip(graphMask);
  fill(0);
  noStroke();
  rect(0, graphY, graphWidth, fullHeight - graphY - (fullHeight - txtY));
  
  // Draw graph border
  stroke(50);
  strokeWeight(1);
  noFill();
  rect(0, graphY, graphWidth, graphHeight);

  // Draw heat wave markers
  drawHeatWaveMarkers();
  
  // Draw graph lines
  drawGraphLines();
  
  
  // Draw population bars
  drawPopulationBars();
  pop();
}

function drawGraphLines() {
  // Draw the grid lines
  stroke(30);
  strokeWeight(1);
  
  // Horizontal grid lines
  for (let i = 1; i < 4; i++) {
    const yPos = graphY + i * (graphHeight / 4);
    line(0, yPos, graphWidth, yPos);
  }
  
  // Draw the graph lines using beginShape
  noFill();

  push();
  // TODO: fix this weird hack to get the lines to span the width of the graph
  translate(-2*barWidth,0);  // ensure our lines meet the bars at the right edge of the graph
  
  // Draw eagle line
  stroke(eaglesc);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < eaglesLine.length; i++) {
    if (eaglesLine[i] < 1) { // Only draw points if they're valid, as a % of 100
      vertex(graphWidth - (i * graphDensity) , graphY + (graphHeight * eaglesLine[i]));
    }
  }
  endShape();
  
  // Draw mice line
  stroke(micec);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < miceLine.length; i++) {
    if (miceLine[i] < 1) { // Only draw points if they're valid
      vertex(graphWidth - (i * graphDensity) , graphY + (graphHeight * miceLine[i]));
    }
  }
  endShape();
  
  // Draw grain line
  stroke(grainc);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < grainLine.length; i++) {
    if (grainLine[i] < 1) { // Only draw points if they're valid
      vertex(graphWidth - (i * graphDensity) , graphY + (graphHeight * grainLine[i]));
    }
  }
  endShape();

  pop();
}

function drawPopulationBars() {
  // Draw the bar chart area
  const barChartWidth = barWidth * 3;
  fill(20);
  stroke(40);
  rect(graphWidth - barChartWidth, graphY, barChartWidth, graphHeight);
  
  // Draw the bars
  noStroke();
  
  // Eagles bar
  if (eaglescount > 0) {
    fill(eaglesc);
    rect(graphWidth - barWidth, graphY + graphHeight, barWidth, -graphHeight * (1 - eaglesBar));
  }
  
  // Mice bar
  if (micecount > 0) {
    fill(micec);
    rect(graphWidth - 2 * barWidth, graphY + graphHeight, barWidth, -graphHeight * (1 - miceBar));
  }
  
  // Grain bar
  if (graincount > 0) {
    fill(grainc);
    rect(graphWidth - 3 * barWidth, graphY + graphHeight, barWidth, -graphHeight * (1 - grainBar));
  }
} 

function drawHeatWaveMarkers() {
  push();
  // stroke(255, 0, 0, 100);  // Semi-transparent red
  noStroke();
  fill(255, 0, 0, 80);
  strokeWeight(4);
  
  for (let i = 0; i < heatWaveMarkers.length; i++) {
    let x = graphWidth - heatWaveMarkers[i] * graphDensity;
    let barWidth = (((growthDamage / growthRecovery) * growthRecovery) * graphDensity);
    // line(x, graphY, x, graphY + graphHeight);
    rect(x, graphY, barWidth, graphY + graphHeight);

  }
  pop();
}

// Call this when a heat wave occurs
function markHeatWave() {
  // TODO: pushing at 2 is a hack because we shifted the bars or something ... fix
  heatWaveMarkers.push(2);  // Add marker at current position (right edge of graph)
} 