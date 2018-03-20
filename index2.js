var cell_nb=20;
var cells=[],lines=[];
var ctx;
var count=0;
window.onload=function() {
	var canvas=document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	CELL_SIZE=canvas.width/cell_nb;
	for(var y = 0; y<cell_nb;y++) {
		for(var x=0;x<cell_nb;x++) {
			cells.push(new Cell(x,y,cells.length));
		}
	}

	for(var i in cells) cells[i].draw();
	update();
}

function update() {
	count++;
	var rnd,c,c2;
	do{
		rnd=Math.floor(Math.random()*cells.length);
		c = cells[rnd];
		c2=getRandomArround(c);
	} while(!c2);
	
	removeLineBetween(c,c2);
	setIndexForAll(c2.index,c.index);

	for(var i in cells) cells[i].draw();
	if(count<cell_nb*cell_nb-1) update();
	else transformToLine();
}

function transformToLine() {

}

function setIndexForAll(forIndex,toIndex) {
	for(var i in cells) if(cells[i].index==forIndex) cells[i].index=toIndex;
}

function removeLineBetween(cell1,cell2) {
	if(cell1.x==cell2.x) {//same column
		if(cell2.y>cell1.y) {//cell1 above cell2
			cell2.removeSide(SIDE_UP);
			cell1.removeSide(SIDE_DOWN);
		} else {
			cell1.removeSide(SIDE_UP);
			cell2.removeSide(SIDE_DOWN);
		}
	} else if(cell1.y==cell2.y) {//same line
		if(cell2.x>cell1.x) {//cell2 right of cell1
			cell2.removeSide(SIDE_LEFT);
			cell1.removeSide(SIDE_RIGHT);
		} else {
			cell1.removeSide(SIDE_LEFT);
			cell2.removeSide(SIDE_RIGHT);
		}
	}
}

function getRandomArround(cell) {
	var neigh=[];
	if(cell.x!=0) {//not on the left
		var c = cells[cell.x-1+cell.y*cell_nb];
		if(c.index!=cell.index) neigh.push(c);
	}
	if(cell.x+1<cell_nb) {//not on the right
		var c = cells[cell.x+1+cell.y*cell_nb];
		if(c.index!=cell.index) neigh.push(c);
	}
	if(cell.y!=0) {//not on the top
		var c = cells[cell.x+(cell.y-1)*cell_nb];
		if(c.index!=cell.index) neigh.push(c);
	}
	if(cell.y+1<cell_nb) {//not on bot
		var c = cells[cell.x+(cell.y+1)*cell_nb];
		if(c.index!=cell.index) neigh.push(c);
	}
	return neigh[Math.floor(Math.random()*neigh.length)];
}

function Cell(x,y,i) {
	this.x=x;
	this.y=y;
	this.index=i;


	this.sides=0b1111;
	//this.sides=0b0000;

	this.draw=function() {
		ctx.fillStyle="#ffffff";
		ctx.fillRect(this.x*CELL_SIZE,this.y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
		ctx.fillStyle="#00000";
		if(this.sides & SIDE_LEFT){
			ctx.beginPath();
			ctx.moveTo(this.x*CELL_SIZE,this.y*CELL_SIZE);
			ctx.lineTo(this.x*CELL_SIZE,this.y*CELL_SIZE+CELL_SIZE);
			ctx.stroke();
		} 
		if(this.sides & SIDE_RIGHT) {
			ctx.beginPath();
			ctx.moveTo(this.x*CELL_SIZE+CELL_SIZE,this.y*CELL_SIZE);
			ctx.lineTo(this.x*CELL_SIZE+CELL_SIZE,this.y*CELL_SIZE+CELL_SIZE);
			ctx.stroke();
		}
		if(this.sides & SIDE_UP) {
			ctx.beginPath();
			ctx.moveTo(this.x*CELL_SIZE,this.y*CELL_SIZE);
			ctx.lineTo(this.x*CELL_SIZE+CELL_SIZE,this.y*CELL_SIZE);
			ctx.stroke();
		}
		if(this.sides & SIDE_DOWN) {
			ctx.beginPath();
			ctx.moveTo(this.x*CELL_SIZE,this.y*CELL_SIZE+CELL_SIZE);
			ctx.lineTo(this.x*CELL_SIZE+CELL_SIZE,this.y*CELL_SIZE+CELL_SIZE);
			ctx.stroke();
		}
		
	}
	this.removeSide=function(side) {
		if(this.sides & side) this.sides-=side;
	}

}

var SIDE_LEFT=1<<0;
var SIDE_RIGHT=1<<1;
var SIDE_UP=1<<2;
var SIDE_DOWN=1<<3;

var CELL_SIZE;