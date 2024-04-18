# Real-time CPU Utilization Monitoring

## Overview
This release introduces a new version of the app (v3) with enhanced features, including real-time CPU utilization monitoring and logging requests info to a SQLite database.

## Features
- Added real-time CPU utilization monitoring using the "os-utils" library.
- Implemented WebSocket communication with "socket.io" for live data updates.
- Integrated Google Chart Tools to visualize CPU utilization trends in a line chart.
- Logging requests info to a SQLite database using the "sqlite3" dependency.

## Usage
To use the real-time CPU utilization feature and log requests info:

1. Update your project to version v3.0.0 and install dependencies using `npm install`.
2. Start the server using `node index.js`.
3. Open your web browser and navigate to "http://localhost:8080/".
4. View the live CPU utilization data in the real-time line chart on the homepage.
5. Requests info will be logged to the SQLite database for further analysis.
