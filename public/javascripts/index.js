(function index(window){

	// Init vars
	var socket = io();

	socket.on('measurement', function(measurement){
		console.log(measurement);
	});

	$(document).ready(function() {
		var ctx = $("#chart1");
		var scatterChart = new Chart(ctx, {
		    type: 'line',
		    data: {
		        datasets: [{
		            label: 'Scatter Dataset',
		            data: [{
		                x: -10,
		                y: 0
		            }, {
		                x: 0,
		                y: 10
		            }, {
		                x: 10,
		                y: 5
		            },{
		                x: -2,
		                y: 5
		            }, {
		                x: 5,
		                y: 2
		            }, {
		                x: 7,
		                y: 8
		            }],
		            pointBackgroundColor: "#000",
		            pointRadius: 3,
		            pointHoverRadius: 5,
		            pointHitRadius: 20
		        }]
		    },
		    options: {
		        scales: {
		            xAxes: [{
		                type: 'linear',
		                position: 'bottom'
		            }]
		        },
		        showLines: false
		    }
		});
	});

})(window);

