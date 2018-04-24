var mazeSolver;

function MazeSolver() {
	this.currentCell=cells[0];
	this.isActive=true;
	var rnd=Math.floor(Math.random() * cells.length-Math.floor(CELL_NB*0.2))+Math.floor(CELL_NB*0.2);
	cells[rnd].addProperty("target","",function(cell){return true;},function(cell){mazeSolver.isActive=false;
			console.log("WIN !!");});
	cells[rnd].color="#ff0000";
	this.currentCell.setProperty("current",true);

	var rnd1 = Math.floor(Math.random() * cells.length);
	var rnd2 = Math.floor(Math.random() * cells.length);

	cells[rnd1].addProperty("portal",rnd2,function(cell){
		return cell.getProperty("portalState")=="idle";
	},function(cell) {
		cell.color="#8181F7";
		mazeSolver.currentCell.setProperty("current",false);
		mazeSolver.currentCell.setProperty("portalState","done");
		mazeSolver.currentCell=cells[this.value];
		mazeSolver.currentCell.setProperty("current",true);
		mazeSolver.currentCell.setProperty("portalState","done");
		updateCells();
	});
	cells[rnd1].addProperty("portalState","idle");
	cells[rnd1].color="#8181F7";

	cells[rnd2].addProperty("portal",rnd1,function(cell){
		return cell.getProperty("portalState")=="idle";
	},function(cell) {
		console.log("try 2");
		cell.color="#2ECCFA";
		mazeSolver.currentCell.setProperty("current",false);
		mazeSolver.currentCell.setProperty("portalState","done");
		mazeSolver.currentCell=cells[this.value];
		mazeSolver.currentCell.setProperty("current",true);
		mazeSolver.currentCell.setProperty("portalState","done");
		updateCells();
	});

	cells[rnd2].addProperty("portalState","idle");
	cells[rnd2].color="#2ECCFA";

	updateCells();


	this.keyPress=function(e) {
		console.log("key press");
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
		this.currentCell.tryProperties();
		updateCells();
		
	}
	this.updatePosition=function(cell) {
		if(this.currentCell.isOpenTo(cell)) {
			//console.log(cell.x+" "+cell.y);
			this.currentCell.setProperty("current",false);
		this.currentCell.tryProperties();
			this.currentCell=cell;
			this.currentCell.setProperty("current",true);
		this.currentCell.tryProperties();
		}
	}
}

function getCell(x,y) {
	if(x<0 || y<0 || x>CELL_NB || y>CELL_NB) return null;
	else return cells[x+y*CELL_NB];
}

function startSolving() {
	mazeSolver=mazeSolver||new MazeSolver();
	updateCells();
	mazeSolver.currentCell.tryProperties();
}


window.addEventListener('keydown',function(e) {
	if(mazeSolver && mazeSolver.isActive) mazeSolver.keyPress(e);
});