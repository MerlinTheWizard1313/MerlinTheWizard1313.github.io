class MazeSquare {
    constructor(box, rowValue, columnValue){
        this.gridSquare = box;
        this.rowLetter = rowValue;
        this.columnNumber = parseInt(columnValue, 10);
        this.lightLevelNumber = 0;
        this.lightLevelMinimum = 0;
        this.lightColours = ["rgb(0,0,0)","rgb(0,32,0)","rgb(0,72,0)"];
        this.currentLightColour = "rgb(0,0,0)";
        this.gridCoordinateR;
        this.gridCoordinateC;
        this.gridSquareClassName;
        this.gridWalls;
        this.playerOnTile = false;
        this.tileHasUnlitTorch = false;
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

    instantiateTorch(){
        this.tileHasUnlitTorch = true;
    }

    lightMinimumUpdate(){
        this.lightLevelMinimum = 1;
    }

    tileLightUpdate(colourChange, torchUpdate){
        if ((this.lightLevelNumber + colourChange) < this.lightLevelMinimum){
            this.lightLevelNumber = this.lightLevelMinimum;
            this.gridWalls.lightUpdate(colourChange,torchUpdate, this.lightLevelMinimum);
            this.currentLightColour = this.lightColours[this.lightLevelNumber]
            this.gridSquare.style.backgroundColor = this.currentLightColour;
        } else {
            this.gridWalls.lightUpdate(colourChange,torchUpdate);
            this.lightLevelNumber = this.gridWalls.currentColourIndex;
            this.currentLightColour = this.lightColours[this.lightLevelNumber]
            this.gridSquare.style.backgroundColor = this.currentLightColour;
        }
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
        this.torchArray = [[2,1],[2,5],[2,7],[2,10],[3,3],[4,2],[4,6],[5,4],[5,7],[5,10],[6,1],[6,5],[6,9]]
        this.genGrid();
        this.placeTorches();
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

    placeTorches(){
        for(let i = 0; i < this.torchArray.length; i++){
            this.gridSquareArray[this.torchArray[i][0]][this.torchArray[i][1]].instantiateTorch();
        }
    }

    gridSquareInfo(row, column){
        var gridSquareInfo = ["Content:" + this.gridSquareArray[row][column].gridContent, 
                                "Coordinates:" + this.gridSquareArray[row][column].getGridCoordinate(), 
                                "ClassNames:" + this.gridSquareArray[row][column].classList, 
                                "TileWalls:" + this.gridSquareArray[row][column].gridWalls.actualWalls,
                                "TileColor:" + this.gridSquareArray[row][column].currentLightColour,
                            ];
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
        this.tileTorchLock = false;
        this.wallColours = ["rgb(0,0,0)","rgb(0,64,0)","rgb(0,128,0)"];
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

    lightUpdate(colourChange, torchUpdate, lightLevelMinimum){
        if(torchUpdate && this.tileTorchLock == false){
            this.currentColourIndex == 2;
            this.tileTorchLock = true;
            this.updateWalls();
        } else if ((colourChange > 0 && this.currentColourIndex == 2) == false && (colourChange < 0 && this.currentColourIndex == 0) == false && this.tileTorchLock == false){
            this.currentColourIndex += colourChange;
            if (this.currentColourIndex < lightLevelMinimum){
                this.currentColourIndex = lightLevelMinimum;
            }
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
        this.upButton = document.getElementById("up-button");
        this.rightButton = document.getElementById("right-button");
        this.downButton = document.getElementById("down-button");
        this.rightButton = document.getElementById("right-button");
        this.interactButton = document.getElementById("interact-button");
        this.initialisePlayer();
    }

    initialisePlayer(){
        this.currentTile.playerOnTile = true;
        this.currentTile.tileLightUpdate(2, false);
        for (let i = 0; i < this.currentTile.gridWalls.actualWalls.length; i++){
            switch(i){
                case 0:
                    if(this.currentTile.gridWalls.actualWalls[i] == "none"){
                        this.northTile = this.mazeArray[(this.currentTile.gridCoordinateR + 1)][this.currentTile.gridCoordinateC];
                        this.northTile.tileLightUpdate(1, false);
                        break;
                    } else {
                        break;
                    }
                case 1:
                    if(this.currentTile.gridWalls.actualWalls[i] == "none"){
                        this.eastTile = this.mazeArray[this.currentTile.gridCoordinateR][(this.currentTile.gridCoordinateC + 1)];
                        this.eastTile.tileLightUpdate(1, false);
                        break;
                    } else {
                        break;
                    }
                case 2:
                    if(this.currentTile.gridWalls.actualWalls[i] == "none"){
                        this.southTile = this.mazeArray[(this.currentTile.gridCoordinateR - 1)][this.currentTile.gridCoordinateC];
                        this.southTile.tileLightUpdate(1, false);
                        break;
                    } else {
                        break;
                    }
                case 3:
                    if(this.currentTile.gridWalls.actualWalls[i] == "none"){
                        this.westTile = this.mazeArray[this.currentTile.gridCoordinateR][(this.currentTile.gridCoordinateC - 1)];
                        this.westTile.tileLightUpdate(1, false);
                        break;
                    } else {
                        break;
                    }
            }
        }
        this.bindButtons();
    }

    bindButtons(){
        this.upButton.addEventListener("click", this.playerMove(0));
        this.rightButton.addEventListener("click", this.playerMove(1));
        this.downButton.addEventListener("click", this.playerMove(2));
        this.rightButton.addEventListener("click", this.playerMove(3));
        this.interactButton.addEventListener("click", this.interact());
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
        if(this.tileChoice == undefined || this.tileChoice == ""){
            return "Choose a valid tile";
        } else if (this.tileChoice.hasEnemy){
            //looks like an enemy is blocking the path
        } else {
            this.currentTile.playerOnTile = false;
            this.currentTile.playerUpdate();
            this.tileUpdate(this.tileChoice);
            this.currentTile.playerOnTile = true;
            this.currentTile.playerUpdate();
        }
    }

    interact(){
        if (this.currentTile.tileHasUnlitTorch == true){
            this.currentTile.tileHasLitTorch = true;
            this.currentTile.tileHasUnlitTorch = false;
            this.currentTile.tileLightUpdate(0, true);
            for (let i = 0; i < this.currentTile.gridWalls.actualWalls.length; i++){
                switch(i){
                    case 0:
                        if(this.currentTile.gridWalls.actualWalls[i] == "none"){
                            this.northTile.lightMinimumUpdate();
                            break;
                        }
                    case 1:
                        if(this.currentTile.gridWalls.actualWalls[i] == "none"){
                            this.eastTile.lightMinimumUpdate();
                            break;
                        }
                    case 2:
                        if(this.currentTile.gridWalls.actualWalls[i] == "none"){
                            this.southTile.lightMinimumUpdate();
                            break;
                        }
                    case 3:
                        if(this.currentTile.gridWalls.actualWalls[i] == "none"){
                            this.westTile.lightMinimumUpdate();
                            break;
                        }
                }
            }
            return "Torch lit"
        } else {
            //do speech things
            return "error for now"
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
        this.currentTile.tileLightUpdate(-2, false);
        for (let i = 0; i < this.currentTile.gridWalls.actualWalls.length; i++){
            switch(i){
                case 0:
                    if(this.northTile == "" || this.northTile == undefined){
                        break;
                    } else if(tileChoice != this.northTile) {
                        this.northTile.tileLightUpdate(-1, false);
                        break;
                    }
                case 1:
                    if(this.eastTile == "" || this.eastTile == undefined){
                        break;
                    } else if(tileChoice != this.eastTile){
                        this.eastTile.tileLightUpdate(-1, false);
                        break;
                    }
                case 2:
                    if(this.southTile == "" || this.southTile == undefined){
                        break;
                    } else if(tileChoice != this.southTile){
                        this.southTile.tileLightUpdate(-1, false);
                        break;
                    }
                case 3:
                    if(this.westTile == "" || this.westTile == undefined){
                        break;
                    } else if(tileChoice != this.westTile){
                        this.westTile.tileLightUpdate(-1, false);
                        break;
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
                        this.northTile = this.mazeArray[(this.currentTile.gridCoordinateR + 1)][this.currentTile.gridCoordinateC];
                        this.northTile.tileLightUpdate(1, false);
                        break;
                    }
                case 1:
                    if(this.currentTile.gridWalls.actualWalls[i] != "none"){
                        this.eastTile = "";
                        break;
                    } else {
                        this.eastTile = this.mazeArray[this.currentTile.gridCoordinateR][(this.currentTile.gridCoordinateC + 1)];
                        this.eastTile.tileLightUpdate(1, false);
                        break;
                    }
                case 2:
                    if(this.currentTile.gridWalls.actualWalls[i] != "none"){
                        this.southTile = "";
                        break;
                    } else {
                        this.southTile = this.mazeArray[(this.currentTile.gridCoordinateR - 1)][this.currentTile.gridCoordinateC];
                        this.southTile.tileLightUpdate(1, false);
                        break;
                    }
                case 3:
                    if(this.currentTile.gridWalls.actualWalls[i] != "none"){
                        this.westTile = "";
                        break;
                    } else {
                        this.westTile = this.mazeArray[this.currentTile.gridCoordinateR][(this.currentTile.gridCoordinateC - 1)];
                        this.westTile.tileLightUpdate(1, false);
                        break;
                    }
            }
        }
        this.currentTile.tileLightUpdate(1, false);
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