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
        var gridSquareInfo = ["Content:" + this.gridSquareArray[row][column].gridContent, "Coordinates:" + this.gridSquareArray[row][column].getGridCoordinate(), "ClassNames:" + this.gridSquareArray[row][column].classList, "WallArray:" + this.gridSquareArray[row][column].gridWalls.actualWalls];
        return gridSquareInfo;
    }
}

class Walls{
    constructor(gridSquareClassName){
        this.gridSquareElement = document.querySelector(gridSquareClassName);
        this.propertyArray = ["border-top", "border-right", "border-bottom", "border-left"];
        this.actualWalls = [];
        this.checkWalls();
    }
    /*dotted and dashed make cracked wall, double for jail wall*/
    checkWalls(){
        for (let i = 0; i < this.propertyArray.length; i++){
            var styleCheck = window.getComputedStyle(this.gridSquareElement, null).getPropertyValue(this.propertyArray[i]);
            console.log(styleCheck);
            if(styleCheck.charAt(0) != 0){
                this.actualWalls.push(styleCheck);
            } else {
                this.actualWalls.push("None");
            }
        }
        return this.actualWalls;
    }
}

const gridBox = document.querySelector("#mazeBox");
const gridTest = new Maze(gridBox);
/*var randomNumber = Math.random();
            switch(true){
                case (randomNumber <= 0.25):
                    this.gridSquare.innerText = "Empty"
                    break;
                case (randomNumber <= 0.5):
                    this.gridSquare.innerText = "Unlit Torch"
                    break;
                case (randomNumber <= 0.75):
                    this.gridSquare.innerText = "Enemy"
                    break;
                case (randomNumber <= 1):
                    this.gridSquare.innerText = "NPC"
                    break;     
            }*/