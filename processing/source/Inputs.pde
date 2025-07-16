//---------------------------------------------------------//

//         Start Keyboard / Mouse Input actions            //

//---------------------------------------------------------//

boolean isClicked(float x1, float y1, float x2, float y2){
  
  if(mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2){ 
      return true;
  }else{
      return false;
  }
  
}



void mouseDragged(){
  //-------------------------- grain + / - ---------------------------------------//


// Strength
if(isClicked(grainStrBarX-adjustorRoundRadius, grainStrBarY, grainStrBarX+adjustorBarWidth+adjustorRoundRadius, grainStrBarY+adjustorBarHeight)){
  
 grains = int(map(mouseX, grainStrBarX-adjustorRoundRadius, grainStrBarX+adjustorBarWidth, 0, 10));

      showHelp = false;
    if(txtY <= txtMax){ 
      slideText = true;
      clickTimer = millis();
    }
}

// Intelligence
if(isClicked(grainIntBarX-adjustorRoundRadius, grainIntBarY, grainIntBarX+adjustorBarWidth+adjustorRoundRadius, grainIntBarY+adjustorBarHeight)){
  
 grainsi = int(map(mouseX, grainIntBarX-adjustorRoundRadius, grainIntBarX+adjustorBarWidth, 0, 100));
  
      showHelp = false;
    if(txtY <= txtMax){ 
      slideText = true;
      clickTimer = millis();
    }
}

 //-------------------------- mice  + / - ---------------------------------------//


// Strength
if(isClicked(miceStrBarX-adjustorRoundRadius, miceStrBarY, miceStrBarX+adjustorBarWidth+adjustorRoundRadius, miceStrBarY+adjustorBarHeight)){
  
 mices = int(map(mouseX, miceStrBarX-adjustorRoundRadius, miceStrBarX+adjustorBarWidth, 0, 10));

      showHelp = false;
    if(txtY <= txtMax){ 
      slideText = true;
      clickTimer = millis();
    }
}

// Intelligence
if(isClicked(miceIntBarX-adjustorRoundRadius, miceIntBarY, miceIntBarX+adjustorBarWidth+adjustorRoundRadius, miceIntBarY+adjustorBarHeight)){
  
 micei = int(map(mouseX, miceIntBarX-adjustorRoundRadius, miceIntBarX+adjustorBarWidth, 0, 100));
  
      showHelp = false;
    if(txtY <= txtMax){ 
      slideText = true;
      clickTimer = millis();
    }
}
 
 //-------------------------- Eagles + / - ---------------------------------------//


// Strength
if(isClicked(eaglesStrBarX-adjustorRoundRadius, eaglesStrBarY, eaglesStrBarX+adjustorBarWidth+adjustorRoundRadius, eaglesStrBarY+adjustorBarHeight)){
  
 eagless = int(map(mouseX, eaglesStrBarX-adjustorRoundRadius, eaglesStrBarX+adjustorBarWidth, 0, 10));

      showHelp = false;
    if(txtY <= txtMax){ 
      slideText = true;
      clickTimer = millis();
    }
}

// Intelligence
if(isClicked(eaglesIntBarX-adjustorRoundRadius, eaglesIntBarY, eaglesIntBarX+adjustorBarWidth+adjustorRoundRadius, eaglesIntBarY+adjustorBarHeight)){
  
 eaglesi = int(map(mouseX, eaglesIntBarX-adjustorRoundRadius, eaglesIntBarX+adjustorBarWidth, 0, 100));
 
      showHelp = false;
    if(txtY <= txtMax){ 
      slideText = true;
      clickTimer = millis();
    } 
}



//Painted Cells
if(zoom == 500){
  if(isClicked(simX+(s*3), simY+(s), simWidth-(s*3), simHeight-(s*5))){
    int paintedCellID = floor(((mouseY)/s-3)*rowSize + (mouseX)/s-3);  
    paintCells(paintedCellID);
  }
}else if(zoom == 200){
  if(isClicked(simX+s, simY+s, simWidth-s, simHeight-s)){
    int paintedCellID = floor(((mouseY)/s-3)*rowSize + (mouseX)/s-3);  
    paintCells(paintedCellID);
  }

}else{
  if(isClicked(simX+s, simY+s, simWidth-s, simHeight-s)){
    int paintedCellID = floor(((mouseY)/s-2)*rowSize + (mouseX)/s-1);  
    paintCells(paintedCellID);
  }
}



  //Speed Slider
  if(isClicked(speedSliderX, speedSliderY-speedSliderArrowSize*2, speedSliderX+speedSliderLength, speedSliderY) && showSpeedSlider){
    
    if(mouseX > speedSliderX && mouseX < speedSliderX+speedSliderLength){
      speedSliderArrow = mouseX;
    }
    speed = int(map(mouseX, speedSliderX, speedSliderX+speedSliderLength, minSpeed, maxSpeed));
  
      showHelp = false;
    if(txtY <= txtMax){ 
      slideText = true;
      clickTimer = millis();
    }
  }





}




