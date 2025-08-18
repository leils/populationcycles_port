# Population Cycles Simulation

## TODOS: 

- [ ] Consider swapping positions/size of the graph and cellular automata
- [ ] Re-implement informational tabs 
- [ ] Fix whatever the heck is going on with the graph shifting 
- [x] Twiddle with values to represent "ecological disasters" like heat waves, floods, disease? 

## Mostly generated documentation

This is a P5.js port of an ecological simulation that shows predator-prey relationships and population dynamics. The simulation models a simple ecosystem with three trophic levels:

1. **Grain** (yellow) - The primary producers
2. **Mice** (gray) - Primary consumers that eat grain
3. **Eagles** (blue) - Secondary consumers that eat mice

## How to Run

1. Run a server in this project file
2. Open the `index.html` file in a modern web browser
3. The simulation will start automatically

## Controls

- **Space bar**: Toggle play/pause
- **R key**: Reset simulation

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

This is a P5.js port of a Processing simulation. The original Processing code was converted to JavaScript using P5.js, mostly by Cursor. 