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
        this.tileHasNPC = false;
        this.npcDialogue = "";
        this.tileHasSword = false;
        this.tileHasHammer = false;
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

    instantiateNPC(npcLocationR, npcLocationC){
        this.tileHasNPC = true;
        switch ("npc" + npcLocationR + "-" + npcLocationC){
            case "npc1-1":
                this.npcDialogue = "'*coughs* Hello there brav- *splurts* knight.' He struggles to speak as he lays against the wall with a sledgehammer through his shoulder. 'I am not long for this world *coughs* please take my presence as a warning for exploring this place. I venture to see my lady on high.' The hopeful light from his eyes fade so you decide to lay his body in a better condition, closing his eyes and removing the hammer. You gained a hammer but it is too heavy for combat";
                break;
            case "npc2-9":
                this.npcDialogue = "'HEATHEN!!' A deranged woman behind the bars with long spindly white hair scream at you. 'You will not survive in this place, but should you wish to continue, you look in need of a weapon, yes? You may find one if you follow up the east corridor I assure you.' You sense her words are true but can't shake this odd feeling. She continues to stare at you intently while grasping the bars of her cell"
                break;
            case "npc3-8":
                this.npcDialogue = "This last cubby in the room had some hard to make out writing but it had another carved note which states 'F.C.G 1848'";
                break;
            case "npc3-9":
                this.npcDialogue = "On the same wall as the carved 'A', there is a letter 'N' carved below it. What could this mean? ";
                break;
            case "npc4-9":
                this.npcDialogue = "Stepping through the entrance, you notice a letter 'A' carved high on the large wall. You should explore this place more";
                break;
            case "npc5-2":
                this.npcDialogue = "You enter an enclosed room with two statues either side of a written note. 'Though I am short, I only look up. My brother is taller, but he is always right.' The statues follow the descriptions on the notes, what could this mean?";
                break;
            case "npc5-6":
                this.npcDialogue = "You enter the crumbled walls and see a pedestal in the center of the room. It is the destination you have searched for. Press button to continue your journey into the room";
                break;
            case "npc6-4":
                this.npcDialogue = "A crazed man mumbles, his volume fluctuating as he speaks, his eyes white like he has was possessed. 'Exploration is key, do not flee. The length of moves you will see in the dead space, don't you agree?' What could he mean?";
                break;
        }
    }

    instantiateSword(){
        this.tileHasSword = true;
    }

    instantiateHammer(){
        this.tileHasHammer = true;
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
            if(this.npcDialogue != ""){
                console.log(this.npcDialogue);
            }
        } else {
            //remove player icon
        }
    }
}

class Maze{
    constructor(grid){
        this.mainGrid = grid;
        this.gridSquareArray = [[],[],[],[],[],[],[],[],[]];
        this.torchArray = [[1,3],[2,1],[2,5],[2,7],[2,8],[2,9],[2,10],[3,3],[3,8],[3,9],[4,2],[4,6],[4,9],[5,2],[5,3],[5,4],[5,6],[5,7],[5,8],[5,10],[6,1],[6,5],[6,9]];
        this.npcArray = [[1,1],[2,9],[3,8],[3,9],[4,9],[5,2],[5,6],[6,4]];
        this.swordLocation = [6,8];
        this.hammerLocation = [1,1];
        this.genGrid();
        this.placeObjects();
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

    placeObjects(){
        for(let i = 0; i < this.torchArray.length; i++){
            this.gridSquareArray[this.torchArray[i][0]][this.torchArray[i][1]].instantiateTorch();
        }
        for(let i = 0; i < this.npcArray.length; i++){
            this.gridSquareArray[this.npcArray[i][0]][this.npcArray[i][1]].instantiateNPC(this.npcArray[i][0],this.npcArray[i][1]);
        }
        this.gridSquareArray[this.swordLocation[0]][this.swordLocation[1]].instantiateSword();
        this.gridSquareArray[this.hammerLocation[0]][this.hammerLocation[1]].instantiateHammer();
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
        this.leftButton = document.getElementById("left-button");
        this.lightTorchButton = document.getElementById("lightTorch-button");
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
        this.upButton.addEventListener("click", () => this.playerMove(0));
        this.rightButton.addEventListener("click", () => this.playerMove(1));
        this.downButton.addEventListener("click", () => this.playerMove(2));
        this.leftButton.addEventListener("click", () => this.playerMove(3));
        this.lightTorchButton.addEventListener("click", () => this.lightTorch());
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
                    console.log("Choose a vaild tile");
        }
        if(this.tileChoice == undefined || this.tileChoice == ""){
            console.log("Choose a vaild tile");
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

    lightTorch(){
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
            console.log("Torch Lit");
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
            //do breaking and light the torch in the room cracked open
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