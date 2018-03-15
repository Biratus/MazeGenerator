function Cell(x,y){
	this.x=x;this.y=y;

	this.sides=0b1111;

	this.visited=false;
	this.current=false;

	this.draw=function() {
		if(this.current) {
			ctx.fillStyle="#3ADF00";
			ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
			ctx.fillStyle="#00000";
		} else if(this.visited) {
			ctx.fillStyle="#610B5E";
			ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
			ctx.fillStyle="#00000";
		} 
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

	this.removeSide=function(side) {
		this.sides-=side;
	}

}

var SIDE_LEFT=1<<0;
var SIDE_RIGHT=1<<1;
var SIDE_UP=1<<2;
var SIDE_DOWN=1<<3;

var CELL_NB=20;
var CELL_SIZE;