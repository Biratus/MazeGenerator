function Ant(cell) {
    this.currCell=cell;
    this.cellTrace=[];

    this.color="#000000";
    this.dead=false;

    this.next=function() {
        this.cellTrace.push(this.currCell);
        let possibleCell=antManager.getNeighborCell(this.currCell);

        possibleCell = possibleCell.filter(c => !this.cellTrace.includes(c));
        if(possibleCell.length==0) {
            this.color="#ff0000";
            this.dead=true;
            this.onDie();
            return;

        } else if(possibleCell.length==1) {
            this.currCell=possibleCell[0];
            return;
        }

        let totFitness=possibleCell.reduce((acc,c) => acc+=c.pheromones,0);
        if(totFitness==0) {
            this.currCell=possibleCell[Math.floor(Math.random()*possibleCell.length)];
        } else {
            let probArr=possibleCell.map(c => c.pheromones/totFitness);
            
            probArr.sort((c1,c2) => c1-c2);
            console.log(probArr);
            let rnd=Math.random();
            let sum=0;
            for(let i in probArr) {
                sum+=prob[i];
                if(sum>=rnd) {
                    this.currCell=possibleCell[i];
                    return;
                }
            }
        }
    }

    this.draw=function(ctx) {
        ctx.fillStyle=this.color;
        ctx.fillRect(this.currCell.x*CELL_SIZE-antSize/2+CELL_SIZE/2,this.currCell.y*CELL_SIZE-antSize/2+CELL_SIZE/2,antSize,antSize);
    }

    this.onDie=function() {
        this.fitness=(antManager.target.index()-this.currCell.index())/antManager.target.index();
        this.cellTrace.map(c => c.pheromones+=this.fitness);
    }
}

var antManager;
var antSize=10;

function addAnt() {

}

function Cell(x,y,sides,i) {
    this.x=x;
    this.y=y;

    this.index=function() {
        return antManager.cells.indexOf(this);
    }

    this.sides=sides;
    this.pheromones=0;

    this.draw=function() {console.log('draw');}

    this.draw=function(ctx) {
        ctx.fillStyle="#ffffff";
        //ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
        ctx.fillStyle="#00000";
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
        ctx.beginPath();
        ctx.fillStyle='rgba(0,0,0,'+this.pheromones*antManager.maxPheromones()+')';
        ctx.arc(this.x*CELL_SIZE+CELL_SIZE/2,this.y*CELL_SIZE+CELL_SIZE/2,10,0,Math.PI*2);
        ctx.fill();
    }
}

function AntManager(cells) {
    this.cells=[];
    for(let c of cells) {
        this.cells.push(new Cell(c.x,c.y,c.sides));
    }

    this.ants=[];

    let canvas=document.getElementById("antCanvas");
    this.ctx=canvas.getContext('2d');

    this.getNeighborCell=function(cell) {
        var neigh=[];
        if(cell.x!=0 && !(cell.sides & SIDE_LEFT)) {//not on the left
            var c = this.cells[cell.x-1+cell.y*CELL_NB];
            //Can go to other cell
            neigh.push(c);
        }
        if(cell.x+1<CELL_NB && !(cell.sides & SIDE_RIGHT)) {//not on the right
            var c = this.cells[cell.x+1+cell.y*CELL_NB];
            //Can go to other cell
            neigh.push(c);
        }
        if(cell.y!=0 && !(cell.sides & SIDE_UP)) {//not on the top
            var c = this.cells[cell.x+(cell.y-1)*CELL_NB];
            //Can go to other cell
            neigh.push(c);
        }
        if(cell.y+1<CELL_NB && !(cell.sides & SIDE_DOWN)) {//not on bot
            var c = this.cells[cell.x+(cell.y+1)*CELL_NB];
            //Can go to other cell
            neigh.push(c);
        }
        return neigh;
    }

    this.target=this.cells[this.cells.length-1];

    this.updateInterval;
    this.frameRate=1000;
    this.start=function() {
        this.ants.push(new Ant(this.cells[0]));
        this.updateInterval=setInterval(() => this.update(),this.frameRate);

    }

    this.update=function() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        this.ctx.clearRect(0,0,canvas.width,canvas.height);

        for(let c of this.cells) {
            c.draw(ctx);
        }

        for(let ant of this.ants) {
            if(!ant.dead) ant.next();
            ant.draw(this.ctx);
        }
    }

    this.addAnt=function(){
        this.ants.push(new Ant(this.cells[0]));
    }

    this.stop=function() {
        clearInterval(this.updateInterval);
    }

    this.maxPheromones=function() {
        return this.cells.reduce((acc,c) => acc+=c.pheromones,0);
    }
}