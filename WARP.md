# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a simple JavaScript utility project for generating duration sequences. The main functionality is contained in `duration.js`, which provides functions to generate arrays of time durations based on beginning, ending, and interval parameters.

### Core Architecture

**Main Module (`duration.js`):**
- `generateDurations()` - Core function that generates time duration arrays
- `generateDurationsAsMarkdownList()` - Wrapper that formats output as markdown list
- Uses the `ms` library for flexible duration parsing (supports formats like "30m", "1h", "2s")
- Also supports time formats like "MM:SS" and "H:MM:SS"
- Returns formatted time strings in "MM:SS" or "H:MM:SS" format

**Test Suite (`duration.spec.js`):**
- Comprehensive Vitest test suite covering edge cases
- Tests various duration formats and error conditions

**Demo/CLI (`test.js`):**
- Interactive command-line interface for testing the duration functions
- Uses readline for user input

## Development Commands

### Testing
```bash
# Run tests once
npx vitest run

# Run tests in watch mode
npm test
# or
npm run test:watch

# Run specific test file
npx vitest duration.spec.js
```

### Code Quality
```bash
# Format code with Prettier
npm run format
```

### Running the Interactive Demo
```bash
# Start the interactive duration generator
node test.js
```

## Key Technical Details

**Module System:** Uses ES modules (`"type": "module"` in package.json)

**Duration Parsing Strategy:**
1. First attempts to parse using the `ms` library (handles "30m", "1h", "2s" formats)
2. Falls back to manual parsing for "MM:SS" and "H:MM:SS" formats
3. Throws descriptive errors for invalid formats

**Duration Formatting:**
- Outputs "MM:SS" format for durations under 1 hour
- Outputs "H:MM:SS" format for durations 1 hour or longer
- Automatically zero-pads minutes and seconds

**TODO Items in Code:**
- The codebase contains a TODO to refactor `generateDurationsAsMarkdownList()` into a fluent API method (e.g., `generateDurations(...).asMarkdownList()`)

## Dependencies

**Runtime:**
- `ms` - Duration string parsing library

**Development:**
- `vitest` - Testing framework
- `prettier` - Code formatting