// Note: References removed

// function displayText() {
//   // Draw text box background
//   noStroke();
//   fill(0);
//   rect(0, txtY, fullWidth, fullHeight - txtY);
  
//   // Display appropriate tab content based on tabNum
//   if (txt[tabNum]) {
//     image(txt[tabNum], txtX, txtY + tabHeight, txtWidth, txtHeight - tabHeight);
//   }
  
//   // Draw tab background
//   fill(30);
//   noStroke();
//   rect(txtX, txtY, txtWidth, tabHeight);
  
//   // Draw tab 1
//   if (tabNum === 0) {
//     fill(grainc);
//     stroke(50);
//   } else {
//     fill(60);
//     stroke(50);
//   }
//   rect(txtX, txtY, txtWidth / 3 - tabSpacer, tabHeight);
  
//   // Draw tab 2
//   if (tabNum === 1) {
//     fill(micec);
//     stroke(50);
//   } else {
//     fill(60);
//     stroke(50);
//   }
//   rect(txtX + txtWidth / 3, txtY, txtWidth / 3 - tabSpacer, tabHeight);
  
//   // Draw tab 3
//   if (tabNum === 2) {
//     fill(eaglesc);
//     stroke(50);
//   } else {
//     fill(60);
//     stroke(50);
//   }
//   rect(txtX + 2 * txtWidth / 3, txtY, txtWidth / 3 - tabSpacer, tabHeight);
  
//   // Tab text
//   noStroke();
//   textSize(14);
//   textStyle(BOLD);
//   textAlign(CENTER, CENTER);
  
//   // Tab 1 text
//   if (tabNum === 0) {
//     fill(0);
//   } else {
//     fill(200);
//   }
//   text(tab1, txtX + txtWidth / 6 - tabSpacer / 2, txtY + tabHeight / 2);
  
//   // Tab 2 text
//   if (tabNum === 1) {
//     fill(0);
//   } else {
//     fill(200);
//   }
//   text(tab2, txtX + txtWidth / 2, txtY + tabHeight / 2);
  
//   // Tab 3 text
//   if (tabNum === 2) {
//     fill(0);
//   } else {
//     fill(200);
//   }
//   text(tab3, txtX + 5 * txtWidth / 6 - tabSpacer / 2, txtY + tabHeight / 2);
  
//   textStyle(NORMAL);
  
//   // Handle text box animation
//   if (slideText) {
//     if (textState === "down") {
//       txtY += 5;
//       if (txtY >= txtMax) {
//         txtY = txtMax;
//         slideText = false;
//       }
//     } else if (textState === "up") {
//       txtY -= 5;
//       if (txtY <= txtMin) {
//         txtY = txtMin;
//         slideText = false;
//       }
//     }
//   }
  
//   // Auto-hide text after timeout
//   if (millis() - clickTimer > txtTimeOut && txtY >= txtMax) {
//     slideText = true;
//     textState = "up";
//   }
// }

// function reactionText() {
//   // Display reaction text based on population counts
//   textSize(18);
//   textAlign(RIGHT);
//   
//   // Determine what reaction text to show
//   let reactionMessage = "";
//   
//   if (graincount === 0 && micecount === 0 && eaglescount === 0) {
//     fill(255, 50, 50);
//     reactionMessage = rtAllDead;
//   } else if (graincount === 0) {
//     fill(grainc);
//     reactionMessage = rtGrainDead;
//   } else if (micecount === 0 && eaglescount === 0) {
//     fill(grainc);
//     reactionMessage = rtMiceEaglesDead;
//   } else if (micecount === 0) {
//     fill(micec);
//     reactionMessage = rtMiceDead;
//   } else if (eaglescount === 0) {
//     fill(eaglesc);
//     reactionMessage = rtEaglesDead;
//   } else if (generationCount >= 1000) {
//     fill(255, 200, 50);
//     reactionMessage = rtTooLong;
//   }
//   
//   // Only display if there's a message
//   if (reactionMessage !== "") {
//     text(reactionMessage, reactextX, reactextY);
//   }
// } 