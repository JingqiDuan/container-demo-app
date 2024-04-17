google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

var chartLoaded = false;
var lineChartDataSet = [];


function drawBasic() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'CPU Utils');

      data.addRows(lineChartDataSet);

      var options = {
        hAxis: {
          title: 'Seconds'
        },
        vAxis: {
          title: 'CPU Utilization %',
          //map vertical axis to the range of 0-100
          viewWindow: {
            min: 0,
            max: 100
          }
        },
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
      chartLoaded = true;
    }

    //load socket.io
    var socket = io();
    //call function when cpu data received
    socket.on('CPU Data Point', (cpuData) => {
        console.log(cpuData);
        lineChartDataSet = cpuData;

        if(chartLoaded){
            drawBasic();
        }
    });
