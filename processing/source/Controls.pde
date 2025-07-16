
void displayControls() {
  fill(0);
  stroke(0);
  rect(0, simHeight, fullWidth, fullHeight);


  stroke(darkGrey);
  noFill();

  //Draw border around Simulation
  strokeWeight(simBorderThickness);
  rect(simX, simY, simWidth-simX, simHeight-simY-2);
  strokeWeight(1);

  // Draw the background for controls
  // grain
  stroke(grainc);
  fill(grainc);
  rect(presetsX+1.05*presetsWidth/20+presetsWidth/60, controlsY+presetsWidth/200, presetsWidth/4-presetsWidth/100, controlsHeight*1.05, presetsWidth/90);


  // mice
  stroke(micec);
  fill(micec);
  rect(presetsX+7.15*presetsWidth/20+presetsWidth/90, controlsY+presetsWidth/200, presetsWidth/4-presetsWidth/100, controlsHeight*1.05, presetsWidth/90);

  // eagles
  stroke(eaglesc);
  fill(eaglesc);
  rect(presetsX+13.15*presetsWidth/20+presetsWidth/90, controlsY+presetsWidth/200, presetsWidth/4-presetsWidth/100, controlsHeight*1.05, presetsWidth/90);



  // color debug mode, draw cycle button and print text
  if (colorDebug) {
    fill(0);
    rectMode(CORNER);
    rect(60, 0, 400, simY-6);
    fill(medGrey);
    textFont(normalFont);
    textAlign(LEFT);
    text("COLOR DEBUG MODE: CURRENT PALATE: "+cellPalate+" ", 60, 12);

    fill(255);
    rectMode(CORNER);
    rect(0, 0, 50, 50);
  }




  // Text for Grain
  fill(0); 
  textAlign(CENTER);  
  textFont(largeFont);
  text("GRAIN", presetsX+presetsWidth/20+presetsWidth/8, controlsY+36);



  float grainStrBarX = controlsX+controlsWidth*0.08;
  float grainStrBarY = controlsY+2.5*controlsHeight*0.08;


  // grain data values
  textAlign(CENTER);
  textFont(boldFont);

  fill(0);
  stroke(0);

  rect(grainStrBarX, grainStrBarY, adjustorBarWidth, adjustorBarHeight, adjustorRoundRadius);
  rect(grainIntBarX, grainIntBarY, adjustorBarWidth, adjustorBarHeight, adjustorRoundRadius);

  colorMode(HSB, 255);
  color grainSlider = color(hue(grainc), saturation(grainc), 50);
  fill(grainSlider);
  rect(grainStrBarX+2, grainStrBarY+2, (adjustorBarWidth-adjustorRoundRadius)*(grains*0.1), adjustorBarHeight-4, adjustorRoundRadius);
  rect(grainIntBarX+2, grainIntBarY+2, (adjustorBarWidth-adjustorRoundRadius-2)*(grainsi*0.01), adjustorBarHeight-4, adjustorRoundRadius);
  colorMode(RGB, 255);


  fill(lightGrey);
  text("—      LIFESPAN      +", grainStrBarX+adjustorBarWidth*0.5, grainStrBarY+adjustorBarHeight*0.5);
  text("—       FITNESS       +", grainIntBarX+adjustorBarWidth*0.5, grainIntBarY+adjustorBarHeight*0.5);


  // Text for Mice
  fill(0);
  textAlign(CENTER);  
  textFont(largeFont);
  text("MICE", presetsX+7*presetsWidth/20+presetsWidth/8, controlsY+36);

  // mice data values
  textAlign(CENTER); 
  textFont(boldFont);


  fill(0);

  rect(miceIntBarX, miceIntBarY, adjustorBarWidth, adjustorBarHeight, adjustorRoundRadius);
  rect(miceStrBarX, miceStrBarY, adjustorBarWidth, adjustorBarHeight, adjustorRoundRadius);


  colorMode(HSB, 255);
  color miceSlider = color(hue(micec), saturation(micec), 50);
  fill(miceSlider);
  rect(miceStrBarX+2, miceStrBarY+2, (adjustorBarWidth-adjustorRoundRadius)*(mices*0.1), adjustorBarHeight-4, adjustorRoundRadius);
  rect(miceIntBarX+2, miceIntBarY+2, (adjustorBarWidth-adjustorRoundRadius-2)*(micei*0.01), adjustorBarHeight-4, adjustorRoundRadius);
  colorMode(RGB, 255);



  fill(lightGrey);
  text("—      LIFESPAN      +", miceStrBarX+adjustorBarWidth*0.5, eaglesStrBarY+adjustorBarHeight*0.5);
  text("—       FITNESS       +", miceIntBarX+adjustorBarWidth*0.5, eaglesIntBarY+adjustorBarHeight*0.5);



  // Text for Eagles
  fill(0);
  textAlign(CENTER);  
  textFont(largeFont);
  text("EAGLES", presetsX+13*presetsWidth/20+presetsWidth/8, controlsY+36);


  // eagles data values
  textAlign(CENTER); 
  textFont(boldFont);

  fill(0);

  rect(eaglesIntBarX, eaglesIntBarY, adjustorBarWidth, adjustorBarHeight, adjustorRoundRadius);
  rect(eaglesStrBarX, eaglesStrBarY, adjustorBarWidth, adjustorBarHeight, adjustorRoundRadius);

  colorMode(HSB, 255);
  color eaglesSlider = color(hue(eaglesc), saturation(eaglesc), 50);
  fill(eaglesSlider);
  rect(eaglesStrBarX+2, eaglesStrBarY+2, (adjustorBarWidth-adjustorRoundRadius)*(eagless*0.1), adjustorBarHeight-4, adjustorRoundRadius);
  rect(eaglesIntBarX+2, eaglesIntBarY+2, (adjustorBarWidth-adjustorRoundRadius-2)*(eaglesi*0.01), adjustorBarHeight-4, adjustorRoundRadius);
  colorMode(RGB, 255);



  fill(lightGrey);
  text("—      LIFESPAN      +", eaglesStrBarX+adjustorBarWidth*0.5, eaglesStrBarY+adjustorBarHeight*0.5);
  text("—       FITNESS       +", eaglesIntBarX+adjustorBarWidth*0.5, eaglesIntBarY+adjustorBarHeight*0.5);


  // draw generation count
  fill(0);
  stroke(0);
  rect(0, simHeight+1, graphWidth, 20);
  textFont(boldFont);
  fill(lightGrey);
  textAlign(LEFT);
  text("Generation:", simX, simHeight+lineHeight+3);
  textAlign(CENTER); 
  text(generationCount, simX+150, simHeight+lineHeight+3);



  //-------------------------------------------sim Control Buttons -----------------------------------------------//



  fill(0);
  rectMode(CORNER);
  rect(simControlsX, simControlsY, simControlsWidth, simControlsHeight);

  //draw pause and next
  if (step == 0) { 
    //play
    fill(medGrey);
    rect(simControlsX+simControlsButtonRoundRad*1.5+simControlsButtonSpacer+simControlsButtonSize, paintButtonY, simControlsButtonSize, simControlsButtonSize, simControlsButtonRoundRad);

    fill(0);
    triangle(simControlsX+simControlsButtonRoundRad*1.5+simControlsButtonSpacer+simControlsButtonSize+buttonPadding, paintButtonY+buttonPadding, simControlsX+simControlsButtonRoundRad*1.5+simControlsButtonSpacer+simControlsButtonSize+buttonPadding, paintButtonY+simControlsButtonSize-buttonPadding, simControlsX+simControlsButtonRoundRad*1.5+simControlsButtonSpacer+simControlsButtonSize+simControlsButtonSize-buttonPadding, paintButtonY+simControlsButtonSize*0.5);

    //next
    fill(medGrey);
    rect(simControlsX+simControlsButtonRoundRad*2.5+2*simControlsButtonSpacer+2*simControlsButtonSize, paintButtonY, simControlsButtonSize, simControlsButtonSize, simControlsButtonRoundRad);
    fill(0);
    triangle(simControlsX+simControlsButtonRoundRad*2.5+2*simControlsButtonSpacer+2*simControlsButtonSize+buttonPadding, paintButtonY+buttonPadding, simControlsX+simControlsButtonRoundRad*2.5+2*simControlsButtonSpacer+2*simControlsButtonSize+buttonPadding, paintButtonY+simControlsButtonSize-buttonPadding, simControlsX+simControlsButtonRoundRad*2.5+2*simControlsButtonSpacer+3*simControlsButtonSize-2*buttonPadding, paintButtonY+simControlsButtonSize*0.5);
    rect(simControlsX+simControlsButtonRoundRad*2.5+2*simControlsButtonSpacer+3*simControlsButtonSize-2*buttonPadding, paintButtonY+buttonPadding, buttonPadding, simControlsButtonSize-buttonPadding*2);
  }
  else { 

    //pause
    fill(medGrey);
    rect(simControlsX+simControlsButtonRoundRad*1.5+simControlsButtonSpacer+simControlsButtonSize, paintButtonY, simControlsButtonSize, simControlsButtonSize, simControlsButtonRoundRad);

    rectMode(CORNER);
    fill(0);
    rect(simControlsX+simControlsButtonRoundRad*1.5+simControlsButtonSpacer+simControlsButtonSize+1.2*buttonPadding, paintButtonY+buttonPadding, buttonPadding*1.5, simControlsButtonSize-buttonPadding*2);
    rect(simControlsX+simControlsButtonRoundRad*1.5+simControlsButtonSpacer+2*simControlsButtonSize-2.8*buttonPadding, paintButtonY+buttonPadding, buttonPadding*1.5, simControlsButtonSize-buttonPadding*2);
  }

  // Restart button


  fill(medGrey);

  rect(simControlsX+simControlsButtonRoundRad*0.5, paintButtonY, simControlsButtonSize, simControlsButtonSize, simControlsButtonRoundRad);
  fill(0);

  rect(simControlsX+simControlsButtonRoundRad*0.5+buttonPadding, paintButtonY+buttonPadding, buttonPadding, simControlsButtonSize-buttonPadding*2);
  triangle(simControlsX+simControlsButtonRoundRad*0.5+simControlsButtonSize-buttonPadding, paintButtonY+buttonPadding, simControlsX+simControlsButtonRoundRad*0.5+simControlsButtonSize-buttonPadding, paintButtonY+simControlsButtonSize-buttonPadding, simControlsX+simControlsButtonRoundRad*0.5+simControlsButtonSize*0.5+buttonPadding*0.5, paintButtonY+simControlsButtonSize*0.5);
  triangle(simControlsX+simControlsButtonRoundRad*0.5+simControlsButtonSize*0.5+buttonPadding*0.5, paintButtonY+buttonPadding, simControlsX+simControlsButtonRoundRad*0.5+simControlsButtonSize*0.5+buttonPadding*0.5, paintButtonY+simControlsButtonSize-buttonPadding, simControlsX+simControlsButtonRoundRad*0.5+buttonPadding*2, paintButtonY+simControlsButtonSize*0.5);


  // Zoom Button
  
  fill(medGrey);
  rect(zoomButtonX, zoomButtonY, simControlsButtonSize, simControlsButtonSize, simControlsButtonRoundRad);
  stroke(0);
  strokeWeight(2);

  ellipse(zoomButtonX+simControlsButtonSize*0.35, zoomButtonY+simControlsButtonSize*0.35, presetsHeight*0.25, presetsHeight*0.25);
  strokeWeight(4);
  line(zoomButtonX+simControlsButtonSize*0.52, zoomButtonY+simControlsButtonSize*0.52, zoomButtonX+simControlsButtonSize*0.8, zoomButtonY+simControlsButtonSize*0.8);



  // Reset All Button

  if(millis()-clickTimer > timeOut){
    stroke(abs(sin(map(millis()%resetBlinkRate, 0, resetBlinkRate, PI, TWO_PI)))*255, green(resetColor), blue(resetColor));
  }else{
    stroke(resetColor);
  }
  fill(0);
  rect(resetButtonX+2, resetButtonY+2, simControlsButtonSize*3-4, simControlsButtonSize-4, simControlsButtonRoundRad);

  fill(lightGrey);
  textFont(boldFont);
  textAlign(CENTER);
  text("RESET", resetButtonX+simControlsButtonSize*1.5, resetButtonY+simControlsButtonSize*0.5+lineHeight*0.4);

  strokeWeight(1);



  // Paint Button

  fill(paintType);
  stroke(paintType);
  rect(paintButtonX, paintButtonY, simControlsButtonSize, simControlsButtonSize, simControlsButtonRoundRad);


  stroke(0);
  fill(0);

  pushMatrix();
  translate(paintButtonX+buttonPadding, paintButtonY+buttonPadding);
  rotate(radians(-45));

  beginShape();
  vertex(0.0, 0.0);
  bezierVertex(-5.0, 9.0, -7.0, 20.0, 0.0, 18.0);
  bezierVertex(9.0, 16.0, 0.0, 2.0, 1.0, 0.0);
  endShape();

  strokeWeight(4);
  line(0, 20, 0, 35);
  strokeWeight(1);

  stroke(paintType);
  rect(-3, 18, 7, 4);
  popMatrix();

  // Help button
  fill(medGrey);
  noStroke();
  ellipse(presetsX, presetsY-presetsHeight, simControlsButtonSize*1.75, simControlsButtonSize*1.75);
  fill(0);
  textSize(50);
  textAlign(CENTER);
  text("?", presetsX, presetsY-presetsHeight+15);
  

  // Speed Slider
  if (showSpeedSlider) {

    stroke(medGrey);
    strokeWeight(2);
    line(speedSliderX, speedSliderY, speedSliderX+speedSliderLength, speedSliderY);
    strokeWeight(1);

    stroke(0);
    fill(medGrey);

    pushMatrix();                                                                           
    translate(speedSliderX+speedSliderLength+15, speedSliderY);    // Move to the right of slider

    beginShape();                                                                           // Draw a Rabbit
    vertex(0.82420397, 1.8119812E-6);
    bezierVertex(0.82420397, 1.8119812E-6, 13.136917, 1.6245503, 10.674376, 7.310469);
    bezierVertex(10.674376, 10.5595665, -6.5634265, 8.122745, -6.5634265, 8.122745);
    bezierVertex(-6.5634265, 8.122745, -9.025967, 5.6859207, -2.2539759, 5.6859207);
    bezierVertex(4.5180187, 5.6859207, 0.82420397, 1.8119812E-6, 0.82420397, 1.8119812E-6);
    endShape();

    beginShape();
    vertex(-4.128003, -8.690459);
    bezierVertex(-4.128003, -8.690459, -4.128003, -3.0532093, -4.128003, -3.0532093);
    bezierVertex(-4.128003, -3.0532093, -12.840002, 5.0, -4.128003, 5.0);
    bezierVertex(4.5839972, 5.0, -0.1680026, 1.778717, -0.96000147, 0.16807365);
    bezierVertex(-1.7520032, -1.4425678, 2.9999986, -9.495779, 2.9999986, -9.495779);
    bezierVertex(2.9999986, -9.495779, 0.62399817, -15.938352, -1.7520032, -4.6638517);
    bezierVertex(-4.128003, 6.6106424, 1.415998, -24.796875, -4.128003, -7.8851366);
    endShape();

    beginShape();
    vertex(13.392265, -1.2769183);
    bezierVertex(13.392265, -1.2769183, 15.8232, 3.0, 10.961332, 3.0);
    bezierVertex(6.099466, 3.0, 7.5580254, -4.2707615, 12.90608, -1.2769183);
    endShape();

    popMatrix();


    pushMatrix();                                                                           
    translate(speedSliderX-25, speedSliderY);    // Move to the Left of slider

    beginShape();
    vertex(5.333335, 1.0);
    bezierVertex(5.333335, 1.0, 11.999998, 3.2249637, 11.999998, 3.2249637);
    bezierVertex(11.999998, 3.2249637, 4.0000014, 7.674888, 4.0000014, 2.4833093);
    endShape();

    beginShape();
    vertex(-8.0, 0.0);
    bezierVertex(-8.0, 0.0, 11.0, 1.0, 11.0, 1.0);
    bezierVertex(11.0, 1.0, 10.0, -13.0, -7.0, 1.0);
    endShape();

    beginShape();
    vertex(7.0, 0.0);
    bezierVertex(7.0, 0.0, 18.0, -8.0, 17.0, -1.0);
    bezierVertex(16.0, 6.0, 7.0, 0.0, 7.0, 0.0);
    endShape();

    beginShape();
    vertex(-7.0, 1.7461991);
    bezierVertex(-7.0, 1.7461991, 1.9132557, 1.0, 1.9132557, 1.0);
    bezierVertex(3.0274124, 5.477195, -7.0, 9.208191, -4.771686, 1.7461991);
    endShape();


    popMatrix();

    triangle(speedSliderArrow, speedSliderY-1, speedSliderArrow-speedSliderArrowSize*0.5, speedSliderY-1-((sqrt(3)/2)*speedSliderArrowSize), speedSliderArrow+speedSliderArrowSize*0.5, speedSliderY-1-((sqrt(3)/2)*speedSliderArrowSize));
  }
}



