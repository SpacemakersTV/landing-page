let stars = [];

let speed;

var img;

let xspeed, yspeed;

let x, y;
var hue;

var h = 200;
var w = h * 1.188767551;

var mySvg;

var ang = 0,
	inc = 0;

var textS = 26.5;

function preload() {
	mySvg = loadImage("svg/logo-t.png");
	// font = loadFont("Helvetica neu")
}

function setup() {
	var canvas = createCanvas(displayWidth, displayHeight);
	canvas.parent("canvas");
	for (let i = 0; i < 1000; i++) {
		stars[i] = new Star();
	}

	x = canvas.width / 2;
	y = canvas.height / 2;

	xspeed = random(2, 4);
	yspeed = random(2, 4);

	console.log(xspeed, yspeed);

	hue = random(255);

	colorMode(HSB, 255);
}

function draw() {
	background(0);
	//speed = 25;//map(mouseX, 0, width, 0, 50);

	var media = window.matchMedia(
		"screen and (min-width: 320px) and (max-width: 767px)"
	);
	if (media.matches) {
		h = 100;
		w = h * 1.188767551;
		speed = 4;
		textS = 13.25;
	} else {
		h = 220;
		w = h * 1.188767551;
		speed = 10;
		textS = 29;
	}

	push();
	translate(width / 2, height / 2);
	for (let i = 0; i < stars.length; i++) {
		stars[i].update();
		stars[i].show();

		if (
			stars[i].sx > width ||
			stars[i].sx < 0 ||
			stars[i].sy > height ||
			stars[i].sy < 0
		) {
			stars[i].pop();
		}
	}
	pop();

	push();
	x += xspeed;
	y += yspeed;

	if (x > width - w / 2 || x < w / 2) {
		xspeed = -xspeed;
		hue = random(0, 255);
	}
	if (y > height - h || y < h / 2) {
		yspeed = -yspeed;
		hue = random(0, 255);
	}

	translate(x, y);
	rotate(ang);
	ang += inc;
	tint(hue, 100, 255);
	imageMode(CENTER);
	image(mySvg, 0, 0, w, h);
	noTint();
	fill(hue, 100, 255);
	textFont("Helvetica Neue");
	textSize(textS);
	textStyle(BOLD);
	text("SPACEMAKERS", -w / 2, h / 2 + textS);
	strokeWeight(10);
	stroke(255, 0, 255);
	pop();
}

function mousePressed() {
	var d = dist(mouseX, mouseY, x, y);
	if (d < w) {
		inc += 0.05;
	}
}
