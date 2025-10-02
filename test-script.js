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
        this.playerOnTile = false;
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
            this.gridWalls = new Walls(("." + this.gridSquareClassName), this.tileHasLitTorch);
        } else {
            this.gridSquare.innerText = this.rowLetter;
        }
    }

    getGridCoordinate(){
        return "(" + this.gridCoordinateR + "," + this.gridCoordinateC + ")";
    }

    playerUpdate(){
        if(this.playerOnTile){
            //display player icon
        } else {
            //remove player icon
        }
    }
}

class Maze{
    constructor(grid){
        this.mainGrid = grid;
        this.gridSquareArray = [[],[],[],[],[],[],[],[],[]];
        this.genGrid();
        this.player = new Player(this.gridSquareArray, this.gridSquareArray[2][6]);
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
    constructor(gridSquareClassName, tileHasLitTorch){
        this.gridSquareElement = document.querySelector(gridSquareClassName);
        this.propertyArray = ["border-top", "border-right", "border-bottom", "border-left"];
        this.actualWalls = [];
        this.currentColourIndex = 0;
        this.currentColour = "rgb(0,0,0)";
        this.tileTorchLit = tileHasLitTorch;
        this.tileTorchLock = false;
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
                this.actualWalls.push("none");
            }
        }
    }

    lightUpdate(colourChange){
        if(this.tileTorchLit && tileTorchLock == false){
            this.currentColourIndex == 2;
            this.tileTorchLock = true;
            this.updateWalls();
        } else if ((colourChange > 0 && this.currentColourIndex == 2) == false && (colourChange < 0 && this.currentColourIndex == 0) == false && this.tileTorchLit == false){
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
                        this.gridSquareElement.style.borderTopColor = this.wallColours[this.currentColourIndex];
                        break;
                    case 1:
                        this.gridSquareElement.style.borderRightColor = this.wallColours[this.currentColourIndex];
                        break;
                    case 2:
                        this.gridSquareElement.style.borderBottomColor = this.wallColours[this.currentColourIndex];
                        break;
                    case 3:
                        this.gridSquareElement.style.borderLeftColor = this.wallColours[this.currentColourIndex];
                        break;
                }
            }
        }
    }
}

class Player {
    constructor(gridSquareArray, spawnTile){
        this.mazeArray = gridSquareArray;
        this.currentTile = spawnTile;
        this.northTile;
        this.eastTile;
        this.southTile;
        this.westTile;
        this.hasSword = false;
        this.hasHammer = false;
        this.initialisePlayer();
    }

    initialisePlayer(){
        //update each adjacent tile to start and update their light levels
        this.currentTile.playerOnTile = true;
        console.log(this.mazeArray);
        console.log(this.currentTile);
        this.currentTile.gridWalls.lightUpdate(2);
        for (let i = 0; i < this.currentTile.gridWalls.actualWalls.length; i++){
            switch(i){
                case 0:
                    if(this.currentTile.gridWalls.actualWalls[i] == "none"){
                        console.log("Made it north");
                        this.northTile = this.mazeArray[(this.currentTile.gridCoordinateR + 1)][this.currentTile.gridCoordinateC];
                        console.log(this.northTile);
                        this.northTile.gridWalls.lightUpdate(1);
                        break;
                    } else {
                        break;
                    }
                case 1:
                    if(this.currentTile.gridWalls.actualWalls[i] == "none"){
                        console.log("Made it east");
                        this.eastTile = this.mazeArray[this.currentTile.gridCoordinateR][(this.currentTile.gridCoordinateC + 1)];
                        console.log(this.eastTile);
                        this.eastTile.gridWalls.lightUpdate(1);
                        break;
                    } else {
                        break;
                    }
                case 2:
                    if(this.currentTile.gridWalls.actualWalls[i] == "none"){
                        console.log("Made it south");
                        this.southTile = this.mazeArray[(this.currentTile.gridCoordinateR - 1)][this.currentTile.gridCoordinateC];
                        console.log(this.southTile);
                        this.southTile.gridWalls.lightUpdate(1);
                        break;
                    } else {
                        break;
                    }
                case 3:
                    if(this.currentTile.gridWalls.actualWalls[i] == "none"){
                        console.log("Made it west");
                        this.westTile = this.mazeArray[this.currentTile.gridCoordinateR][(this.currentTile.gridCoordinateC - 1)];
                        console.log(this.westTile);
                        this.westTile.gridWalls.lightUpdate(1);
                        break;
                    } else {
                        break;
                    }
            }
        }
    }

