// Sketch 0 vars
var lines_angle;
var lines_weight = 1;
var spiral_turns = 1;
var spiral_factor = 1.4 * spiral_turns;


// Sketch 0
var Sketch_0 = {
	draw: function() {
		var _self = this;
		/* CLEANER */
		background(0, 250);
		/* Actualizamos el análisis de ondas */
		var spectrum = fft.analyze();
		// Iteramos el total de muestras
		// Calculamos el espacio entre cada muestra
		var x_space = width / samples;
		// Iteramos el total de muestras
		for (var i = 0; i < spectrum.length; i+= 1) {
			var x = x_space * i;
			var value = spectrum[i];
			var _height = map(value, 0, 255, 0, halfHeight);

			// stroke(value, 255,255, Math.floor(255 / spiral_turns) );
			stroke(value, 255, 255, 150);
			
			//rect(x, 0, x_space, _height);

			_self.brush(i, _height);
		}

		cFrame++;
	},

	brush: function(i, h) {
		var _self = this;
		push();
			translate(halfWidth, halfHeight);
			// rotate(radians(cFrame % 360) );
			// rotate( (cFrame/100) + ((lines_angle * i) * spiral_factor) );
			rotate((lines_angle * i) * spiral_factor );
			_self.drawing(h);
		pop();
	},

	drawing: function(h) {
		beginShape();
			vertex(0, 0);
			//bezierVertex(width, 0,    -width, 0,    0, h);
			bezierVertex(0, 0,    0, 0,    0, h);
			// bezierVertex(h, 0,    h, 0,    0, h);
		endShape();
	}
}


// Add sketch to list of sketches
Sketches.push(Sketch_0);




