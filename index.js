var stackTrace=[];
var currIndex=0;
var FrameRate=10;
var cells=[];
var canvas;
var ctx;
var CELL_NB=10;
var timeout;

window.onload=function() {
	canvas = document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	initCell();
}

function update() {
	var nexts = getNeighbors(cells[currIndex]);
	cells[currIndex].setProperty("current",false);
	cells[currIndex].tryProperties();
	if(nexts.length==0) {
		if(stackTrace.length==0) {
			console.log("Maze done");
			startSolving();
			return;
		}
		currIndex=stackTrace.pop();
		cells[currIndex].setProperty("current",true);
		cells[currIndex].tryProperties();
		updateCells();
		timeout=setTimeout(update,FrameRate);
		return;
	}


	var rndInd = Math.floor(Math.random() * nexts.length);

	nexts[rndInd].setProperty("visited",true);
	nexts[rndInd].setProperty("current",true);
	nexts[rndInd].tryProperties();

	removeLineBetween(cells[currIndex],nexts[rndInd]);

	currIndex=nexts[rndInd].x+nexts[rndInd].y*CELL_NB;
	stackTrace.push(currIndex);

	updateCells();

	timeout = setTimeout(update,FrameRate);
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
		if(!c.getProperty("visited")) neigh.push(c);
	}
	if(cell.x+1<CELL_NB) {//not on the right
		var c = cells[cell.x+1+cell.y*CELL_NB];
		if(!c.getProperty("visited")) neigh.push(c);
	}
	if(cell.y!=0) {//not on the top
		var c = cells[cell.x+(cell.y-1)*CELL_NB];
		if(!c.getProperty("visited")) neigh.push(c);
	}
	if(cell.y+1<CELL_NB) {//not on bot
		var c = cells[cell.x+(cell.y+1)*CELL_NB];
		if(!c.getProperty("visited")) neigh.push(c);
	}
	return neigh;
}

function updateCells() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for(var i in cells) cells[i].update();
}

function initCell() {
	CELL_NB=document.getElementById("cellnb").value.length>0?document.getElementById("cellnb").value:CELL_NB;
	CELL_SIZE=canvas.width/CELL_NB;
	cells=[];
	for(var y=0;y<CELL_NB;y++) {
		for(var x=0;x<CELL_NB;x++) {
			var c = new Cell(x,y)
			c.addProperty("visited",false,function(cell){return !this.value;},function(cell){cell.color="#610B5E";});
			c.addProperty("current",false,function(cell){return true;},function(cell){cell.color=this.value?"#3ADF00":"#610B5E";});
			cells.push(c);
		}
	}
	currIndex=0;
	cells[currIndex].setProperty("current",true);
	cells[currIndex].setProperty("visited",true);
	cells[currIndex].tryProperties();
	stackTrace.push(currIndex);
	updateCells();
	update();
}