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
        this.tileHasEnemy = false;
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

    instantiateSword(){
        this.hasSword = true;
    }

    instantiateHammer(){
        this.hasHammer = true;
    }

    instantiateEnemy(){
        this.tileHasEnemy = true;
    }

    instantiateCrackedWall(){
        this.hasCrackedWall = true;
    }

    instantiateNPC(npcLocationR, npcLocationC){
        this.tileHasNPC = true;
        switch ("npc" + npcLocationR + "-" + npcLocationC){
            case "npc1-1":
                this.npcDialogue = "'*coughs* Hello there brav- *splurts* knight.' He struggles to speak as he lays against the wall with a sledgehammer through his shoulder. 'I am not long for this world *coughs* please take my presence as a warning for exploring this place. I venture to see my lady on high.' The hopeful light from his eyes fade so you decide to lay his body in a better condition, closing his eyes and removing the hammer. You gained a hammer but it is too heavy for combat";
                this.hasHammer = true;
                break;
            case "npc2-9":
                this.npcDialogue = "'HEATHEN!!' A deranged woman behind the bars with long spindly white hair scream at you. 'You will not survive in this place, but should you wish to continue, you look in need of a weapon, yes? You may find one if you follow up the east corridor I assure you.' You sense her words are true but can't shake this odd feeling. She continues to stare at you intently while grasping the bars of her cell";
                break;
            case "npc3-8":
                this.npcDialogue = "This last cubby in the room had some hard to make out writing but it had another carved note which states 'F.C.G 1848'";
                break;
            case "npc3-9":
                this.npcDialogue = "On the same wall as the carved 'A', there is another letter 'A' carved below it. What could this mean? ";
                break;
            case "npc4-9":
                this.npcDialogue = "Stepping through the entrance, you notice a letter 'A' carved high on the large wall. You should explore this place more";
                break;
            case "npc5-2":
                this.npcDialogue = "You enter an enclosed room with two statues either side of a written note. 'Though I am short, I only look up. My brother is taller, but he is always right.' The statues follow the descriptions on the notes, what could this mean?";
                break;
            case "npc5-6":
                this.npcDialogue = "Peering through the crumbled walls, you see a pedestal in the center of the room. It is the destination you have searched for. There is an unlit torch in the room, but you sense if you light it, there is going back. Do you light the torch?";
                break;
            case "npc6-4":
                this.npcDialogue = "A crazed man mumbles, his volume fluctuating as he speaks, his eyes white like he has was possessed. 'Exploration is key, do not flee. The length of moves you will see in the dead space, don't you agree?' What could he mean?";
                break;
            case "npc6-8":
                this.npcDialogue = "Standing tall, a well kept sword is jammed into a skeleton's torso. You gained a sword, perfect for combat!";
                this.hasSword = true;
                break;
            case "npc6-10":
                this.npcDialogue = "As you turn the corner, you spot something metal at the end of the hall.";
                break;
        }
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
                gridTest.eventUpdate(this.npcDialogue);
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
        this.torchArray = [[1,3],[2,1],[2,5],[2,7],[2,8],[2,9],[2,10],[3,3],[3,8],[3,9],[4,2],[4,6],[4,9],[5,2],[5,3],[5,4],[5,5],[5,7],[5,8],[5,10],[6,1],[6,5],[6,9]];
        this.npcArray = [[1,1],[2,9],[3,8],[3,9],[4,9],[5,2],[5,6],[6,4]];
        this.enemyArray = [[1,7],[1,10],[4,8],[5,1],[5,9],[6,3]];
        this.crackedWallArray = [[4,8],[5,4],[5,5],[6,2]];
        this.swordLocation = [6,8];
        this.hammerLocation = [1,1];
        this.eventArray = [];
        this.currentEvent = "";
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
        for(let i = 0; i < this.enemyArray.length; i++){
            this.gridSquareArray[this.enemyArray[i][0]][this.enemyArray[i][1]].instantiateEnemy(this.enemyArray[i][0],this.enemyArray[i][1]);
        }
        for(let i = 0; i < this.crackedWallArray.length; i++){
            this.gridSquareArray[this.crackedWallArray[i][0]][this.crackedWallArray[i][1]].instantiateCrackedWall(this.crackedWallArray[i][0],this.crackedWallArray[i][1]);
        }
        this.gridSquareArray[this.swordLocation[0]][this.swordLocation[1]].instantiateSword();
        this.gridSquareArray[this.hammerLocation[0]][this.hammerLocation[1]].instantiateHammer();
    }

    eventReturn(npcDialogue){
        switch (npcDialogue){
            case "Standing tall, a well kept sword is jammed into a skeleton's torso. It seems that deranged woman was right, you should probably free her for the helpful tip. You gained a sword, perfect for combat!":
                if (this.eventArray.indexOf("swordEvent") == -1){
                    this.currentEvent = "swordEvent";
                } else {
                    this.currentEvent = "";
                }
                break;
            case "'*coughs* Hello there brav- *splurts* knight.' He struggles to speak as he lays against the wall with a sledgehammer through his shoulder. 'I am not long for this world *coughs* please take my presence as a warning for exploring this place. I venture to see my lady on high.' The hopeful light from his eyes fade so you decide to lay his body in a better condition, closing his eyes and removing the hammer. You gained a hammer but it is too heavy for combat":
                if (this.eventArray.indexOf("hammerEvent") == -1){
                    this.currentEvent = "hammerEvent";
                } else {
                    this.currentEvent = "";
                }
                break;
            case "A recently deceased man lays there with open eyes and a sledgehammer lodged into his shoulder. You decide to take the hammer. It will not be helpful in combat, maybe it has another use?":
                if (this.eventArray.indexOf("hammerEvent") == -1){
                    this.currentEvent = "hammerEvent";
                } else {
                    this.currentEvent = "";
                }
                break;
            case "'HEATHEN!!' A deranged woman behind the bars with long spindly white hair scream at you. 'You will not survive in this place, but should you wish to continue, you look in need of a weapon, yes? You may find one if you follow up the east corridor I assure you.' You sense her words are true but can't shake this odd feeling. She continues to stare at you intently while grasping the bars of her cell":
                if (this.eventArray.indexOf("jailEvent") == -1){
                    this.currentEvent = "jailEvent";
                } else {
                    this.currentEvent = "";
                }
                break;
            case "Suddenly, a white-haired crazed woman jumps out at you. She stares at you with intent to kill. You don't seem to be able to pass her, only one way through":
                if (this.eventArray.indexOf("jailEnemyEvent") == -1){
                    this.currentEvent = "jailEnemyEvent";
                } else {
                    this.currentEvent = "";
                }
                break;
            default: 
                this.currentEvent = "";
                break;
        }
        if(this.eventArray.length <=3 && this.currentEvent != ""){
            this.eventArray.push(this.currentEvent);
        }
        return this.currentEvent;
    }

    eventUpdate(npcDialogue){
        if (npcDialogue.includes("HEATHEN") || npcDialogue.includes("sword") || npcDialogue.includes("sledgehammer") || npcDialogue.includes("metal")){
            this.eventReturn(npcDialogue);
        }
        if(this.currentEvent != ""){
            switch (this.currentEvent){
                case "swordEvent":
                    this.gridSquareArray[2][9].npcDialogue = "You notice the jail cell door has been broken through, it seems that woman that cornered you came from here. Lucky you found that blade!";
                    this.gridSquareArray[2][9].gridWalls.actualWalls[2] = "none";
                    this.gridSquareArray[2][9].gridSquare.style.borderBottomWidth = "0px";
                    this.gridSquareArray[2][9].gridSquare.style.borderBottomStyle = "none";
                    this.gridSquareArray[1][9].gridWalls.actualWalls[0] = "none";
                    this.gridSquareArray[1][9].gridSquare.style.borderTopWidth = "0px";
                    this.gridSquareArray[1][9].gridSquare.style.borderTopStyle = "none";
                    this.gridSquareArray[6][10].npcDialogue = "Suddenly, a white-haired crazed woman jumps out at you. She stares at you with intent to kill. You don't seem to be able to pass her, only one way through";
                    this.gridSquareArray[5][10].tileHasEnemy = true;
                    this.gridSquareArray[6][8].npcDialogue = "A skeleton lays limp on the floor with small cut marks on the torso where the blade was jammed";
                    this.player.bindSword();
                    this.gridSquareArray[6][8].hasSword = false;
                    if(this.eventArray[1] == "swordEvent"){
                        this.gridSquareArray[1][1].npcDialogue = "A recently deceased man lays there with open eyes and a sledgehammer lodged into his shoulder. You decide to take the hammer. It will not be helpful in combat, maybe it has another use?";
                    }
                    break;
                case "jailEvent":
                    this.gridSquareArray[6][8].npcDialogue = "Standing tall, a well kept sword is jammed into a skeleton's torso. It seems that deranged woman was right, you should probably free her for the helpful tip. You gained a sword, perfect for combat!";
                    this.gridSquareArray[2][9].npcDialogue = "'Hear me well if you did not before! There lies a weapon to aid you if you follow the east corridor, now BEGONE HEATHEN' Probably best you steer clear of her"
                    break;
                case "hammerEvent":
                    this.player.bindHammer();
                    this.gridSquareArray[1][1].hasHammer = false;
                    if (this.eventArray.length <= 1){
                        this.gridSquareArray[1][1].npcDialogue = "The man lays on the ground, eyes closed. Hopefully he reaches his loved one";
                    } else {
                        this.gridSquareArray[1][1].npcDialogue = "The man, like a lifeless puppet, sits against the wall with a dead eyed stare. We better move on";
                    }
                    break;
                case "jailEnemyEvent":
                    this.gridSquareArray[6][10].npcDialogue = "";
                    break;
                default:
                return "error";
            }
        }
    }

    gridSquareInfo(row, column){
        var gridSquareInfo = ["Content:" + this.gridSquareArray[row][column].gridContent, 
                                "Coordinates:" + this.gridSquareArray[row][column].getGridCoordinate(), 
                                "ClassNames:" + this.gridSquareArray[row][column].classList, 
                                "TileWalls:" + this.gridSquareArray[row][column].gridWalls.actualWalls,
                                "TileColor:" + this.gridSquareArray[row][column].currentLightColour,
                                "NPCDialogue" + this.gridSquareArray[row][column].npcDialogue,
                                "Enemy" + this.gridSquareArray[row][column].tileHasEnemy
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

    /*dashed and solid make cracked wall, double for jail wall*/
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
        this.uselessHammerCount = 0;
        this.upButton = document.getElementById("up-button");
        this.rightButton = document.getElementById("right-button");
        this.downButton = document.getElementById("down-button");
        this.leftButton = document.getElementById("left-button");
        this.lightTorchButton = document.getElementById("lightTorch-button");
        this.hammerButton = document.getElementById("hammer-button");
        this.swordButton = document.getElementById("sword-button");
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
        this.swordButton.addEventListener("click", () => this.attack());
        this.hammerButton.addEventListener("click", () => this.hammer());
    }

    bindSword(){
        this.hasSword = true;
        this.swordButton.innerText = "Attack";
    }

    bindHammer(){
        this.hasHammer = true;
        this.hammerButton.innerText = "Hammer";
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
        }
        if(this.tileChoice == undefined || this.tileChoice == ""){
            console.log("Choose a vaild tile");
        } else if (this.tileChoice.tileHasEnemy && (this.tileChoice.gridCoordinateR == 5 && this.tileChoice.gridCoordinateC == 10)){
            console.log("The crazed woman is not going to let you pass, teach her not to mess with you ever again!");
        } else if (this.tileChoice.tileHasEnemy){
            switch (Math.round(3 * Math.random())){
                case 0:
                    console.log("You spot a hulking enemy blocking your path. You must defeat him if you are going to progress this way");
                    break;
                case 1:
                    console.log("A large enemy stops you from moving this way. A good strike to it's chest would let you through");
                    break;
                case 2:
                    console.log("You are blocked from moving this way by a hefty looking enemy. Vanquish them to progress");
                    break;
                case 3:
                    console.log("'Whoa there, you can't pass through here' You are going to need to use a handy sword to get through here");
                    break;
            }
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
            if(this.currentTile == this.mazeArray[2][7]){
                this.mazeArray[1][7].lightMinimumUpdate();
                this.mazeArray[1][7].tileLightUpdate(1,false);
            } else if(this.currentTile == this.mazeArray[2][8]){
                this.mazeArray[1][8].lightMinimumUpdate();
                this.mazeArray[1][8].tileLightUpdate(1,false);
            } else if(this.currentTile == this.mazeArray[2][9]){
                this.mazeArray[1][9].lightMinimumUpdate();
                this.mazeArray[1][9].tileLightUpdate(1,false);
            } else if(this.currentTile == this.mazeArray[2][10]){
                this.mazeArray[1][10].lightMinimumUpdate();
                this.mazeArray[1][10].tileLightUpdate(1,false);
            } else if(this.currentTile == this.mazeArray[5][5]){
                this.mazeArray[5][6].lightMinimumUpdate();
                this.mazeArray[5][6].tileLightUpdate(1,false);
            }
        } else if (this.currentTile == this.mazeArray[5][6]){
            window.location.href = "test-2.html";
        }
    }

    attack(){
        if(this.hasSword && (this.northTile.tileHasEnemy || this.eastTile.tileHasEnemy || this.southTile.tileHasEnemy || this.westTile.tileHasEnemy)){
            for (let i = 0; i < this.currentTile.gridWalls.actualWalls.length; i++){
                switch(i){
                    case 0:
                        if(this.northTile == "" || this.northTile == undefined){
                            break;
                        } else {
                            this.northTile.tileHasEnemy = false;
                            break;
                        }
                    case 1:
                        if(this.eastTile == "" || this.eastTile == undefined){
                            break;
                        } else {
                            this.eastTile.tileHasEnemy = false;
                            break;
                        }
                    case 2:
                        if(this.southTile == "" || this.southTile == undefined){
                            break;
                        } else {
                            this.southTile.tileHasEnemy = false;
                            break;
                        }
                    case 3:
                        if(this.westTile == "" || this.westTile == undefined){
                            break;
                        } else {
                            this.westTile.tileHasEnemy = false;
                            break;
                        }
                }
            }
            console.log("SLASH! You defeat the enemy blocking your path!");
        } else if (this.hasSword){
            console.log("You wave your sword around aimlessly, but there is nothing nearby. I hope no-one is around to see that embarassing moment");
        } else {
            console.log("Your hand clenches the air. You feel like you require something");
        }
    }
    
    hammer(){
        if(this.hasHammer && this.currentTile.hasCrackedWall){
            for (let i = 0; i < this.currentTile.gridWalls.actualWalls.length; i++){
                if (this.currentTile.gridWalls.actualWalls[i].includes("dashed")){
                    this.currentTile.gridWalls.actualWalls[i] = "none";
                    this.currentTile.hasCrackedWall = false;
                    switch (i){
                        case 0:
                            this.currentTile.gridSquare.style.borderTopWidth = "0px";
                            this.currentTile.gridSquare.style.borderTopStyle = "none";
                            this.northTile = this.mazeArray[(this.currentTile.gridCoordinateR + 1)][this.currentTile.gridCoordinateC];
                            this.northTile.tileLightUpdate(1, false);
                            break;
                        case 1:
                            this.currentTile.gridSquare.style.borderRightWidth = "0px";
                            this.currentTile.gridSquare.style.borderRightStyle = "none";
                            this.eastTile = this.mazeArray[this.currentTile.gridCoordinateR][(this.currentTile.gridCoordinateC + 1)];
                            this.eastTile.tileLightUpdate(1, false);
                            break;
                        case 2:
                            this.currentTile.gridSquare.style.borderBottomWidth = "0px";
                            this.currentTile.gridSquare.style.borderBottomStyle = "none";
                            this.southTile = this.mazeArray[(this.currentTile.gridCoordinateR - 1)][this.currentTile.gridCoordinateC];
                            this.southTile.tileLightUpdate(1, false);
                            break;
                        case 3:
                            this.currentTile.gridSquare.style.borderLeftWidth = "0px";
                            this.currentTile.gridSquare.style.borderLeftStyle = "none";
                            this.westTile = this.mazeArray[this.currentTile.gridCoordinateR][(this.currentTile.gridCoordinateC - 1)];
                            this.westTile.tileLightUpdate(1, false);
                            break;
                    }
                }
            }
        } else if (this.hasHammer && this.currentTile.hasCrackedWall == false){
            if (this.uselessHammerCount <= 4){
                console.log("You swing the hammer around but there is nothing to break. Better not tire yourself out swinging it")
                this.uselessHammerCount += 1;
            } else if (this.uselessHammerCount <= 12){
                console.log("You slowly swing the hammer around but there is nothing to break. You are starting to become sluggish");
                this.uselessHammerCount += 1;
            } else if(this.uselessHammerCount == 13){
                console.log("The knight stares up at you, pressing that hammer button. 'Can you just hammer the walls when they are breakable? I am really tired'");
                this.uselessHammerCount += 1;
            } else {
                console.log("You swing the hammer around but there is nothing to break.");
            }
        } else if (this.hasHammer == false){
            console.log("You reach your hand over your shoulder and grasp at air. You feel like you require something");
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
        this.currentMessage = "You find yourself deep in a dark dungeon with nothing but your armour and a lit torch to your name. You must navigate this place, lighting torches to help map out the area as you go. You will find what you seek on your journey here. Good luck...";
        this.messageStore = ["...","...","..."];
        this.terminalBox = document.querySelector(".text-terminal");
        this.messageBin = "";
        this.messageOne = "";
        this.messageTwo = "";
        this.messageThree = "";
        this.shiftMessageArray(this.currentMessage);
    }

    shiftMessageArray(message){
        this.messageBin = this.messageStore.shift();
        this.messageStore.push(message);
        this.messageThree = message;
        this.displayMessage();
    }
    
    displayMessage(){
        this.messageOne = this.messageStore[0];
        this.messageTwo = this.messageStore[1];
        this.messageThree = this.messageStore[2];
        this.terminalBox.children[0].innerText = this.messageOne;
        this.terminalBox.children[1].innerText = this.messageTwo;
        this.terminalBox.children[2].innerText = this.messageThree;
    }

    chooseTerminalColour(){
        // r g or b colour schemes, g default (maybe add a light mode which is white back and black for text and borders)
        //gonna need to look at css variables
        //maybe have this update the grid?
    }
}

