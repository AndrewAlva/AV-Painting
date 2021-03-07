// Sketch 2 vars

// Sketch 2
var Sketch_2 = {
	draw: function() {
		var _self = this;

		/* CLEANER */
		background(0);
		
		/* Actualizamos el análisis de ondas */
		var spectrum = fft.analyze();
		
		// Calculamos el espacio entre cada muestra
		var x_space = width / samples;
		
		// Iteramos el total de muestras
		for (var i = 0; i < spectrum.length; i+= 2) {
			var x = x_space * i;
			var value = spectrum[i];
			var _height = map(value, 0, 255, 0, height);

			_self.brush(x, 0, x_space, _height);
		}
	},

	brush: function(x,y, width,height) {
		rect(x,y, width,height);
	}
}

// Add sketch
Sketches.push(Sketch_2);