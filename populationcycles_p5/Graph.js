function graphCells() {
  // Define bars at left
  grainBar = 1 - norm(graincount, 0, maxcells);
  miceBar = 1 - norm(micecount, 0, maxcells);
  eaglesBar = 1 - norm(eaglescount, 0, maxcells);
  
  // Slide everything down in the arrays
  for (let i = grainLine.length - 1; i > 0; i--) {
    grainLine[i] = grainLine[i-1];
    miceLine[i] = miceLine[i-1];  
    eaglesLine[i] = eaglesLine[i-1]; 
  }
  
  // Add new count values
  grainLine[Math.floor(graphX + 1)] = grainBar;
  miceLine[Math.floor(graphX + 1)] = miceBar;
  eaglesLine[Math.floor(graphX + 1)] = eaglesBar;
}

function displayGraph() {
  // Draw graph background
  fill(0);
  noStroke();
  rect(0, graphY, graphWidth, fullHeight - graphY - (fullHeight - txtY));
  
  // Draw graph border
  stroke(50);
  strokeWeight(1);
  noFill();
  rect(0, graphY, graphWidth, graphHeight);
  
  // Draw graph lines
  drawGraphLines();
  
  // Draw population bars
  drawPopulationBars();
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
  
  // Draw eagle line
  stroke(eaglesc);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < eaglesLine.length; i++) {
    if (eaglesLine[i] < 1) { // Only draw points if they're valid
      vertex(graphWidth - i * graphDensity, graphY + graphHeight * eaglesLine[i]);
    }
  }
  endShape();
  
  // Draw mice line
  stroke(micec);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < miceLine.length; i++) {
    if (miceLine[i] < 1) { // Only draw points if they're valid
      vertex(graphWidth - i * graphDensity, graphY + graphHeight * miceLine[i]);
    }
  }
  endShape();
  
  // Draw grain line
  stroke(grainc);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < grainLine.length; i++) {
    if (grainLine[i] < 1) { // Only draw points if they're valid
      vertex(graphWidth - i * graphDensity, graphY + graphHeight * grainLine[i]);
    }
  }
  endShape();
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