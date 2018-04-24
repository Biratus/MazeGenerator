function Exploration() {
    this.currIndex=0;
    this.stackTrace=[];

    this.init=function(){
        cells=[];
        for(let y=0;y<CELL_NB;y++) {
            for(let x=0;x<CELL_NB;x++) {
                cells.push(new ExplorationCell(x,y));
            }
        }
        this.currIndex=0;
        cells[this.currIndex].current=true;
        cells[this.currIndex].visited=true;
        this.stackTrace.push(this.currIndex);
    }

    this.update=function(){
        let nexts = this.getNeighbors(cells[this.currIndex]);
        cells[this.currIndex].current=false;
        if(nexts.length==0) {
            if(this.stackTrace.length==0) {
                console.log("Maze done");
                stop();
                return;
            }
            this.currIndex=this.stackTrace.pop();
            cells[this.currIndex].current=true;
            return;
        }


        let rndInd = Math.floor(Math.random() * nexts.length);

        nexts[rndInd].visited=true;
        nexts[rndInd].current=true;

        this.removeLineBetween(cells[this.currIndex],nexts[rndInd]);

        this.currIndex=nexts[rndInd].x+nexts[rndInd].y*CELL_NB;
        this.stackTrace.push(this.currIndex);
    }

    this.removeLineBetween=function(cell1,cell2){
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

    this.getNeighbors=function(cell){
        var neigh=[];
        if(cell.x!=0) {//not on the left
            let c = cells[cell.x-1+cell.y*CELL_NB];
            if(!c.visited) neigh.push(c);
        }
        if(cell.x+1<CELL_NB) {//not on the right
            let c = cells[cell.x+1+cell.y*CELL_NB];
            if(!c.visited) neigh.push(c);
        }
        if(cell.y!=0) {//not on the top
            let c = cells[cell.x+(cell.y-1)*CELL_NB];
            if(!c.visited) neigh.push(c);
        }
        if(cell.y+1<CELL_NB) {//not on bot
            let c = cells[cell.x+(cell.y+1)*CELL_NB];
            if(!c.visited) neigh.push(c);
        }
        return neigh;
    }
}

function ExplorationCell(x,y){
    this.x=x;this.y=y;

    this.sides=0b1111;

    this.visited=false;
    this.current=false;

    this.color="#ffffff";

    this.draw=function() {
        if(this.current) {
            this.color="#3ADF00";
        } else if(this.visited) {
            this.color="#610B5E";
        } else this.color="#ffffff";

        ctx.fillStyle=this.color;
        ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
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
    }

    this.removeSide=function(side) {
        this.sides-=side;
    }
}