# Real-time CPU Utilization Monitoring

## Overview
This version introduces a new feature to display real-time CPU utilization data in a line chart on the web page.

## Features
- Added real-time CPU utilization monitoring using the "os-utils" library.
- Implemented WebSocket communication with "socket.io" for live data updates.
- Integrated Google Chart Tools to visualize CPU utilization trends in a line chart.

## Usage
To use the real-time CPU utilization feature:

1. Update your project to version v2.0.0 and install dependencies using `npm install`.
2. Start the server using `node index.js`.
3. Open your web browser and navigate to "http://localhost:8080/".
4. View the live CPU utilization data in the real-time line chart on the homepage.
