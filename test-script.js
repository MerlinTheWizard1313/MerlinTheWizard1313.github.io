class MazeSquare {
    constructor(box, rowValue, columnValue){
        this.gridSquare = box;
        this.rowLetter = rowValue;
        this.columnNumber = parseInt(columnValue, 10);
        this.lightLevelNumber = 0;
        this.lightColour = "black";
        this.gridCoordinateR;
        this.gridCoordinateC;
        this.gridSquareClassName;
        this.gridWalls;
        this.tileHasLitTorch = false;
        this.genGridContent();
        this.gridContent = this.gridSquare.innerText;
    }

    genGridContent(){
        if(this.columnNumber != 0){
            this.gridCoordinateR = ["A","B","C","D","E","F","G","H"].indexOf(this.rowLetter)+1;
            this.gridCoordinateC = this.columnNumber;
            this.gridSquare.innerText = "(" + this.gridCoordinateR + "," + this.gridCoordinateC + ")";
            this.gridSquareClassName = "row" + this.gridCoordinateR + "Column" + this.gridCoordinateC;
            this.gridSquare.classList.add(this.gridSquareClassName);
            this.gridWalls = new Walls(("." + this.gridSquareClassName));
        } else {
            this.gridSquare.innerText = this.rowLetter;
        }
    }

    getGridCoordinate(){
        return "(" + this.gridCoordinateR + "," + this.gridCoordinateC + ")";
    }
}

class Maze{
    constructor(grid){
        this.mainGrid = grid;
        this.gridSquareArray = [[],[],[],[],[],[],[],[],[]];
        this.genGrid();
    }

    genGrid(){
        var i = 0;
        var j = 9;
        var currentRow = "";
        for(var gridElement of this.mainGrid.children){
            if (gridElement.dataset.id == "Label"){
                if (i != 0 && j != 0){
                    i = 0;
                }
                if (j > 0){
                    j--;
                }
                currentRow = gridElement.innerText;
                this.gridSquareArray[j].push(new MazeSquare(gridElement, currentRow, 0));
                gridElement = this.gridSquareArray[j][i];
                i++;
            } else {
                this.gridSquareArray[j].push(new MazeSquare(gridElement, currentRow, gridElement.dataset.id));
                gridElement = this.gridSquareArray[j][i];
                i++;
            }
        }
    }

    gridSquareInfo(row, column){
        var gridSquareInfo = ["Content:" + this.gridSquareArray[row][column].gridContent, 
                                "Coordinates:" + this.gridSquareArray[row][column].getGridCoordinate(), 
                                "ClassNames:" + this.gridSquareArray[row][column].classList, 
                                "TileWalls:" + this.gridSquareArray[row][column].gridWalls.actualWalls];
        return gridSquareInfo;
    }
}

class Walls{
    constructor(gridSquareClassName){
        this.gridSquareElement = document.querySelector(gridSquareClassName);
        this.propertyArray = ["border-top", "border-right", "border-bottom", "border-left"];
        this.actualWalls = [];
        this.currentColourIndex = 0;
        this.currentColour = "rgb(0,0,0)";
        this.tileTorchLit = false;
        this.wallColours = ["rgb(0,0,0)","rgb(0,32,0)","rgb(0,128,0)"]
        this.initialiseWalls();
    }
    /*dotted and dashed make cracked wall, double for jail wall*/
    initialiseWalls(){
        for (let i = 0; i < this.propertyArray.length; i++){
            var styleCheck = window.getComputedStyle(this.gridSquareElement, null).getPropertyValue(this.propertyArray[i]);
            if(styleCheck.charAt(0) != 0){
                this.actualWalls.push(styleCheck);
            } else {
                this.actualWalls.push("None");
            }
        }
    }

    lightUpdate(colourChange){
        if(this.gridSquareElement.tileHasLitTorch && tileTorchLit == false){
            this.currentColourIndex == 2;
            this.updateWalls();
        } else if (!(colourChange > 0 && this.currentColourIndex == 2) || !(colourChange < 0 && this.currentColourIndex == 0)|| !this.gridSquareElement.tileHasLitTorch){
            this.currentColourIndex += colourChange;
            this.updateWalls();
        }
    }