    playerMove(tileNumber){
        switch(tileNumber){
                case 0:
                    this.tileChoice = this.northTile;
                    break;
                case 1:
                    this.tileChoice = this.eastTile;
                    break;
                case 2:
                    this.tileChoice = this.southTile;
                    break;
                case 3:
                    this.tileChoice = this.westTile;
                    break;
                default:
                    return "Choose a valid tile";
        }
        console.log(this.tileChoice);
        if(this.tileChoice == undefined || this.tileChoice == ""){
            return "Choose a valid tile";
        } else if (this.tileChoice.hasEnemy){
            //looks like an enemy is blocking the path
        } else {
            this.currentTile.playerOnTile = false;
            this.currentTile.playerUpdate();
            tileUpdate(tileChoice);
            this.currentTile.playerOnTile = true;
            this.currentTile.playerUpdate();
        }
    }

    interact(object){
        switch(object){
            case torch:
                if (this.currentTile.tileHasLitTorch == false){
                    this.currentTile.tileHasLitTorch = true;
                    this.currentTile.gridWalls.lightUpdate(0);
                }
                break;
            case speech:
                break; 
            default:
                //there seems to be nothing here, let's journey on!
                break;
        }
    }

    attack(){
        if(this.hasSword && this.currentTile.hasEnemy){
            //do killing
        } else if (this.hasSword && this.currentTile.hasEnemy == false){
            //flavortext
        } else if (this.hasSword == false){
            //flavortext
        }
    }
    
    hammer(){
        if(this.hasHammer && this.currentTile.hasCrackedWall){
            //do breaking
        } else if (this.hasHammer && this.currentTile.hasCrackedWall == false){
            //you swing the hammer around but you there is nothing to break
        } else if (this.hasHammer == false){
            //flavortext
        }
    }

    tileUpdate(tileChoice){
        this.currentTile.gridWalls.lightUpdate(-2);
        if(this.currentTile.tileHasLitTorch == false){
            for (let i = 0; i < this.currentTile.gridWalls.actualWalls.length; i++){
                switch(i){
                    case 0:
                        if(this.northTile == ""){
                            break;
                        } else if(tileChoice != this.northTile) {
                            this.northTile.gridWalls.lightUpdate(-1);
                            break;
                        }
                    case 1:
                        if(this.eastTile == ""){
                            break;
                        } else if(tileChoice != this.eastTile){
                            this.eastTile.gridWalls.lightUpdate(-1);
                            break;
                        }
                    case 2:
                        if(this.southTile == ""){
                            break;
                        } else if(tileChoice != this.southTile){
                            this.southTile.gridWalls.lightUpdate(-1);
                        }
                    case 3:
                        if(this.westTile == ""){
                            break;
                        } else if(tileChoice != this.westTile){
                            this.westTile.gridWalls.lightUpdate(-1);
                        }
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
                        //potentially update this if initialise player works perfectly
                        this.northTile = document.querySelector((".row" + (this.currentTile.gridCoordinateR + 1) + "Column" + this.currentTile.gridCoordinateC));
                        this.northTile.gridWalls.lightUpdate(1);
                        break;
                    }
                case 1:
                    if(this.currentTile.gridWalls.actualWalls[i] != "none"){
                        this.eastTile = "";
                        break;
                    } else {
                        this.eastTile = document.querySelector((".row" + this.currentTile.gridCoordinateR + "Column" + (this.currentTile.gridCoordinateC + 1)));
                        this.eastTile.gridWalls.lightUpdate(1);
                        break;
                    }
                case 2:
                    if(this.currentTile.gridWalls.actualWalls[i] != "none"){
                        this.southTile = "";
                        break;
                    } else {
                        this.southTile = document.querySelector((".row" + (this.currentTile.gridCoordinateR - 1) + "Column" + this.currentTile.gridCoordinateC));
                        this.southTile.gridWalls.lightUpdate(1);
                        break;
                    }
                case 3:
                    if(this.currentTile.gridWalls.actualWalls[i] != "none"){
                        this.westTile = "";
                        break;
                    } else {
                        this.westTile = document.querySelector((".row" + this.currentTile.gridCoordinateR  + "Column" + (this.currentTile.gridCoordinateC - 1)));
                        this.westTile.gridWalls.lightUpdate(1);
                        break;
                    }
            }
        }
        this.currentTile.gridWalls.lightUpdate(1);
    }
}

class TextTerminal{
    constructor(){
        this.currentMessage
        this.messageStore = ["","",""];
    }
    
    updateTerminal(){
    
    }

    chooseTerminalColour(){
        // r g or b colour schemes, g default (maybe add a light mode which is white back and black for text and borders)
        //maybe have this update the grid?
    }
}


const gridBox = document.querySelector("#mazeBox");
const gridTest = new Maze(gridBox);