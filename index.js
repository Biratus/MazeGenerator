var stackTrace=[];
var currIndex=0;
var FrameRate=25;
var cells=[];
var canvas;
var ctx;
//lol

window.onload=function() {
	canvas = document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	CELL_SIZE=canvas.width/CELL_NB;
	for(var y=0;y<CELL_NB;y++) {
		for(var x=0;x<CELL_NB;x++) {
			cells.push(new Cell(x,y));
		}
	}
	cells[currIndex].visited=true;
	cells[currIndex].current=true;
	stackTrace.push(currIndex);
	for(var i in cells) cells[i].draw();
	//update();
}

function update() {
	var nexts = getNeighbors(cells[currIndex]);
	cells[currIndex].current=false;
	if(nexts.length==0) {
		if(stackTrace.length==0) {
			console.log("Maze done");
			for(var i in cells) cells[i].draw();
			return;
		}
		currIndex=stackTrace.pop();
		cells[currIndex].current=true;
		for(var i in cells) cells[i].draw();
		setTimeout(update,FrameRate);
		return;
	}


	var rndInd = Math.floor(Math.random() * nexts.length);

	nexts[rndInd].visited=true;
	nexts[rndInd].current=true;

	removeLineBetween(cells[currIndex],nexts[rndInd]);

	currIndex=nexts[rndInd].x+nexts[rndInd].y*CELL_NB;
	stackTrace.push(currIndex);

	for(var i in cells) cells[i].draw();



	setTimeout(update,FrameRate);
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

function getNeighbors(cell) {
	var neigh=[];
	if(cell.x!=0) {//not on the left
		var c = cells[cell.x-1+cell.y*CELL_NB];
		if(!c.visited) neigh.push(c);
	}
	if(cell.x+1<CELL_NB) {//not on the right
		var c = cells[cell.x+1+cell.y*CELL_NB];
		if(!c.visited) neigh.push(c);
	}
	if(cell.y!=0) {//not on the top
		var c = cells[cell.x+(cell.y-1)*CELL_NB];
		if(!c.visited) neigh.push(c);
	}
	if(cell.y+1<CELL_NB) {//not on bot
		var c = cells[cell.x+(cell.y+1)*CELL_NB];
		if(!c.visited) neigh.push(c);
	}
	return neigh;
}