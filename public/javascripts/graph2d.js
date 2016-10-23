
var Graph2d = function Graph2d(canvas, color){

	var smoothie = new SmoothieChart({
		interpolation:'linear',
		maxValue: 10.0,
		minValue: -10.0,
		timestampFormatter: SmoothieChart.timeFormatter
	});
	this.chart = smoothie;
	smoothie.streamTo(document.getElementById(canvas));

	// Data
	var line = new TimeSeries();
	this.line = line;

	// Add to SmoothieChart
	smoothie.addTimeSeries(line, {lineWidth:2,strokeStyle:color});
};

Graph2d.prototype.loadData = function(data) {
	 this.line.append(new Date().getTime(), data);
};

Graph2d.prototype.stop = function() {
	this.chart.stop();
};

Graph2d.prototype.start = function() {
	this.chart.start();
};
