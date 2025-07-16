# Population Cycles Simulation

This is a P5.js port of an ecological simulation that shows predator-prey relationships and population dynamics. The simulation models a simple ecosystem with three trophic levels:

1. **Grain** (green) - The primary producers
2. **Mice** (blue) - Primary consumers that eat grain
3. **Eagles** (red) - Secondary consumers that eat mice

## How to Run

1. Open the `index.html` file in a modern web browser
2. The simulation will start automatically

## Controls

- **Space bar**: Toggle play/pause
- **Left/Right arrow keys**: Adjust simulation speed
- **R key**: Reset simulation
- **H key**: Toggle help
- **1, 2, 3 keys**: Switch between information tabs
- **Mouse**: Click in the simulation area to paint cells

## How It Works

The simulation uses a cellular automaton to model population dynamics:

- Each cell can be empty or contain grain, mice, or eagles
- Cells have a lifespan and fitness value
- Grain can grow into empty spaces
- Mice eat grain to reproduce
- Eagles eat mice to reproduce
- All organisms die once their lifespan ends

The simulation demonstrates ecological principles such as:

- Population cycles
- Predator-prey relationships
- Resource competition
- Ecosystem balance

## Credit

This is a P5.js port of a Processing simulation. The original Processing code was converted to JavaScript using P5.js.

## License

This project is free to use for educational purposes. 