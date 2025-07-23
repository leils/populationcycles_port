// Initialize controls when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  const resetBtn = document.getElementById('reset-btn');
  const playBtn = document.getElementById('play-btn');
  const speedSlider = document.getElementById('speed-slider');
  const heatWaveBtn = document.getElementById('heat-wave-btn');

  if (resetBtn) {
    resetBtn.onclick = () => {
      fullReset();
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
      grainSpan = 2; //reduce grain lifespan
      miceSpan = 5;
      eagleSpan = 5;
      grainGrowth = 20; // reduce grain growth chance
      miceGrowth = 50;
      eagleGrowth = 50;
    };
  }
}); 