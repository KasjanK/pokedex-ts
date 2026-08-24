# pokedex-ts
A command-line Pokedex that lets you explore locations, catch Pokémon, and inspect your collection. Data is fetched from the public PokéAPI and cached locally for fast, offline-friendly lookups.

## Features
- Explore location areas and move between them
- Catch Pokémon and store their details locally
- Inspect caught Pokémon (name, height, weight, stats, types)
- Helpful REPL with built-in commands and help text
- Simple in-memory cache for API responses



Example:
- `inspect pidgey` → “you have not caught that pokemon”
- `catch pidgey` → attempts capture and stores details on success
- `inspect pidgey` → prints full details (stats, height, weight, types)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/kasjank/pokedex-ts
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Build the project:
   ```
   npm run build
   ```
## Usage
   ```
   npm start
   ```

### Available Commands
- `help` — Show available commands
- `map` — List the next page of location areas
- `mapb` — Go back to the previous page of location areas
- `explore <area>` — List Pokémon that can appear in the specified area
- `catch <pokemon>` — Try to catch a Pokémon by name
- `inspect <pokemon>` — Show details for a caught Pokémon
- `exit` — Quit the program

## Running Tests
   ```
   npm test
   ```
