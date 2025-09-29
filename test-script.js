class MazeSquare {
    constructor(box, rowValue, columnValue){
        this.gridSquare = box;
        this.rowLetter = rowValue;
        this.columnNumber = parseInt(columnValue, 10);
        this.wallArray = ["North", "East", "South", "West"];
        this.lightLevelNumber = 0;
        this.lightColour = "black";
        this.gridCoordinateR;
        this.gridCoordinateC;
        this.genGridContent();
        this.gridContent = this.gridSquare.innerText;
    }

    genGridContent(){
        if(this.columnNumber != 0){
           this.gridCoordinateR = ["A","B","C","D","E","F","G","H"].indexOf(this.rowLetter)+1;
           this.gridCoordinateC = this.columnNumber;
           this.gridSquare.innerText = "(" + this.gridCoordinateR + "," + this.gridCoordinateC + ")";
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
                gridElement.classlist.add(("row"+ j + "Column" + i));
                i++;
            } else {
                this.gridSquareArray[j].push(new MazeSquare(gridElement, currentRow, gridElement.dataset.id));
                gridElement = this.gridSquareArray[j][i];
                gridElement.classlist.add(("row"+ j + "Column" + i));
                i++;
            }
        }
    }

    gridSquareInfo(row, column){
        var gridSquareInfo = ["Content:" + this.gridSquareArray[row][column].gridContent, "Coordinates:" + this.gridSquareArray[row][column].getGridCoordinate()]
        return gridSquareInfo;
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