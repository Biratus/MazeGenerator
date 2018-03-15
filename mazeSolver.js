var mazeSolver;

function MazeSolver() {
	this.currentCell=cells[0];
	this.isActive=true;
	cells[Math.floor(Math.random() * cells.length)+Math.floor(CELL_NB*0.2)].target=true;
	this.currentCell.current=true;
	this.keyPress=function(e) {
		switch(e.keyCode) {
			case 40://down
			{
				var c = getCell(this.currentCell.x,this.currentCell.y+1);
				if(c) this.updatePosition(c);
				break;	
			}
			case 38://up
			{
				var c = getCell(this.currentCell.x,this.currentCell.y-1);
				if(c) this.updatePosition(c);
				break;	
			}
			case 37://left
			{
				var c = getCell(this.currentCell.x-1,this.currentCell.y);
				if(c) this.updatePosition(c);
				break;	
			}
			case 39://right
			{
				var c = getCell(this.currentCell.x+1,this.currentCell.y);
				if(c) this.updatePosition(c);
				break;	
			}
		}
		draw();
		if(this.currentCell.target) {
			this.isActive=false;
			console.log("WIN !!");
		}
	}
	this.updatePosition=function(cell) {
		if(this.currentCell.isOpenTo(cell)) {
			this.currentCell.current=false;
			this.currentCell=cell;
			this.currentCell.current=true;
			this.currentCell.solveVisited=true;
		}
	}
}

function getCell(x,y) {
	if(x<0 || y<0 || x>CELL_NB || y>CELL_NB) return null;
	else return cells[x+y*CELL_NB];
}

function startSolving() {
	mazeSolver=mazeSolver||new MazeSolver();
	draw();
}


window.addEventListener('keydown',function(e) {
	if(mazeSolver && mazeSolver.isActive) mazeSolver.keyPress(e);
});