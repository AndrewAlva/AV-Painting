// Sketch 1 vars
var diameter = 30;
var heartsContainer = [];


// Sketch 1
var Sketch_1 = {
	cFrame: 0,
	time: 0,
	setShapes: function() {
		for (var i = 0; i < samples; i ++) {
			// var x = random(width);
			// var y = random(height);
			
			var x = (width/samples)*i;
			var y = random(height);

			var shape = new Shape(x, y);
			// var shape = new Shape(0, 0);
			
			heartsContainer.push(shape);
		}
	},

	draw: function() {
		var _self = this;

		_self.cFrame+= 0.05;
		/* CLEANER */
		background(0, 20);
		// Quitamos el contorno
		noStroke();
		// Actualizamos el análisis de muestreo
		_self.time = millis() * 0.0003;
		var spectrum = fft.analyze();

		_self.brush(spectrum);
	},

	brush: function(audio_spectrum) {
		var _self = this;

		for (var i = 0; i < samples; i ++) {
			var size = map(audio_spectrum[i], 0, 255, 12, 120);
			var shape = heartsContainer[i];

			// var vel_x = cos(map(audio_spectrum[i], 0, 255, -2, 2)) * cos(_self.cFrame) * 50;
			var vel_x = cos(map(audio_spectrum[i], 0, 255, -2, 2)) * 20 * cos(_self.cFrame) * 2;
			// var vel_y = sin(map(audio_spectrum[i], 0, 255, -2, -3)) * 100;
			var vel_y = -50;
			var pos_x = shape.x + vel_x;
			var pos_y = shape.y + vel_y;

			shape.x -= ((shape.x - pos_x) * cof) / 2;
			shape.y -= ((shape.y - pos_y) * cof) / 4;

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
			// rect(shape.x, shape.y, size, size);
			_self.heart(shape.x, shape.y, size);
		}
	},

	heart: function heart(x, y, size) {
		beginShape();
		vertex(x, y);
		bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
		bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
		endShape(CLOSE);
	}
}


// Add sketch to list of sketches
Sketches.push(Sketch_1);

// Shape class to create squares
var Shape = function(x, y) {
	this.x = x;
	this.y = y;
}




