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
        this.rowLabels = ["Label"];
        this.genGrid();
    }

    genGrid(){
        var currentRow = "";
        for(var child of this.mainGrid.children){
            if (this.rowLabels.indexOf(child.dataset.id) != -1){
                child.style.color = "blue";
                child = new MazeSquare(child, child.dataset.id, 0)
                currentRow = child.innerText;
                if (currentRow == ""){
                    currentRow = "Label";
                }
            } else {
                child.style.color = "red";
                child = new MazeSquare(child, currentRow, child.dataset.id)
            }
        }
    }
}

const gridBox = document.querySelector("#mazeBox");
const gridTest = new Maze(gridBox);