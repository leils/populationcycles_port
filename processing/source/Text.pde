

void displayText() {
  stroke(100);


if(txtY <= txtMax && millis()-clickTimer > txtTimeOut){
  slideText = true;
  clickTimer = millis();
}


if(slideText){
    txtY = map((millis()-clickTimer), 0, slideTime, txtMax, txtMin);
  
    graphHeight = fullHeight-simY*2-simHeight-(fullHeight-txtY);
    
    if(txtY >= txtMin){
      slideText = false;
      clickTimer = millis();
    }
  

}



  //-------------------- Tabs -----------------------//



  textFont(boldFont);
  textAlign(CENTER);

  rectMode(CORNER);
  // Default Text
  if ( tabNum == 0) { 
    stroke(lighterGrey);
    fill(lighterGrey);
  } 
  else { 
    stroke(medGrey);
    fill(medGrey);
  }
  rect(txtX, txtY, textWidth(tab1)+txtMargin*4, tabHeight, tabRoundRadius);
  rect(txtX, txtY+tabHeight*0.5, tabHeight, textWidth(tab1));
  fill(0);
  text(tab1, txtX+textWidth(tab1)*0.5+txtMargin*2, txtY+tabHeight*0.4);


  //Tab 2
  if ( tabNum == 1) { 
    stroke(lighterGrey);
    fill(lighterGrey);
  } 
  else { 
    stroke(medGrey);
    fill(medGrey);
  }
  rect(txtX+tabSpacer+textWidth(tab1)+txtMargin*4, txtY, textWidth(tab2)+txtMargin*4, tabHeight, tabRoundRadius);
  fill(0);
  text(tab2, txtX+tabSpacer+textWidth(tab1)+textWidth(tab2)*0.5+txtMargin*6, txtY+tabHeight*0.4);

  //Tab 3
  if ( tabNum == 2) { 
    stroke(lighterGrey);
    fill(lighterGrey);
  } 
  else { 
    stroke(medGrey);
    fill(medGrey);
  }
  rect(txtX+tabSpacer*2+textWidth(tab1)+textWidth(tab2)+txtMargin*8, txtY, textWidth(tab3)+txtMargin*4, tabHeight, tabRoundRadius);
  fill(0);
  text(tab3, txtX+tabSpacer*2+textWidth(tab1)+textWidth(tab2)+textWidth(tab3)*0.5+txtMargin*10, txtY+tabHeight*0.4);
  fill(lighterGrey);
  stroke(lighterGrey);
  
  rect(txtX, txtY+tabHeight*0.75, txtWidth, txtHeight, txtRoundRadius);

  if(txtY < txtMin){
    image(txt[tabNum], txtX+txtMargin, txtY+tabHeight*1.2, txtWidth-txtMargin, txtHeight*0.8);
  }
}

//---------------------------------------------------------//


void reactionText() {



  fill(0);
  stroke(0);
  rectMode(CORNERS);
  rect(reactextX+txtMargin, reactextY-lineHeight, controlsX, reactextY+lineHeight);
  fill(lightGrey);

  textAlign(RIGHT); 
  textFont(boldFont);


  //in case of extinctions:
  if (graincount < 1 && micecount < 1 && eaglescount < 1) { // Starts over if all cells are dead
    fill(0);
    rect(reactextX+txtMargin, reactextY-lineHeight, controlsX, reactextY+lineHeight);
    fill(lightGrey);
    text(rtAllDead, reactextX, reactextY);

    step = 0;

    if ( millis() > timer + 4000 ) {

      grains = 5;
      mices = 5;
      eagless = 5;

      grainsi = 50;
      micei = 50;
      eaglesi = 50;


      step = 1;
      globalSetupOperations();

      seedSimulation();
    }
    else if ( millis() > timer + 3000 ) {
      fill(0);
      rect(reactextX+txtMargin, reactextY-lineHeight, controlsX, reactextY+lineHeight);
      fill(lightGrey);

      text(rtAllDead+" Starting over in...3...2...1", reactextX, reactextY);
    }
    else if ( millis() > timer + 2000 ) {
      fill(0);
      rect(reactextX+txtMargin, reactextY-lineHeight, controlsX, reactextY+lineHeight);
      fill(lightGrey);

      text(rtAllDead+" Starting over in...3...2", reactextX, reactextY);
    }
    else if ( millis() > timer + 1000 ) {
      fill(0);
      rect(reactextX+txtMargin, reactextY-lineHeight, controlsX, reactextY+lineHeight);
      fill(lightGrey);

      text(rtAllDead+" Starting over in...3", reactextX, reactextY);
    }
  }


  if (graincount > 1 && micecount < 1 && eaglescount < 1) { // Eagles and Mice Extinct

    text(rtMiceEaglesDead, reactextX, reactextY);
  } 
  else if (graincount > 1 && micecount > 1 && eaglescount < 1) { // Eagles Extinct

    text(rtEaglesDead, reactextX, reactextY);
  } 

  else if (graincount > 1 && micecount < 1 && eaglescount > 1) { // Mice Extinct
    text(rtMiceDead, reactextX, reactextY);
  }

  else if (graincount < 1 && micecount > 1 && eaglescount > 1) { // Grain Extinct
    text(graincount, reactextX, reactextY);
  }
}


//---------------------------------------------------------//
