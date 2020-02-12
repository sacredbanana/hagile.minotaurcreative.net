/**
 * Created by harrisonmarley on 9/15/2016.
 */

var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");
ctx.fillStyle="#38b555";

gridHeight = 400;
gridWidth = 400;

//create a copy of main grid, to update the screen once per full sweep
theGrid = theArchitect(gridWidth);
narcissusGrid = theArchitect(gridWidth);

populateGrid();
mainLoop();

//add button and event listener for future user control of grid.

//considering using setInterval(tick, //someInterval) for
//observation of distinct patterns
function mainLoop() {

    drawGrid();
    applyRules();
    requestAnimationFrame(mainLoop);
}

//generate matrix for population
function theArchitect(rows) {

    var someArray = [];
    for(var i = 0; i < rows; i++) {

        someArray[i] = [];
    }

    return someArray;
}

//Math.round(Math.random()) generates a random binary number
function populateGrid(){

    for(var j = 0; j < gridHeight; j++) {

        for(var k = 0; k < gridWidth; k++) {

            theGrid[j][k] = Math.round(Math.random());
        }
    }
}

function drawGrid() {

    ctx.clearRect(0, 0, gridHeight, gridWidth);

    for(var j = 1; j < gridHeight; j++){

        for(var k = 1; k < gridWidth; k++){

            if(theGrid[j][k] === 1){

                ctx.fillRect(j,k,1,1);
            }
            if(theGrid[j][k] === 2){
                ctx.fillStyle="#a43cc4";
                ctx.fillRect(j,k,1,1);
                ctx.fillStyle="#38b555";
                theGrid[j][k] = 1;
            }
        }
    }
}

function applyRules() {



    for(var j = 1; j < gridHeight - 1; j++){

        for(var k = 1; k < gridWidth - 1; k++){
            var liveNeighbours = 0;

            liveNeighbours += theGrid[j+1][k];     //up
            liveNeighbours += theGrid[j-1][k];     //down
            liveNeighbours += theGrid[j][k-1];     //left
            liveNeighbours += theGrid[j][k+1];     //right
            liveNeighbours += theGrid[j+1][k-1];   //up-left
            liveNeighbours += theGrid[j+1][k+1];   //up-right
            liveNeighbours += theGrid[j-1][k+1];   //down-right
            liveNeighbours += theGrid[j-1][k-1];   //down-left

            switch (liveNeighbours) {
                case 2:
                    narcissusGrid[j][k] = theGrid[j][k];

                    break;
                case 3:
                    narcissusGrid[j][k] = 2; //live cell. non-binary number shows new generation

                    break;
                default:
                    narcissusGrid[j][k] = 0; //
            }
        }

    }

    //wraparound effect from http://disruptive-communications.com/conwaylifejavascript/
    for (var l = 1; l < gridHeight - 1; l++) { //iterate through rows
        //top and bottom
        narcissusGrid[l][0] = narcissusGrid[l][gridHeight - 3];
        narcissusGrid[l][gridHeight - 2] = narcissusGrid[l][1];
        //left and right
        narcissusGrid[0][l] = narcissusGrid[gridHeight - 3][l];
        narcissusGrid[gridHeight - 2][l] = narcissusGrid[1][l];

    }

    //change grids, to redraw with new rules applied
    var temp = theGrid;
    theGrid = narcissusGrid;
    narcissusGrid = temp;
}