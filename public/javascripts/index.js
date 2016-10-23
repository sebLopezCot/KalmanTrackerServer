(function index(window){

	var graphx = null;
	var graphy = null;

	// Init vars
	var socket = io();

	socket.on('new connection', function(){
		console.log('New connection');
	});

	socket.on('measurement', function(measurement){
		console.log(measurement);

		if(graphx != null && graphy != null){
			var data = measurement.split(', ')
				.map(function(el) {
					return parseFloat(el.replace(' ', '').split(':')[1]);
				});

			graphx.loadData(data[1]);
			graphy.loadData(data[2]);
		}
	});

	var paused = false;

	$(document).ready(function() {
		graphx = new Graph2d("chartx", "#00ff00");
		graphy = new Graph2d("charty", "#ff0000");

		$('#pause').click(function(event) {
			event.preventDefault();

			if (paused) {
				graphx.start();
				graphy.start();
				$(this).html("Pause");
			} else {
				graphx.stop();
				graphy.stop();
				$(this).html("Resume");
			}

			paused = !paused;
		});
	});

})(window);

