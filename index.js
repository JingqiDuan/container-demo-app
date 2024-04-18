const express = require('express');
const app = express();
const http = require('http').Server(app);
const os = require('os-utils');
const io = require('socket.io')(http);
const path = require('path');
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));

var cpuLineChartDataSet = [];
var lineChartLength = 61;
var interval = 1000;

app.get('/', (req, res) => {
    console.log("demo v1...");
});


http.listen(port, () => {
    for(var i = 0; i < lineChartLength; i++){
        cpuLineChartDataSet[i] = [i, 0];
    }

    setInterval(() => {

        os.cpuUsage((value) => {
            //cpu util percentage
            updateCpuLineChart(Math.round(value * 100));
            //server get data as CPU Data Point event
            io.emit('CPU Data Point', cpuLineChartDataSet)
        });

    }, interval);
});

function updateCpuLineChart(cpuUtil){
    if(cpuLineChartDataSet.length >= lineChartLength){
        //shift oldest values away
        cpuLineChartDataSet.shift();
    }
    cpuLineChartDataSet.push([0, cpuUtil]);
    for(var i = 0; i < lineChartLength; i++){
        cpuLineChartDataSet[i][0] = i;
    }
}