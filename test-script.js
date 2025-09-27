class MazeSquare {
    constructor(rowValue, columnValue){
        this.rowLetter = rowValue;
        this.columnNumber = columnValue;
        this.wallArray = [North, East, South, West];
        this.lightLevelNumber = 0;
        this.lightColour = "black";
        this.genGridContent();
    }

    genGridContent(rowLetter,columnNumber){
        var randomNumber = Math.random();
        switch(randomNumber){
            case randomNumber <= 0.25:
                this.gridContent = "Empty"
                break;
            case randomNumber <= 0.5:
                this.gridContent = "Unlit Torch"
                break;
            case randomNumber <= 0.75:
                this.gridContent = "Enemy"
                break;
            case randomNumber <= 1:
                this.gridContent = "NPC"
                break;           
        }
    }
}

class Maze{
    constructor(grid){
        this.mainGrid = grid;
        this.genGrid();
    }

    genGrid(){
        for(const child of this.mainGrid){
            if (child.dataset.id != "A" || child.dataset.id != "B"){
                child.style.color = "red";
                child = new MazeSquare("test",child.dataset.id)
            } else {
                child.style.color = "blue";
                child = new MazeSquare(child.dataset.id,0)
            }
        }
    }
}

const gridBox = document.querySelector("#mazeBox");
const gridTest = new Maze(gridBox);