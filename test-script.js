class MazeSquare {
    constructor(box, rowValue, columnValue){
        this.gridSquare = box;
        this.rowLetter = rowValue;
        this.columnNumber = columnValue;
        this.wallArray = ["North", "East", "South", "West"];
        this.lightLevelNumber = 0;
        this.lightColour = "black";
        this.gridContent = "";
        this.genGridContent();
    }

    genGridContent(){
        if(this.columnNumber != 0){
            var randomNumber = Math.random();
            switch(true){
                case (randomNumber <= 0.25):
                    this.gridContent = "Empty"
                    break;
                case (randomNumber <= 0.5):
                    this.gridContent = "Unlit Torch"
                    break;
                case (randomNumber <= 0.75):
                    this.gridContent = "Enemy"
                    break;
                case (randomNumber <= 1):
                    this.gridContent = "NPC"
                    break;     
            }      
        } else {
            this.gridContent = this.rowLetter;
        }
        this.gridSquare.innerText = this.gridContent;
    }
}

class Maze{
    constructor(grid){
        this.mainGrid = grid;
        this.rowCheck = "Label";
        this.rowLabels = ["1","2","3","4","5","6","7","8","9","10","11","12"]
        this.genGrid();
    }

    genGrid(){
        var i = -1;
        for(var child of this.mainGrid.children){
            if (this.rowCheck == child.dataset.id){
                i++;
                child.style.color = "blue";
                child.innerText = this.rowLabels(i);
                child = new MazeSquare(child, this.rowLabels(i), 0);
            } else {
                child.style.color = "red";
                child = new MazeSquare(child, this.rowLabels(i), child.dataset.id);
            }
        }
    }
}

const gridBox = document.querySelector("#mazeBox");
const gridTest = new Maze(gridBox);