void mousePressed()
{
  
  // help button
  if(dist(mouseX, mouseY, presetsX, presetsY-presetsHeight) < simControlsButtonSize){
    if(showHelp){
      showHelp = false;
    }else{
      showHelp = true;
    }
    clickTimer = millis();
  }
  
  // Color Changer
  if(colorDebug){
    if(isClicked(0, 0, 50, 50)){
      cellPalate = (cellPalate+1)%(palateNumber+1);
      globalSetupOperations();
      seedSimulation();
      displayControls();
      showHelp = false;
    }
  }
  
  
  // Pause / Play
  if(isClicked(simControlsX+simControlsButtonRoundRad*1.5+simControlsButtonSpacer+simControlsButtonSize, paintButtonY, simControlsX+simControlsButtonRoundRad*1.5+simControlsButtonSpacer+simControlsButtonSize+simControlsButtonSize, paintButtonY+simControlsButtonSize)){ 
    if(step == 1){
      step = 0;
    }else if (step == 0){
      step = 1;
    }
      showHelp = false;
   if(txtY <= txtMax){ 
      slideText = true;
      clickTimer = millis();
    }
    
  }
  //next
  if(isClicked(simControlsX+simControlsButtonRoundRad*2.5+2*simControlsButtonSpacer+2*simControlsButtonSize, paintButtonY, simControlsX+simControlsButtonRoundRad*2.5+2*simControlsButtonSpacer+2*simControlsButtonSize+simControlsButtonSize, paintButtonY+simControlsButtonSize)){
    runSimulation();
    showHelp = false;
    if(txtY <= txtMax){ 
      slideText = true;
      clickTimer = millis();
    }
  
  }
  
   
//Zoom Button

if(isClicked(zoomButtonX, zoomButtonY, zoomButtonX+simControlsButtonSize, zoomButtonY+simControlsButtonSize)){
  
  if (zoom == 100){
    zoom = 200;
  }else if(zoom == 200){
    cellShape = 1;
    zoom = 500;
  }else if(zoom == 500){
    cellShape = 0;
    zoom = 100;
  }
   
    step = 1;
      
    globalSetupOperations();
    seedSimulation();



}


// Restart
if(isClicked(simControlsX+simControlsButtonRoundRad*0.5, paintButtonY, simControlsX+simControlsButtonRoundRad*0.5+simControlsButtonSize, paintButtonY+simControlsButtonSize) && generationCount > 1){
  
   step = 1;
   
   globalSetupOperations();
   seedSimulation();
  
}

// Reset
 if(isClicked(resetButtonX, resetButtonY, resetButtonX+simControlsButtonSize*3, resetButtonY+simControlsButtonSize) && generationCount > 1){
  
   grains = 5;
   mices = 5;
   eagless = 5;
   grainsi = 50;
   micei = 50;
   eaglesi = 50;
   cellShape = 0;
     
   step = 1;
   speed = 6;
   zoom = 200;
   
   cellPalate = 7;
   colorDebug = false;
   showHelp = false;
   
   tabNum = 0;
   
   paintType = grainc; 
   speedSliderArrow = speedSliderX+speed*(speedSliderLength/minSpeed);
   
   
   globalSetupOperations();
   seedSimulation();
   displayControls();
   displayPresets();
   displayText();
  
}
 

// Paint cycle 
if(isClicked(paintButtonX, paintButtonY, paintButtonX+simControlsButtonSize, paintButtonY+simControlsButtonSize)){
  
 if(paintType == wallsc){
   paintType = grainc;
 }else if(paintType == grainc){
   paintType = micec;
 }else if(paintType == micec){
   paintType = eaglesc;
 }else if(paintType == eaglesc){
   paintType = wallsc;
 }
 
      showHelp = false;
      if(txtY <= txtMax){ 
      slideText = true;
      clickTimer = millis();
    }

}
  
if(isClicked(0, 0, 50, 50)){
  if(grains == 7 && grainsi == 70 && mices == 5 && micei == 50 && eagless == 5 && eaglesi == 50 && paintType == grainc && zoom == 450 && speed == 11){
      
     grains = 5;
     mices = 5;
     eagless = 5;
     
     grainsi = 50;
     micei = 50;
     eaglesi = 50;
     
     speed = 6;
  
      showHelp = false;
      if(colorDebug == false){
          colorDebug = true;
          step = 1;
          globalSetupOperations();

          seedSimulation();
      }else{
        colorDebug = false;
      }
  }
}
 
  
//--------------------------------------------- PRESETS -------------------------------------------------------------------------//

//----------- Grain -------------//

//weak
if(isClicked(presetsX+40+presetsWidth/20, presetsY+0.5*presetsHeight/9, presetsX+40+presetsWidth/20+presetsWidth/4, presetsY+0.5*presetsHeight/9+presetsHeight/3)){
  
 grains = 2;
 mices = 5;
 eagless = 5;
 
 grainsi = 20;
 micei = 50;
 eaglesi = 50;
 
 step = 1;

      showHelp = false;
  
}

//strong
if(isClicked(presetsX+40+presetsWidth/20, presetsY+5.5*presetsHeight/9, presetsX+40+presetsWidth/20+presetsWidth/4, presetsY+5.5*presetsHeight/9+presetsHeight/3)){
  
 grains = 7;
 mices = 5;
 eagless = 5;
 
 grainsi = 70;
 micei = 50;
 eaglesi = 50;
 
 step = 1;
      showHelp = false;

  
}

//----------- Mice -------------//

//weak
if(isClicked(presetsX+40+7*presetsWidth/20, presetsY+0.5*presetsHeight/9, presetsX+40+7*presetsWidth/20+presetsWidth/4, presetsY+0.5*presetsHeight/9+presetsHeight/3)){
  
 grains = 4;
 mices = 3;
 eagless = 5;
 
 grainsi = 40;
 micei = 30;
 eaglesi = 50;
 
 step = 1;
      showHelp = false;

  
}

//strong
if(isClicked(presetsX+40+7*presetsWidth/20, presetsY+5.5*presetsHeight/9, presetsX+40+7*presetsWidth/20+presetsWidth/4, presetsY+5.5*presetsHeight/9+presetsHeight/3)){
  
 grains = 5;
 mices = 8;
 eagless = 5;
 
 grainsi = 50;
 micei = 80;
 eaglesi = 50;
 
 step = 1;
      showHelp = false;

  
}

//----------- Eagles -------------//

//weak
if(isClicked(presetsX+40+13*presetsWidth/20, presetsY+0.5*presetsHeight/9, presetsX+40+13*presetsWidth/20+presetsWidth/4, presetsY+0.5*presetsHeight/9+presetsHeight/3)){
  
 grains = 5;
 mices = 5;
 eagless = 3;
 
 grainsi = 50;
 micei = 50;
 eaglesi = 30;
 
 step = 1;
      showHelp = false;

  
}

//strong
if(isClicked(presetsX+40+13*presetsWidth/20, presetsY+5.5*presetsHeight/9, presetsX+40+13*presetsWidth/20+presetsWidth/4, presetsY+5.5*presetsHeight/9+presetsHeight/3)){
  
 grains = 4;
 mices = 4;
 eagless = 7;
 
 grainsi = 40;
 micei = 40;
 eaglesi = 70;
 
 step = 1;
      showHelp = false;

  
}


//---------------------------- Text Tabs ----------------//

 textFont(boldFont);
// Tab 1
if(isClicked(txtX-txtRoundRadius*0.5+tabRoundRadius*0.5, txtY, txtX-txtRoundRadius*0.5+tabRoundRadius*0.5+textWidth(tab1)+txtMargin*2, txtY+tabHeight*1.2)){
    
  if(tabNum == 0 && txtY <= txtMax){
    txtY = txtMin;
  }else if(txtY >= txtMin){
    txtY = txtMax;
  } 

  
  tabNum = 0;
      showHelp = false;

  
  graphHeight = fullHeight-simY*2-simHeight-(fullHeight-txtY);
  
}


// Tab 2
if(isClicked(txtX-txtRoundRadius*0.5+tabRoundRadius*1.5+tabSpacer+textWidth(tab1)+txtMargin*2, txtY, txtX-txtRoundRadius*0.5+tabRoundRadius*1.5+tabSpacer+textWidth(tab1)+txtMargin*2+textWidth(tab2)+txtMargin*2, txtY+tabHeight*1.2)){
  
  if( tabNum == 1 && txtY <= txtMax){
    txtY = txtMin;
  }else if(txtY >= txtMin){
    txtY = txtMax;
  }
  
   tabNum = 1;
      showHelp = false;
  
  
  
  
  graphHeight = fullHeight-simY*2-simHeight-(fullHeight-txtY);

}


// Tab 3
if(isClicked(txtX-txtRoundRadius*0.5+tabRoundRadius*2.5+tabSpacer*2+textWidth(tab1)+textWidth(tab2)+txtMargin*4, txtY, txtX-txtRoundRadius*0.5+tabRoundRadius*2.5+tabSpacer*2+textWidth(tab1)+textWidth(tab2)+txtMargin*4+textWidth(tab3)+txtMargin*2, txtY+tabHeight*1.2)){
  
  if( tabNum == 2 && txtY <= txtMax){
    txtY = txtMin;
  }else if(txtY >= txtMin){
    txtY = txtMax;
  }
  
   tabNum = 2;
      showHelp = false;

  
  graphHeight = fullHeight-simY*2-simHeight-(fullHeight-txtY);

}


    if(!slideText){
      clickTimer = millis();
    }
}
