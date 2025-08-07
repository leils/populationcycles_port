// Wait for both DOM and p5.js to be ready
window.addEventListener('load', () => {
  // Initialize controls when the document is ready
  const resetBtn = document.getElementById('reset-btn');
  const playBtn = document.getElementById('play-btn');
  const speedSlider = document.getElementById('speed-slider');
  const heatWaveBtn = document.getElementById('heat-wave-btn');
  const invasiveMiceBtn = document.getElementById('invasive-mice-btn');
  const eagleDiseaseBtn = document.getElementById('eagle-disease-btn');

  const textDiv = document.getElementById('event-text');

  if (resetBtn) {
    resetBtn.onclick = () => {
      fullReset();
      textDiv.textContent = "Fresh start!";
    };
  }

  if (playBtn) {
    playBtn.onclick = () => {
      play = !play;
      playBtn.textContent = play ? 'Pause' : 'Play'; // TODO: this should be responsive in Electron
    };
    playBtn.textContent = play ? 'Pause' : 'Play';
  }

  if (speedSlider) {
    speedSlider.oninput = (e) => {
      speed = parseInt(e.target.value, 10);
    };
    speedSlider.value = speed;
  }

  if (heatWaveBtn) {
    heatWaveBtn.onclick = () => {
      markHeatWave();
      // Apply Weak Grain preset
      grainSpan = 2; //reduce grain lifespan
      miceSpan = 5;
      eagleSpan = 5;
      grainGrowth = 20; // reduce grain growth chance
      miceGrowth = 50;
      eagleGrowth = 50;

      updateText("A heat wave strikes; grain has a harder time growing.");
    };
  }

  if (invasiveMiceBtn) {
    invasiveMiceBtn.onclick = () => {
      markHeatWave();
      grainSpan = 5; //reduce grain lifespan
      miceSpan = 7;
      eagleSpan = 5;
      grainGrowth = 50; // reduce grain growth chance
      miceGrowth = 70;
      eagleGrowth = 50;

      updateText("A new type of mouse is introduced to the ecosystem. It's stronger and grows faster than before.");
    }
  }

  if (eagleDiseaseBtn) {
    eagleDiseaseBtn.onclick = () => {
      markHeatWave();
      grainSpan = 5; //reduce grain lifespan
      miceSpan = 5;
      eagleSpan = 2;
      grainGrowth = 50; // reduce grain growth chance
      miceGrowth = 50;
      eagleGrowth = 20;

      updateText("A new disease is introduced in the eagle population. Adult eagles have a harder time hunting, and fewer chicks hatch.");
    }
  }
}); 

function updateText(newEventText, color = "white") {
  const textDiv = document.getElementById('event-text');

  textDiv.style.color = color;
  textDiv.textContent = newEventText;
  textDiv.style.display = "block";

  setTimeout(() => {
    // stop displaying the event text after 10 seconds
    textDiv.style.display = "none";
  }, 10000);

}