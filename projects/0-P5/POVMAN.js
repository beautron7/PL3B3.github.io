var trumpcards = [];
var trumpnum = 5;

function setup() {
	createCanvas(600, 600);
	for(var c = 0; c < trumpnum; c++) {
		trumpcards[c] = new trumpcard();
	}
}

function draw() {
	background(0);
	for(var c = 0; c < trumpnum; c++) {
		trumpcards[c].draw();
		trumpcards[c].move();
	}
}

function trumpcard() {
	this.position = [random(0, width), random(0, height)];
	this.trail = [[], []];
	this.radius = 10;
	this.momentum = [0, -7];
	this.time =  0;
	this.long = 100;
	this.turnspeed = 10;
	this.densityfactor = 5;
	this.draw = function() {
		// for(var c = 0; c < 2; c++) {
		if(this.time % this.densityfactor == 0) {
			this.trail[0][this.time] = this.position[0];
			this.trail[1][this.time] = this.position[1];
			this.trailer();
		}
		this.time += 1;
		if(this.time > this.long) {
			for(var d = 0; d < this.time; d++) {
				this.trail[0][d - 1] = this.trail[0][d];
				this.trail[1][d - 1] = this.trail[1][d];
			}
			this.time = this.long;
		}
		ellipse(this.position[0], this.position[1], 20, 20);
	}
	this.trailer = function() {
		for(var c = 0; c < this.time; c++) {
			if((c - 1) % this.densityfactor == 0)
			{
				ellipse(this.trail[0][c - 1] /*+ random(-.5, .5)*/, this.trail[1][c - 1] /*+ random(-.5, .5)*/, 20 /*+ random(0,5)*/, 20 /*random(0, 5)*/);
				fill(c * 2, random(0, 50), random(0, 100));
			}
		}
	}

	this.move = function() {
		//Main Movement
		if(keyIsDown(32)) {
			//Pressed Spaice
			// this.momentum[1] *= 1.1;
			// this.momentum[0] *= 1.1;
			this.turnspeed *= .9;
		}
		// if(keyIsDown(83)) {
		// 	this.momentum[1] += .5;
		// }
		if(keyIsDown(68)) {
				this.momentum[1] += (this.momentum[0] / (100 / this.turnspeed));
				this.momentum[0] -= (this.momentum[1] / (100 / this.turnspeed));
		}
		if(keyIsDown(65)) {
			this.momentum[1] -= (this.momentum[0] / (100 / this.turnspeed));
			this.momentum[0] += (this.momentum[1] / (100 / this.turnspeed));
		}
		this.position[0] += this.momentum[0];
		this.position[1] += this.momentum[1];
		if(this.position[0] < this.radius || this.position[0] > 600 - this.radius) {
			this.momentum[0] *= -1;
			this.momentum[1] *= 1;
			this.position[0] += ((width / 2) - this.position[0]) / 100;
		}
		if(this.position[1] < this.radius || this.position[1] > 600 - this.radius) {
			this.momentum[0] *= 1;
			this.momentum[1] *= -1;
			this.position[1] += ((height / 2) - this.position[1]) / 100;
		}
		// this.momentum[0] -= random(-1, 1);
		// this.momentum[1] += random(-1, 1);
		// if(second() % 2 == 0) {
		// 	this.momentum[0] *= random(-1, -.5);
		// }
		if(abs(this.momentum[0]) > 4) {
			this.momentum[0] *= .91;
		}
		if(abs(this.momentum[1]) > 4) {
			this.momentum[1] *= .91;
		}
		if(abs(this.momentum[0]) < .5) {
			this.momentum[0] *= 1.1;
		}
		if(abs(this.momentum[1]) < .5) {
			this.momentum[1] *= 1.1;
		}
		if(this.turnspeed < 10) {
			this.turnspeed *= 1.1;
			if(this.turnspeed < 7) {
				this.turnspeed *= 1.1;
				if(this.turnspeed < 5) {
					this.turnspeed *= 1.1;
				}
			}
		}
	}
}
// var trumpcard = {
// 	position: [300, 300],
// 	trail: [[], [], []],
// 	radius: 10,
// 	momentum: [0, -4],
// 	continue: false,
// 	time: 0,
// 	long: 200,
// 	turnspeed: 10,
// 	clock: function() {
// 		// for(var c = 0; c < 2; c++) {
// 			this.trail[0][this.time] = this.position[0];
// 			this.trail[1][this.time] = this.position[1];
// 			this.time += 1;
// 			this.trailer();
// 			if(this.time > this.long) {
// 				for(var d = 0; d < this.time; d++) {
// 					this.trail[0][d - 1] = this.trail[0][d];
// 					this.trail[1][d - 1] = this.trail[1][d];
// 				}
// 				this.time = this.long;
// 			}
// 	},
// 	trailer: function() {
// 		for(var c = 0; c < this.time; c++) {
// 			ellipse(this.trail[0][c - 1] /*+ random(-.5, .5)*/, this.trail[1][c - 1] /*+ random(-.5, .5)*/, 20 /*+ random(0,5)*/, 20 /*random(0, 5)*/);
// 			fill(random(0, 50), c, random(0, 100));
// 		}
// 	},
//
// 	move: function() {
// 		//Main Movement
// 		if(keyIsDown(32)) {
// 			//Pressed Spaice
// 			// this.momentum[1] *= 1.1;
// 			// this.momentum[0] *= 1.1;
// 			this.turnspeed *= .9;
// 		}
// 		// if(keyIsDown(83)) {
// 		// 	this.momentum[1] += .5;
// 		// }
// 		if(keyIsDown(68)) {
// 				this.momentum[1] += (this.momentum[0] / (100 / this.turnspeed));
// 				this.momentum[0] -= (this.momentum[1] / (100 / this.turnspeed));
// 		}
// 		if(keyIsDown(65)) {
// 			this.momentum[1] -= (this.momentum[0] / (100 / this.turnspeed));
// 			this.momentum[0] += (this.momentum[1] / (100 / this.turnspeed));
// 		}
// 		this.position[0] += this.momentum[0];
// 		this.position[1] += this.momentum[1];
// 		if(this.position[0] < this.radius || this.position[0] > 600 - this.radius) {
// 			this.momentum[0] *= -1;
// 			this.momentum[1] *= 1;
// 			this.position[0] += ((width / 2) - this.position[0]) / 100;
// 		}
// 		if(this.position[1] < this.radius || this.position[1] > 600 - this.radius) {
// 			this.momentum[0] *= 1;
// 			this.momentum[1] *= -1;
// 			this.position[1] += ((height / 2) - this.position[1]) / 100;
// 		}
// 		// this.momentum[0] -= random(-1, 1);
// 		// this.momentum[1] += random(-1, 1);
// 		// if(second() % 2 == 0) {
// 		// 	this.momentum[0] *= random(-1, -.5);
// 		// }
// 		if(abs(this.momentum[0]) > 4) {
// 			this.momentum[0] *= .91;
// 		}
// 		if(abs(this.momentum[1]) > 4) {
// 			this.momentum[1] *= .91;
// 		}
// 		if(abs(this.momentum[0]) < .5) {
// 			this.momentum[0] *= 1.1;
// 		}
// 		if(abs(this.momentum[1]) < .5) {
// 			this.momentum[1] *= 1.1;
// 		}
// 		if(this.turnspeed < 10) {
// 			this.turnspeed *= 1.1;
// 			if(this.turnspeed < 7) {
// 				this.turnspeed *= 1.1;
// 				if(this.turnspeed < 5) {
// 					this.turnspeed *= 1.1;
// 				}
// 			}
// 		}
// 	},
//
// 	insult: function() {
// 		if(trumpcard.time == true) {
//
// 		}
// 	},
// 	curve: function() {
// 		if(trumpcard.time == true) {
//
// 		}
// 	}
// };
