let lastTimeout = null;

// Wait for both DOM and p5.js to be ready
window.addEventListener('load', () => {
  // Initialize p5 instances first
  if (typeof initializeP5Instances === 'function') {
    initializeP5Instances();
  }
  
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
      updateText("Fresh start!");
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
      if (graincount > 0) {
        markHeatWave();
        grainSpan -= spanDamage;
        grainGrowth -= growthDamage;
        lastHeatWave = generationCount;
        // Apply Weak Grain preset
        // if (recoveryOn) {
        //   grainSpan -= spanDamage;
        //   grainGrowth -= growthDamage;
        // } else {
        //   grainSpan = 2; //reduce grain lifespan
        //   miceSpan = 5;
        //   eagleSpan = 5;
        //   grainGrowth = 20; // reduce grain growth chance
        //   miceGrowth = 50;
        //   eagleGrowth = 50;
        // }

        updateText("A heat wave strikes; grain has a harder time growing.");
      } else {
        updateText("No grain");
      }
    };
  }

  if (invasiveMiceBtn) {
    invasiveMiceBtn.onclick = () => {
      if (micecount > 0) {

        markHeatWave();

        miceSpan += spanDamage;
        miceGrowth += growthDamage;
        lastInvasiveMice = generationCount;
        // if (recoveryOn) {
        //   miceSpan += spanDamage;
        //   miceGrowth += growthDamage;
        // } else {
        //   grainSpan = 5; //reduce grain lifespan
        //   miceSpan = 7;
        //   eagleSpan = 5;
        //   grainGrowth = 50; // reduce grain growth chance
        //   miceGrowth = 70;
        //   eagleGrowth = 50;
        // }
        updateText("A new type of mouse is introduced to the ecosystem. It's stronger and grows faster than before.");

      } else {
        updateText("No mice");
      }
    }
  }

  if (eagleDiseaseBtn) {
    eagleDiseaseBtn.onclick = () => {
      if (eaglescount > 0) {
        markHeatWave();

        eagleSpan-= spanDamage;
        eagleGrowth -= growthDamage;
        lastEagleDisease = generationCount;

        // if (recoveryOn) {
        //   eagleSpan -= spanDamage;
        //   eagleGrowth -= growthDamage;
        // } else {
        //   grainSpan = 5; //reduce grain lifespan
        //   miceSpan = 5;
        //   eagleSpan = 2;
        //   grainGrowth = 50; // reduce grain growth chance
        //   miceGrowth = 50;
        //   eagleGrowth = 20;
        // }

        updateText("A new disease is introduced in the eagle population. Adult eagles have a harder time hunting, and fewer chicks hatch.");
      } else {
        updateText("No eagles");
      }
    }
  }
});

function updateText(newEventText, color = "white") {
  clearTimeout(lastTimeout);
  const textDiv = document.getElementById('event-text');

  textDiv.style.color = color;
  textDiv.textContent = newEventText;
  textDiv.style.display = "block";

  lastTimeout = setTimeout(() => {
    // stop displaying the event text after 10 seconds
    textDiv.style.display = "none";
  }, 10000);

}

function clearTextEvent() {
  const textDiv = document.getElementById('event-text');
  textDiv.style.display = "none";
  textDiv.style.color = "white";
}