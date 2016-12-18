var samplesize = 100;
var stratify = 5;
var diam = 24;
var proto = ["race", "gender", "age", "offense_class", "offense_type", "offense_subtype", "release_type", "recidivism", "recidivism_type", "recidivism_days", "new_offense_class", "new_offense_type", "new_offense_subtype"];
var names = ["race", "gender", "age", "offense_class", "offense_type", "offense_subtype", "release_type", "recidivism", "recidivism_type", "recidivism_days", "new_offense_class", "new_offense_type", "new_offense_subtype"];
var people = [];
var types = [];
var bodo;
function preload() {
  bodo = loadJSON('/Data/recidivism.json');
}
function setup() {
  init();
  createCanvas(600, 600);
  //say(bodo);
  //stratify = prompt("enter stratnum");
}
function draw() {
	colorMode(HSB);
	background(50);
	for(var p = 0; p < samplesize; p++) {
		people[p].move();
		people[p].draw();
		fill(0, 0, 100);
	}
	//console.log("HI");
}
function init() {
  //Initializes all values of array proto as objects
  for(var a = 0; a < proto.length; a++) {
    proto[a] = [];
	proto[a].attribnum = 0;
  }
  for(var p = 0; p < samplesize; p++) {
	  people[p] = new Blob(bodo);	  
	  people[p].getdata();
  }
}
/*
function say(d) {
  for(var c = 0; c < samplesize; c++) {
    //define ephemdata as a random member of data array
    ephemdata = d.data[Math.round(random(0, 17030))];
    for(var m = 9; m < 22; m++) {
      //append element of ephemdata to attribute in proto
      proto[m - 9][ephemdata[m]] += 1;
      if(isNaN(proto[m - 9][ephemdata[m]]) == true) {
        proto[m - 9][ephemdata[m]] = 1;
		append(colortypes, []);
      }
	  //proto[m - 9].attribnum += 1;
    }
    // console.log(ephemdata);
  }
	//blobs[c] = new Blob();
  console.log(proto);
}
*/
function Blob(r) {
	this.attributes = [];
	this.getdata = function() {
		ephemdata = r.data[Math.round(random(0, 17030))];
		for(var m = 10; m < 25; m++) {
			//append element of ephemdata to attribute in proto
			this.attributes[m - 10] = ephemdata[m];
		}
	}
	this.movestats = [random(10, 590), random(10, 590), 0, 0];
	this.draw = function() {
		stroke(20);
		strokeWeight(2);
		ellipse(this.movestats[0], this.movestats[1], diam, diam);
		fill(0);
		noStroke();
		/*
		text(this.attributes[stratify].charAt(0), this.movestats[0] - 10, this.movestats[1] + 3);
		text(this.attributes[stratify].charAt(1), this.movestats[0] - 5, this.movestats[1] + 3);
		text(this.attributes[stratify].charAt(2), this.movestats[0] + 1, this.movestats[1] + 3);
		text(this.attributes[stratify].charAt(3), this.movestats[0] + 7, this.movestats[1] + 3);
		*/
		text(this.attributes[stratify].substr(0, 4), this.movestats[0] - (diam / 2) + 1, this.movestats[1] + 3);
		textStyle(BOLD);
		textSize(8.5);
		fill(100, 100, 100);
	}
	this.move = function() {
		this.movestats[0] += this.movestats[2];
		this.movestats[1] += this.movestats[3];
		//aggregate
		for(var l = 0; l < samplesize; l++) {
			if(this.attributes[stratify] == people[l].attributes[stratify]) {
				this.movestats[2] -= (this.movestats[0] - people[l].movestats[0]) / 4000;
				this.movestats[3] -= (this.movestats[1] - people[l].movestats[1]) / 4000;
				append(types, this.attributes[stratify]);
				//people[l].color[0] = this.color[0];
			}
			if(abs((this.movestats[0] + 5) - (people[l].movestats[0] + 5)) < diam / 1.5 && abs((this.movestats[1] + 5) - (people[l].movestats[1] + 5)) < diam/1.5) {	
				this.movestats[2] -= (people[l].movestats[0] - this.movestats[0]) / (diam);
				this.movestats[3] -= (people[l].movestats[1] - this.movestats[1]) / (diam);
			}
		}
		this.movestats[2] *= .9;
		this.movestats[3] *= .9;
	}
}
/*
//centroid based
{
	for(var j = 1; j < 0; j++) {
		if(coordinates[0] == NULL) {
		
		}
		else {
		
		}
	}
	append(coordinates[this.attributes[stratify]][x], this.movestats[0]);
	append(coordinates[this.attributes[stratify]][y], this.movestats[1]);
}
{
	
*/
}