const terminal = new TextTerminal();
terminal.shiftMessageArray("'*coughs* Hello there brav- *splurts* knight.' He struggles to speak as he lays against the wall with a sledgehammer through his shoulder. 'I am not long for this world *coughs* please take my presence as a warning for exploring this place. I venture to see my lady on high.' The hopeful light from his eyes fade so you decide to lay his body in a better condition, closing his eyes and removing the hammer. You gained a hammer but it is too heavy for combat");
terminal.shiftMessageArray("'*coughs* Hello there brav- *splurts* knight.' He struggles to speak as he lays against the wall with a sledgehammer through his shoulder. 'I am not long for this world *coughs* please take my presence as a warning for exploring this place. I venture to see my lady on high.' The hopeful light from his eyes fade so you decide to lay his body in a better condition, closing his eyes and removing the hammer. You gained a hammer but it is too heavy for combat");
terminal.shiftMessageArray("'*coughs* Hello there brav- *splurts* knight.' He struggles to speak as he lays against the wall with a sledgehammer through his shoulder. 'I am not long for this world *coughs* please take my presence as a warning for exploring this place. I venture to see my lady on high.' The hopeful light from his eyes fade so you decide to lay his body in a better condition, closing his eyes and removing the hammer. You gained a hammer but it is too heavy for combat");
const gridBox = document.querySelector("#mazeBox");
const gridTest = new Maze(gridBox);