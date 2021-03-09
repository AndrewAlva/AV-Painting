// TODO
	// Create heart traces with cframe instead of not clearing canvas
	// improve movement and reaction to sound
		// select a different range from audio spectrum
		// use spectrum as acceleration but dont set minimum to 0, just make it slower
	// draw hearts only on specific range colors

// Sketch 1 vars
var diameter = 30;
var heartsContainer = [];
var heartTrace = 0;
var lifeSpan = 20;
var lifeSpeed = 0.1;


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
			let color = get(x, y);

			var shape = new Shape(x, y, color);
			// var shape = new Shape(0, 0);
			
			heartsContainer.push(shape);
		}
	},

	draw: function() {
		var _self = this;

		_self.cFrame+= cFrameSpeed;
		/* CLEANER */
		// background(0, 20);
		// image(img, 0, 0, canvasSize.x, canvasSize.y);

		// Quitamos el contorno
		noStroke();
		// Actualizamos el análisis de muestreo
		_self.time = millis() * 0.0003;
		var spectrum = fft.analyze();

		_self.brush(spectrum);
	},

	brush: function(audio_spectrum) {
		var _self = this;

		for (var i = 0; i < heartsContainer.length; i ++) {
			// var size = map(audio_spectrum[i], 0, 255, 20, 40);
			// var size = map(audio_spectrum[i], 0, 255, 5, 100);
			var size = map(audio_spectrum[parseInt(samples*.2)], 0, 255, 10, 180);
			var shape = heartsContainer[i];

			// for (let j = 1; j < heartTrace + 1; j++) {
			// 	let hCopy = new Shape(shape.x, shape.y, shape.color);
			// 	let customFrame = _self.cFrame + (j*10);
			// 	hCopy.y += 10 * j;

			// 	var vel_x = cos(map(audio_spectrum[3], 0, 255, -2, 2)) * 100 * cos(customFrame * 0.1 );
			// 	// var vel_y = -20;
			// 	var vel_y = sin(map(audio_spectrum[3], 0, 255, -2, -3)) * 100;
			// 	var pos_x = hCopy.x + vel_x;
			// 	var pos_y = hCopy.y + vel_y;

			// 	hCopy.x -= ((hCopy.x - pos_x) * cof) / 2;
			// 	hCopy.y -= ((hCopy.y - pos_y) * cof) / 4;

			// 	if (hCopy.x > width) {
			// 		hCopy.x = 0;
			// 	} else if (hCopy.x < 0) {
			// 		hCopy.x = width;
			// 	} else if (hCopy.y > height) {
			// 		hCopy.y = 0;
			// 	} else if (hCopy.y < 0) {
			// 		hCopy.y = height;
			// 	}

			// 	let color = get(hCopy.x, hCopy.y);
			// 	// let color = [255,0,0];
			// 	let mapLife = map(j, 1, heartTrace, 0, lifeSpan);
			// 	color[3] = map(mapLife, 0, lifeSpan, 0, 255);
			// 	fill(color);
			// 	// fill([255,180,180]);

			// 	_self.heart(hCopy.x, hCopy.y, size);
			// }

			
			// var vel_x = cos(map(audio_spectrum[i], 0, 255, -2, 2)) * cos(_self.cFrame) * 50;
			var vel_x = cos(map(audio_spectrum[i], 0, 255, -2, 2)) * 100 * cos(_self.cFrame * 0.05 );
			var vel_y = sin(map(audio_spectrum[i], 0, 255, -10, -1)) * 100;
			// var vel_y = -50;
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

			// stroke(audio_spectrum[i], 255, 255 );
			// rect(shape.x, shape.y, size, size);

			// fill([255,180,180]);
				// fill(shape.color);
			let color = img.get(shape.x, shape.y);
			// let color = [255,0,0];
			// color[3] = map(shape.life, 0, lifeSpan, 0, 255);
			// color[3] = 15;
			color[3] = map(audio_spectrum[i], 0, 255, 10, 30);
			fill(color);

			_self.heart(shape.x, shape.y, size);
			

			shape.life -= lifeSpeed;
			shape.color[3] = map(shape.life, 0, lifeSpan, 0, 255);
			if (shape.life <= 0) {
				// heartsContainer.splice(i, 1);
				// heartsContainer[i].x = heartsContainer[i].origin.x;
				// heartsContainer[i].y = heartsContainer[i].origin.y;
				heartsContainer[i].life = lifeSpan
			}
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
var Shape = function(x, y, color) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.life = lifeSpan;

	this.origin = {
		x,
		y
	}
}




