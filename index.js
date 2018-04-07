var canvas;
var ctx;

var TimeRate=500;
var cells=[];

var interval;

var CELL_NB=10;
var CELL_SIZE;

const SIDE_LEFT=1<<0;
const SIDE_RIGHT=1<<1;
const SIDE_UP=1<<2;
const SIDE_DOWN=1<<3;

var currentAlgo;

window.onload=function() {
    $("#timeRate_slider").on("change",function(event) {
        TimeRate=$(this).val();
        $("#timeRate").text("Time Rate : "+TimeRate);
        stop();
        interval=setInterval(function(currAlgo){
            currAlgo.update();
            updateCells();
        },TimeRate,currentAlgo);
    });

    canvas = document.getElementById("canvas");
    ctx=canvas.getContext("2d");
    CELL_SIZE=canvas.width/CELL_NB;
    currentAlgo=new Exploration();
    start();
}

function start() {
    stop();
    currentAlgo.init();
    interval=setInterval(function(currAlgo){
        currAlgo.update();
        updateCells();
    },TimeRate,currentAlgo);
}

function stop() {
    clearInterval(interval);
}

function firstAlgo() {//Exploration!
    stop();
    currentAlgo=new Exploration();
    start();

}

function secAlgo() {//Fusion!
    stop();
    currentAlgo=new Fusion();
    start();

}

function changeCellNb() {
    CELL_NB=document.getElementById("cellnb").value>0?document.getElementById("cellnb").value:CELL_NB;
    CELL_SIZE=canvas.width/CELL_NB;
    start();
}

function updateCells(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let c of cells) c.draw();
}