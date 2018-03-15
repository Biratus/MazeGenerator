var mazeSolver;

function MazeSolver() {
	this.currentCell=cells[0];
	this.isActive=false;
	this.keyPress=function(e) {
		switch(e.keyCode) {
			case 40://down
			{
				var c = getCell(this.currentCell.x,this.currentCell.y+1);
				if(c) updatePosition(c);
				break;	
			}
			case 38://up
			{
				var c = getCell(this.currentCell.x,this.currentCell.y-1);
				if(c) updatePosition(c);
				break;	
			}
			case 37://left
			{
				var c = getCell(this.currentCell.x-1,this.currentCell.y);
				if(c) updatePosition(c);
				break;	
			}
			case 39://right
			{
				var c = getCell(this.currentCell.x+1,this.currentCell.y);
				if(c) updatePosition(c);
				break;	
			}
		}
	}
}

function getCell(x,y) {
	if(x<0 || y<0 || x>CELL_NB || y>CELL_NB) return null;
	else return cells[x+y*CELL_NB];
}

function startSolving() {
	mazeSolver=new MazeSolver();
}


window.addEventListener('keydown',function(e) {
	if(mazeSolver) mazeSolver.keyPress(e);
});