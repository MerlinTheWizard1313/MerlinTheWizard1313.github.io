class MazeSquare {
    constructor(box,rowValue, columnValue){
        this.gridSquare = box;
        this.rowLetter = rowValue;
        this.columnNumber = columnValue;
        this.wallArray = ["North", "East", "South", "West"];
        this.lightLevelNumber = 0;
        this.lightColour = "black";
        this.gridContent = "";
        this.genGridContent();
    }

    genGridContent(rowLetter,columnNumber){
        if(columnNumber != 0){
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
        } else {
            this.gridContent = rowLetter;
        }
        console.log(this.gridSquare);
        console.log(this.gridSquare.innerText);
        this.gridSquare.innerText = this.gridContent;
    }
}

class Maze{
    constructor(grid){
        this.mainGrid = grid;
        this.genGrid();
    }

    genGrid(){
        for(var child of this.mainGrid.children){
            if (child.dataset.id == "A" || child.dataset.id == "B"){
                child.style.color = "blue";
                console.log(child);
                child = new MazeSquare(child, child.dataset.id, 0)
            } else {
                child.style.color = "red";
                console.log(child);
                child = new MazeSquare(child, "test", child.dataset.id)
            }
        }
    }
}

const gridBox = document.querySelector("#mazeBox");
const gridTest = new Maze(gridBox);