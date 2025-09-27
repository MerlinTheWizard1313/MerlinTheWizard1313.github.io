class MazeSquare {
    constructor(box){
        this.gridSquare = box;

    }
}

class Maze extends MazeSquare{
    constructor(grid){
        super(0);
        this.mainGrid = grid;
        
    }

    genGrid(){
        for(const child of mainGrid){
            if (child.dataset.id != "A" || child.dataset.id != "B"){
                child.style.color = "red";
            } else {
                child.style.color = "blue";
            }
        }
    }
}

const gridBox = document.querySelector("#mazeBox");
const gridTest = new Maze(gridBox);