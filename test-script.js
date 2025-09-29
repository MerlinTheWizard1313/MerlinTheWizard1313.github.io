class MazeSquare {
    constructor(box, rowValue, columnValue){
        this.gridSquare = box;
        this.rowLetter = rowValue;
        this.columnNumber = parseInt(columnValue, 10);
        this.wallArray = ["North", "East", "South", "West"];
        this.lightLevelNumber = 0;
        this.lightColour = "black";
        this.gridContent = "";
        this.gridCoordinate = [0,0];
        this.genGridContent();
    }

    genGridContent(){
        if(this.columnNumber != 0){
           this.gridCoordinate[0] = ["A","B","C","D","E","F","G","H"].indexOf(this.rowLetter)+1;
           this.gridCoordinate[1] = this.columnNumber;
           this.gridSquare.innerText = "(" + this.gridCoordinate[0] + "," + this.gridCoordinate[1] + ")";
        } else {
            this.gridSquare.innerText = this.rowLetter;
        }
    }
}

class Maze{
    constructor(grid){
        this.mainGrid = grid;
        this.rowLabels = ["H","G","F","E","D","C","B","A"," ","1","2","3","4","5","6","7","8","9","10"]
        this.genGrid();
    }

    genGrid(){
        var i = -1;
        for(var child of this.mainGrid.children){
            if (child.dataset.id == "Label"){
                i++;
                child.innerText = this.rowLabels[i];
                child = new MazeSquare(child, this.rowLabels[i], 0);
            } else {
                child = new MazeSquare(child, this.rowLabels[i], child.dataset.id);
            }
        }
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