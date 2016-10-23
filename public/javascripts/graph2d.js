
var Graph2d = function Graph2d(canvas){

	var smoothie = new SmoothieChart({interpolation:'linear'});
	this.chart = smoothie;
	smoothie.streamTo(document.getElementById(canvas));

	// Data
	var line = new TimeSeries();
	this.line = line;

	// Add to SmoothieChart
	smoothie.addTimeSeries(line);
};

Graph2d.prototype.loadData = function(data) {
	 this.line.append(new Date().getTime(), data);
};

Graph2d.prototype.stop = function() {
	this.chart.stop();
};
