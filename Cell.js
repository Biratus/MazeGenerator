function Cell(x,y){
	this.x=x;this.y=y;

	this.sides=0b1111;

	this.visited=false;
	this.target=false;
	this.current=false;

	this.solveVisited=false;

	this.draw=function() {
		if(this.current) {
			ctx.fillStyle="#3ADF00";
			ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
			ctx.fillStyle="#00000";
		} else if(this.target) {
			ctx.fillStyle="#FE2E2E";
			ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
			ctx.fillStyle="#00000";
		} else if(this.visited) {
			ctx.fillStyle="#610B5E";
			ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
			ctx.fillStyle="#00000";
		} 
		if(this.solveVisited) {
			ctx.fillStyle="#3ADF00";
			ctx.fillRect(x*CELL_SIZE+CELL_SIZE/3,y*CELL_SIZE+CELL_SIZE/3,CELL_SIZE/3,CELL_SIZE/3);
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

}

var SIDE_LEFT=1<<0;
var SIDE_RIGHT=1<<1;
var SIDE_UP=1<<2;
var SIDE_DOWN=1<<3;

var CELL_SIZE;