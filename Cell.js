function Cell(x,y){
	this.x=x;this.y=y;

	this.sides=0b1111;

	this.visited=false;

	this.draw=function() {
		if(this.sides & SIDE_LEFT){
			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(x,y+CELL_SIZE);
			ctx.stroke();
		} 
		if(this.sides & SIDE_RIGHT) {
			ctx.beginPath();
			ctx.moveTo(x+CELL_SIZE,y);
			ctx.lineTo(x+CELL_SIZE,y+CELL_SIZE);
			ctx.stroke();
		}
		if(this.sides & SIDE_UP) {
			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(x+CELL_SIZE,y);
			ctx.stroke();
		}
		if(this.sides & SIDE_DOWN) {
			ctx.beginPath();
			ctx.moveTo(x,y+CELL_SIZE);
			ctx.lineTo(x+CELL_SIZE,y+CELL_SIZE);
			ctx.stroke();
		}
	}



}

var SIDE_LEFT=1<<0;
var SIDE_RIGHT=1<<1;
var SIDE_UP=1<<2;
var SIDE_DOWN=1<<3;

var CELL_SIZE=20;