//---------------------------------------------------------//



void displayPresets() {
  
  
  rectMode(CORNER);
  
  //draw preset background
  fill(medGrey, 150);
  noStroke();
  rect(presetsX, presetsY, presetsWidth+100, presetsHeight, 10);
  fill(lightGrey);

  //write preset text
  textMode(MODEL);
  textAlign(CENTER);
  textFont(largeFont, 16);
  pushMatrix();
  translate(presetsX+20, presetsY+presetsHeight*0.5);  // Translate to the center
  rotate(-HALF_PI);
  text("PRESETS", 0, 0);
  popMatrix();
  
  //weak grain
  stroke(grainc);
  strokeWeight(2);
  if (grains < 4 && grainsi < 40) { 
    fill(darkGrey);
  } 
  else { 
    fill(0);
  }                                                                      //if lifespan and fitness above/below threshhold, highlight preset button
  rect(presetsX+1.15*presetsWidth/20, presetsY, presetsWidth/3.7, presetsHeight/2.2, presetsWidth/120);
  //strong grain
  if (grains > 6 && grainsi > 60) { 
    fill(darkGrey);
  } 
  else { 
    fill(0);
  }                                                                      //if lifespan and fitness above/below threshhold, highlight preset button
  rect(presetsX+1.15*presetsWidth/20, presetsY+presetsHeight-presetsHeight/2.2, presetsWidth/3.7, presetsHeight/2.2, presetsWidth/120);

  //weak mice
  stroke(micec);
  if (mices < 4 && micei < 40) { 
    fill(darkGrey);
  } 
  else { 
    fill(0);
  }                                                                      //if lifespan and fitness above/below threshhold, highlight preset button
  rect(presetsX+7.1*presetsWidth/20, presetsY, presetsWidth/3.7, presetsHeight/2.2, presetsWidth/120);
  //strong mice
  if (mices > 6 && micei > 60) { 
    fill(darkGrey);
  } 
  else { 
    fill(0);
  }                                                                      //if lifespan and fitness above/below threshhold, highlight preset button
  rect(presetsX+7.1*presetsWidth/20, presetsY+presetsHeight-presetsHeight/2.2, presetsWidth/3.7, presetsHeight/2.2, presetsWidth/120);

  //weak eagles
  stroke(eaglesc);
  if (eagless < 4 && eaglesi < 40) { 
    fill(darkGrey);
  } 
  else { 
    fill(0);
  }                                                                      //if lifespan and fitness above/below threshhold, highlight preset button
  rect(presetsX+13.12*presetsWidth/20, presetsY, presetsWidth/3.7, presetsHeight/2.2, presetsWidth/120);
  //strong eagles
  if (eagless > 6 && eaglesi > 60) { 
    fill(darkGrey);
  } 
  else { 
    fill(0);
  }                                                                      //if lifespan and fitness above/below threshhold, highlight preset button
  rect(presetsX+13.12*presetsWidth/20, presetsY+presetsHeight-presetsHeight/2.2, presetsWidth/3.7, presetsHeight/2.2, presetsWidth/120);



  textAlign(CENTER); 
  textFont(boldFont);
  fill(lightGrey);
  text("WEAK GRAIN", presetsX+1.15*presetsWidth/20+presetsWidth/7.4, presetsY+0.5*presetsHeight/9+presetsHeight/6+4);
  text("STRONG GRAIN", presetsX+1.15*presetsWidth/20+presetsWidth/7.4, presetsY+5.5*presetsHeight/9+presetsHeight/6+4);

  text("WEAK MICE", presetsX+7.1*presetsWidth/20+presetsWidth/7.4, presetsY+0.5*presetsHeight/9+presetsHeight/6+4);
  text("STRONG MICE", presetsX+7.1*presetsWidth/20+presetsWidth/7.4, presetsY+5.5*presetsHeight/9+presetsHeight/6+4);

  text("WEAK EAGLES", presetsX+13.12*presetsWidth/20+presetsWidth/7.4, presetsY+0.5*presetsHeight/9+presetsHeight/6+4);
  text("STRONG EAGLES", presetsX+13.12*presetsWidth/20+presetsWidth/7.4, presetsY+5.5*presetsHeight/9+presetsHeight/6+4);


  strokeWeight(1);
}


void showHelp(){
  if(showHelp){
    image(helpGraphic[0], 0, 0);
    image(helpGraphic[1], fullWidth*0.5, 0);
    image(helpGraphic[2], 0, fullHeight*0.5);
    image(helpGraphic[3], fullWidth*0.5, fullHeight*0.5);
  }
}
