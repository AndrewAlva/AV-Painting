// General vars
var Sketches = [];
var currentSketch = 0;

// Canvas size vars
var canvasContainer = document.getElementById('canvas-container');
var canvasSize = {
	x: canvasContainer.getBoundingClientRect().width, 
	y: canvasContainer.getBoundingClientRect().height
};
var halfWidth = canvasSize.x / 2;
var halfHeight = canvasSize.y / 2;

// p5 vars
var song;
var _smooth = 0.83; // Suavizado
// var samples = 1024; // Número de muestras a analizar
var samples = 64; // Número de muestras a analizar
/* FFT: Fast Fourier Transform (Transformada rápida de Fourier) */
var fft = new p5.FFT(_smooth, samples);
var cFrame = 0;
const PI2 = Math.PI * 2;
var cof = 0.1;


function preload() {
	// song = loadSound('./music/beer.mp3');
	song = loadSound('./music/Just-Hold-On.mp3');
}

function setCanvasSize() {
	canvasSize.x = canvasContainer.getBoundingClientRect().width;
	canvasSize.y = canvasContainer.getBoundingClientRect().height;
}

function setup() {
	setCanvasSize();
	var canvas = createCanvas(canvasSize.x, canvasSize.y);
	canvas.parent('canvas-container');
	colorMode(HSB, 255);

	canvas.mousePressed(playSong);
	fft.setInput(song);

	// Sketch 1 setup
	noFill();
	stroke(255);
	strokeWeight(lines_weight);

	lines_angle = PI2 / samples;

	// Sketch 2 setup
	Sketch_1.setShapes();
}

function windowResized() {
	setCanvasSize();
	halfWidth = canvasSize.x / 2;
	halfHeight = canvasSize.y / 2;
	resizeCanvas(canvasSize.x, canvasSize.y);
	background(0);
}

function playSong() {
	if (song.isPlaying()) {
		song.pause();
	} else {
		song.loop();
	}
}

function draw() {
	Sketches[currentSketch].draw();
}


function keyPressed() {
	// Switch sketches
	if (keyCode == 32) {
		// Go forward and reset when limit reached
		currentSketch ++;
		if (currentSketch >= Sketches.length) {
			currentSketch = 0;
		}

		console.log('currentSketch: ' + currentSketch);
	}


	// Sketch 1: Spiral
	else if (keyCode == 38) {
		// UP
		spiral_turns+= 0.5;
	} else if (keyCode == 40) {
		// DOWN
		spiral_turns-= 0.5;
	}

	spiral_factor = 1.4 * spiral_turns;
}






// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
	// Do something
});


// Trigger functions after page is completely loaded
window.onload = function() {
	// Do something, remove preloader perhaps
	console.log("Page fully loaded.");
	console.log("Initialize.js");

	document.querySelector('.artist-logo').classList.add('show');
	document.querySelector('.title-container').classList.add('show');
	document.querySelector('.artwork-img').classList.add('show');
	
}