// Initialize controls when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  const resetBtn = document.getElementById('reset-btn');
  const playBtn = document.getElementById('play-btn');
  const speedSlider = document.getElementById('speed-slider');
  const heatWaveBtn = document.getElementById('heat-wave-btn');

  if (resetBtn) {
    resetBtn.onclick = () => {
      grainSpan = defaultGrainSpan;       // grain lifespan (in generation number)
      miceSpan = defaultMiceSpan;        // mice lifespan (in generation number)
      eagleSpan = defaultEagleSpan;      // eagle lifespan (in generation number)

      grainGrowth = defaultGrainGrowth;     // Percent chance of grain growth given correct parameters
      miceGrowth = defaultMiceGrowth;       // Percent chance of mice growth given correct parameters
      eagleGrowth = defaultEagleGrowth;     // Percent chance of eagle growth given correct parameters

      seedSimulation();
      runSimulation();
      graphCells();
    };
  }

  if (playBtn) {
    playBtn.onclick = () => {
      step = 1 - step;
      playBtn.textContent = step ? 'Pause' : 'Play';
    };
    playBtn.textContent = step ? 'Pause' : 'Play';
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
      grainSpan = 2; //reduce grain
      miceSpan = 5;
      eagleSpan = 5;
      grainGrowth = 20; // reduce grain intelligence
      miceGrowth = 50;
      eagleGrowth = 50;
    };
  }
}); 