# Countdown Timer

A simple countdown timer built using React and Redux toolkit. This project demonstrates how to create a countdown timer that updates in real-time and persists across page reloads using Redux toolkit for state management. Additionally, the project is configured with Vite for optimized development.

## Features

- Set a target date and time for the countdown.
- Displays the remaining time in days, hours, minutes, and seconds.
- Automatically updates the countdown every second.
- Persists the countdown across page reloads using local storage.
- Configured with Vite for efficient development.

## Usage

To use this countdown timer in your React application, follow these steps:

1. Install the necessary dependencies:
   ```bash
   npm install react-redux
   ```

2. Import the Countdown component into your project:
   ```bash
    import Countdown from './Countdown';
   ```
3.  Place the <Countdown /> component wherever you want the countdown to appear in your application.

## Configuration

The project is configured with Vite for fast and optimized development. The Vite configuration is located in the vite.config.js file and sets up the development server port to 4200.

```javascript
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  
  export default defineConfig({
    plugins: [react()],
    server: {
      port: 4200,
    },
  })
```

## How It Works

The countdown timer is implemented using React components and Redux state management. Here's a brief overview of how it works:

- The `Countdown` component is responsible for rendering the countdown UI and updating the current time.
- Redux toolkit is used to store the target date and current time.
- The `calculateTimeRemaining` function calculates the time remaining until the target date based on the current time.
- The `checkAndUpdateTime` function checks if the target date has expired or needs to be updated, and updates it accordingly.
- The countdown updates every second using setInterval, dispatching actions to update the current time in the Redux store.
