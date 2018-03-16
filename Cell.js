function Cell(x,y){
	this.x=x;this.y=y;

	this.sides=0b1111;

	this.visited=false;
	this.target=false;
	this.current=false;

	this.color="#ffffff";

	this.solveVisited=false;

	this.properties=[];

	this.update=function() {
		
		this.draw();
	}

	this.draw=function() {
		/*if(this.current) {
			this.color="#3ADF00";
		} else if(this.properties["target"]) {
			this.color="#FE2E2E";
		} else this.color="#610B5E";*/
		
		ctx.fillStyle=this.color;
		ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
		ctx.fillStyle="#00000";
		if(this.sides & SIDE_LEFT){
			ctx.beginPath();
			ctx.moveTo(x*CELL_SIZE,y*CELL_SIZE);
			ctx.lineTo(x*CELL_SIZE,y*CELL_SIZE+CELL_SIZE);
			ctx.stroke();
		} 
		if(this.sides & SIDE_RIGHT) {
			ctx.beginPath();
			ctx.moveTo(x*CELL_SIZE+CELL_SIZE,y*CELL_SIZE);
			ctx.lineTo(x*CELL_SIZE+CELL_SIZE,y*CELL_SIZE+CELL_SIZE);
			ctx.stroke();
		}
		if(this.sides & SIDE_UP) {
			ctx.beginPath();
			ctx.moveTo(x*CELL_SIZE,y*CELL_SIZE);
			ctx.lineTo(x*CELL_SIZE+CELL_SIZE,y*CELL_SIZE);
			ctx.stroke();
		}
		if(this.sides & SIDE_DOWN) {
			ctx.beginPath();
			ctx.moveTo(x*CELL_SIZE,y*CELL_SIZE+CELL_SIZE);
			ctx.lineTo(x*CELL_SIZE+CELL_SIZE,y*CELL_SIZE+CELL_SIZE);
			ctx.stroke();
		}
	}

	this.tryProperties=function() {
		for(var key in this.properties) {
			if(this.properties[key].test && this.properties[key].test(this)) {
				this.properties[key].ontestcomplete(this);
			}
		}
	}

	this.removeSide=function(side) {
		this.sides-=side;
	}

	this.isOpenTo=function(cell) {
		if(this.x==cell.x) {//same column
			if(cell.y>this.y) {//this above cell
				return !(this.sides & SIDE_DOWN);
			} else {
				return !(this.sides & SIDE_UP);
			}
		} else if(this.y==cell.y) {//same line
			if(cell.x>this.x) {//cell right of this
				return !(this.sides & SIDE_RIGHT);
			} else {
				return !(this.sides & SIDE_LEFT);
			}
		}
	}

	this.addProperty=function(key,value,test,testcomplete) {
		this.properties[key]={"value":value,"test":test,"ontestcomplete":testcomplete};
	}

	this.setProperty=function(key,value) {
		if(this.properties[key]) {
			this.properties[key].value=value;
		}
	}

	this.getProperty=function(key) {
		return this.properties[key].value;
	}
}

var SIDE_LEFT=1<<0;
var SIDE_RIGHT=1<<1;
var SIDE_UP=1<<2;
var SIDE_DOWN=1<<3;

var CELL_SIZE;