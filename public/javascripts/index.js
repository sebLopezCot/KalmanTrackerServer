(function index(window){

	var graphs = [];

	// Init vars
	var socket = io();

	socket.on('new connection', function(){
		console.log('New connection');
	});

	socket.on('measurement', function(measurement){
		console.log(measurement);

		if($("#chartdiv").html() == ""){
			var quantities = measurement.split(', ')
				.map(function(el){
					var mappings = el.replace(' ', '').split(':');
					mappings[1] = parseFloat(mappings[1]);
					return mappings;
				});

			// skip 0 which is timestamp
			for(i=1; i < quantities.length; i++){
				$("#chartdiv").append('<h3>'+quantities[i][0]+'</h3>');
				$("#chartdiv").append('<canvas id="chart'+quantities[i][0]+'" width="500" height="200"/>');
				$("#chartdiv").append('<br/>')

				var color = "#ffffff";
				if(quantities[i][0].toLowerCase().includes('x')){
					color = "#00ff00";
				} else if (quantities[i][0].toLowerCase().includes('y')){
					color = "#ff0000";
				} else if (quantities[i][0].toLowerCase().includes('z')){
					color = "#0000ff";
				}

				graphs.push(new Graph2d("chart" + quantities[i][0], color));
			}
		}

		if(graphs.length > 0){
			var data = measurement.split(', ')
				.map(function(el) {
					return parseFloat(el.replace(' ', '').split(':')[1]);
				});

			for (i=0; i < graphs.length; i++){
				graphs[i].loadData(data[i+1]); // since we don't have a graph for time
			}
		}
	});

	var paused = false;

	$(document).ready(function() {
		$('#pause').click(function(event) {
			event.preventDefault();

			if (paused) {
				graphs.forEach(function(graph){
					graph.start();
				});
				$(this).html("Pause");
			} else {
				graphs.forEach(function(){
					graph.stop();
				});
				$(this).html("Resume");
			}

			paused = !paused;
		});
	});

})(window);

