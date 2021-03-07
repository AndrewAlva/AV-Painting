// Sketch 1 vars
var diameter = 30;
var squaresContainer = [];


// Sketch 1
var Sketch_1 = {
	setShapes: function() {
		for (var i = 0; i < samples; i ++) {
			var x = random(width);
			var y = random(height);
			// var shape = new Shape(x, y);
			var shape = new Shape(0, 0);
			squaresContainer.push(shape);
		}
	},

	draw: function() {
		var _self = this;

		/* CLEANER */
		background(0, 20);
		// Quitamos el contorno
		noStroke();
		// Actualizamos el análisis de muestreo
		var time = millis() * 0.003;
		var spectrum = fft.analyze();

		_self.brush(spectrum);
	},

	brush: function(audio_spectrum) {
		var _self = this;

		for (var i = 0; i < samples; i ++) {
			var size = map(audio_spectrum[i], 0, 255, 10, 80);
			var shape = squaresContainer[i];

			var vel_x = sin(map(audio_spectrum[i], 0, 255, -5, 5)) * 50;
			var vel_y = sin(map(audio_spectrum[i], 0, 255, -1, 1)) * 50;
			var pos_x = shape.x + vel_x;
			var pos_y = shape.y + vel_y;

			shape.x += (shape.x - pos_x) * cof;
			shape.y += (shape.y - pos_y) * cof;

			if (shape.x > width) {
				shape.x = 0;
			} else if (shape.x < 0) {
				shape.x = width;
			} else if (shape.y > height) {
				shape.y = 0;
			} else if (shape.y < 0) {
				shape.y = height;
			}

			stroke(audio_spectrum[i], 255, 255 );
			rect(shape.x, shape.y, size, size);
		}
	}
}


// Add sketch to list of sketches
Sketches.push(Sketch_1);

// Shape class to create squares
var Shape = function(x, y) {
	this.x = x;
	this.y = y;
}




