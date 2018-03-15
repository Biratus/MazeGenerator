window.onload=function() {
	canvas = document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	CELL_SIZE=canvas.width/CELL_NB;
	for(var y=0;y<canvas.height;y+=CELL_SIZE) {
		for(var x=0;x<canvas.width;x+=CELL_SIZE) {
			cells.push(new Cell(x,y));
		}
	}

	update();
}

function update() {

	var nexts = getNeighbors(cells[currIndex]);

	for(var i in cells) cells[i].draw();



	//setTimeout(update,FrameRate);
}

function getNeighbors(cell) {
	var neigh=[];
	if(cell.x!=0) {//not on the left
		
	}
	if(cell.x+CELL_SIZE+1<canvas.width) {//not on the right

	}
	if(cell.y!=0) {//not on the top

	}
	if(cell.y+CELL_SIZE+1<canvas.height) {//not on bot

	}
	return neigh;
}

function getCell(i,j) {

}

var currIndex=0;
var FrameRate=100;
var cells=[];
var canvas;
var ctx;