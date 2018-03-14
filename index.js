window.onload=function() {
	canvas = document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	for(var x=0;x<canvas.width;x+=CELL_SIZE) {
		for(var y=0;y<canvas.height;y+=CELL_SIZE) {
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

}

function getCell(i,j) {

}

var currIndex=0;
var FrameRate=100;
var cells=[];
var canvas;
var ctx;