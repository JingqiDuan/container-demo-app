const express = require('express');
const app = express();
const http = require('http').Server(app);
const os = require('os-utils');
const io = require('socket.io')(http);
const path = require('path');
const port = 8080;

let sql;
const sqlite3 = require('sqlite3').verbose();
//connect to db
const db = new sqlite3.Database('./demoLog.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err){
        return console.error(err.message);
    }
});

//create db table 
// sql = 'CREATE TABLE request_logs(id INTEGER PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, method TEXT, url TEXT, status INTEGER)';
// db.run(sql);

//log requests
app.use((req, res, next) => {
    const { method, originalUrl } = req;
    const statusCode = res.statusCode; 
    db.run(
        'INSERT INTO request_logs (method, url, status) VALUES (?, ?, ?)',
        [method, originalUrl, statusCode],
        (err) => {
            if (err) {
                console.error('Error inserting log:', err);
            }
        }
    );
    next();
});

//query the data
db.all('SELECT * FROM request_logs', [], (err, rows) => {
    if(err) return console.error(err.message);
    rows.forEach((row) => {
        console.log(row);
    });
});

app.use(express.static(path.join(__dirname, 'public')));

var cpuLineChartDataSet = [];
var lineChartLength = 61;
var interval = 1000;

app.get('/', (req, res) => {
    console.log('Demo v3...');
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