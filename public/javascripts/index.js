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
					return parseFloat(el.split(' ')[1]);
				});

			graphx.loadData(data[1]);
			graphy.loadData(data[2]);

			console.log(data);
		}
	});

	$(document).ready(function() {
		graphx = new Graph2d("chartx");
		window.graphx = graphx;
		graphy = new Graph2d("charty");
	});

})(window);