    updateWalls(){
        for(let i = 0; i < this.propertyArray.length; i++){
            if(this.actualWalls[i] != "none"){
                this.actualWalls[i].replace(this.currentColour,this.wallColours[this.currentColourIndex]);
                this.currentColour = this.wallColours[this.currentColourIndex];
                switch (i){
                    case 0:
                        this.gridSquareElement.style.borderTop = this.wallColours[this.currentColourIndex];
                        break;
                    case 1:
                        this.gridSquareElement.style.borderRight = this.wallColours[this.currentColourIndex];
                        break;
                    case 2:
                        this.gridSquareElement.style.borderBottom = this.wallColours[this.currentColourIndex];
                        break;
                    case 3:
                        this.gridSquareElement.style.borderLeft = this.wallColours[this.currentColourIndex];
                        break;
                }
            }
        }
    }
}

/*class Player {
    constructor(spawnTile){
        this.currentTile = spawnTile;
        this.northTile;
        this.eastTile;
        this.southTile;
        this.westTile;
    }

    initialisePlayer(){
        //update each adjacent tile to start and update their light levels
    }

    playerMove(){

    }

    tileUpdate(tileChoice){
        this.currentTile.lightUpdate(-2);
        for (let i = 0; i < this.currentTile.gridWalls.actualWalls.length; i++){
            switch(i){
                case 0:
                    if(this.northTile == ""){
                        break;
                    } else if(tileChoice != this.northTile) {
                        this.northTile.lightUpdate(-1);
                        break;
                    }
                case 1:
                    if(this.eastTile == ""){
                        break;
                    } else if(tileChoice != this.eastTile){
                        this.eastTile.lightUpdate(-1);
                        break;
                    }
                case 2:
                    if(this.southTile == ""){
                        break;
                    } else if(tileChoice != this.southTile){
                        this.southTile.lightUpdate(-1);
                    }
                case 3:
                    if(this.westTile == ""){
                        break;
                    } else if(tileChoice != this.westTile){
                        this.westTile.lightUpdate(-1);
                    }
            }
        }
        this.currentTile = tileChoice;
        for (let i = 0; i < this.currentTile.gridWalls.actualWalls.length; i++){
            switch(i){
                case 0:
                    if(this.currentTile.gridWalls.actualWalls[i] != "none"){
                        this.northTile = "";
                        break;
                    } else {
                        this.northTile = document.querySelector((".row" + (this.currentTile.gridCoordinateR + 1) + "Column" + this.currentTile.gridCoordinateC));
                        this.northTile.lightUpdate(1);
                        break;
                    }
                case 1:
                    if(this.currentTile.gridWalls.actualWalls[i] != "none"){
                        this.eastTile = "";
                        break;
                    } else {
                        this.eastTile = document.querySelector((".row" + this.currentTile.gridCoordinateR + "Column" + (this.currentTile.gridCoordinateC + 1)));
                        this.eastTile.lightUpdate(1);
                        break;
                    }
                case 2:
                    if(this.currentTile.gridWalls.actualWalls[i] != "none"){
                        this.southTile = "";
                        break;
                    } else {
                        this.southTile = document.querySelector((".row" + (this.currentTile.gridCoordinateR - 1) + "Column" + this.currentTile.gridCoordinateC));
                        this.southTile.lightUpdate(1);
                        break;
                    }
                case 3:
                    if(this.currentTile.gridWalls.actualWalls[i] != "none"){
                        this.westTile = "";
                        break;
                    } else {
                        this.westTile = document.querySelector((".row" + this.currentTile.gridCoordinateR  + "Column" + (this.currentTile.gridCoordinateC - 1)));
                        this.westTile.lightUpdate(1);
                        break;
                    }
            }
        }
        this.currentTile.lightUpdate(1);
    }
}*/

const gridBox = document.querySelector("#mazeBox");
const gridTest = new Maze(gridBox);