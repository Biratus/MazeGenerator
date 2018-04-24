function Fusion() {
    this.count=0;

    this.init=function() {
        this.count=0;
        this.highlightLine=true;
        
        cells=[];
        for(let y = 0; y<CELL_NB;y++) {
            for(let x=0;x<CELL_NB;x++) {
                cells.push(new FusionCell(x,y,cells.length));
            }
        }
    }

    this.update=function() {
        if(this.highlightLine) {//pick line to remove/highlight
            let rnd,cell1,cell2;
            do{
                rnd=Math.floor(Math.random()*cells.length);
                cell1 = cells[rnd];
                cell2=this.getRandomArround(cell1);
            } while(!cell2);

            this.highlightLineBetween(cell1,cell2);
            this.pickedLine={cell1,cell2}
            this.highlightLine=false;
        } else {//remove line picked
            this.count++;
            let {cell1, cell2} = this.pickedLine;
            this.removeLineBetween(cell1,cell2);
            this.setIndexForAll(cell2.index,cell1.index);

            this.highlightLine=true;
        }
        if(this.count>=CELL_NB*CELL_NB-1) {
            stop();
            alert("Maze done");
        }
    }

    this.setIndexForAll=function(forIndex,toIndex) {
        for(let c of cells) if(c.index==forIndex) c.index=toIndex;
    }

    this.removeLineBetween=function(cell1,cell2) {
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

    this.getRandomArround=function(cell) {
        var neigh=[];
        if(cell.x!=0) {//not on the left
            var c = cells[cell.x-1+cell.y*CELL_NB];
            if(c.index!=cell.index) neigh.push(c);
        }
        if(cell.x+1<CELL_NB) {//not on the right
            var c = cells[cell.x+1+cell.y*CELL_NB];
            if(c.index!=cell.index) neigh.push(c);
        }
        if(cell.y!=0) {//not on the top
            var c = cells[cell.x+(cell.y-1)*CELL_NB];
            if(c.index!=cell.index) neigh.push(c);
        }
        if(cell.y+1<CELL_NB) {//not on bot
            var c = cells[cell.x+(cell.y+1)*CELL_NB];
            if(c.index!=cell.index) neigh.push(c);
        }
        return neigh[Math.floor(Math.random()*neigh.length)];
    }

    this.highlightLineBetween=function(cell1,cell2) {
        if(cell1.x==cell2.x) {//same column
            if(cell2.y>cell1.y) {//cell1 above cell2
                cell2.highlight=SIDE_UP;
                cell1.highlight=SIDE_DOWN;
            } else {
                cell1.highlight=SIDE_UP;
                cell2.highlight=SIDE_DOWN;
            }
        } else if(cell1.y==cell2.y) {//same line
            if(cell2.x>cell1.x) {//cell2 right of cell1
                cell2.highlight=SIDE_LEFT;
                cell1.highlight=SIDE_RIGHT;
            } else {
                cell1.highlight=SIDE_LEFT;
                cell2.highlight=SIDE_RIGHT;
            }
        }
    }
}

function FusionCell(x,y,i) {
    this.x=x;
    this.y=y;
    this.index=i;

    this.sides=0b1111;

    this.highlight;
    
    this.draw=function() {
        console.log('draw');
        ctx.fillStyle="#ffffff";
        ctx.fillRect(this.x*CELL_SIZE,this.y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
        ctx.fillStyle="#00000";
        ctx.str
        if(this.sides & SIDE_LEFT){
            if(this.highlight===SIDE_LEFT) {
                ctx.strokeStyle="#ff0000";
                ctx.lineWidth=3;
            }
            ctx.beginPath();
            ctx.moveTo(this.x*CELL_SIZE,this.y*CELL_SIZE);
            ctx.lineTo(this.x*CELL_SIZE,this.y*CELL_SIZE+CELL_SIZE);
            ctx.stroke();
            ctx.strokeStyle="#000000";
            ctx.lineWidth=1;    
        } 
        if(this.sides & SIDE_RIGHT) {
            if(this.highlight===SIDE_RIGHT) {
                ctx.strokeStyle="#ff0000";
                ctx.lineWidth=3;
            }
            ctx.beginPath();
            ctx.moveTo(this.x*CELL_SIZE+CELL_SIZE,this.y*CELL_SIZE);
            ctx.lineTo(this.x*CELL_SIZE+CELL_SIZE,this.y*CELL_SIZE+CELL_SIZE);
            ctx.stroke();
            ctx.strokeStyle="#000000";
            ctx.lineWidth=1;    
        }
        if(this.sides & SIDE_UP) {
            if(this.highlight===SIDE_UP) {
                ctx.strokeStyle="#ff0000";
                ctx.lineWidth=3;
            }
            ctx.beginPath();
            ctx.moveTo(this.x*CELL_SIZE,this.y*CELL_SIZE);
            ctx.lineTo(this.x*CELL_SIZE+CELL_SIZE,this.y*CELL_SIZE);
            ctx.stroke();
            ctx.strokeStyle="#000000";
            ctx.lineWidth=1;    
        }
        if(this.sides & SIDE_DOWN) {
            if(this.highlight===SIDE_DOWN) {
                ctx.strokeStyle="#ff0000";
                ctx.lineWidth=3;
            }
            ctx.beginPath();
            ctx.moveTo(this.x*CELL_SIZE,this.y*CELL_SIZE+CELL_SIZE);
            ctx.lineTo(this.x*CELL_SIZE+CELL_SIZE,this.y*CELL_SIZE+CELL_SIZE);
            ctx.stroke();
            ctx.strokeStyle="#000000";
            ctx.lineWidth=1;    
        }

    }

    this.removeSide=function(side) {
        if(this.sides & side) this.sides-=side;
    }

}