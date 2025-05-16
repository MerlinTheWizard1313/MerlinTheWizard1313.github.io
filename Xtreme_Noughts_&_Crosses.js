//Global array of winning rows
const winArr = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
			[1, 4, 7],
			[2, 5, 8],
			[3, 6, 9],
			[1, 5, 9],
			[3, 5, 7]
];

//Global varaible to store current player turn for use in all boards
var currentTurn = "";

//Global variable to store turn amount for use in large board
var turnAmount = 0;

//Global array variable to store each board
var gameBoardArr = [];

//Global variable to store the current active board for use in all boards 
var boardStore = 0;

//Noughts and Crosses board class for use by eahc of the 9 boards inside the large board
class N_C {
    constructor(game, number){
        this.box = game;
        this.boardNumber = number; //Set the board number from 1-9 from input unless it is the main board
        this.boardNumberClass = "game-board-" + this.boardNumber.toString(); //Set name of board class
        this.win_status = false; //Has the current board won?
        this.boardActive = false; //Is the current board the active board?
        this.winner = ""; //Winner of the current board?
        this.genBoard(number); //Generate the board grid unless number = 0
        this.xArr = []; //Current Player moves
        this.oArr = []; //Current Ai moves
        
    }
    

    //Turn toggle to flip between player and ai turn
    toggleTurn(){
        //currentTurn = currentTurn == "xTurn" ? "oTurn" : "xTurn";
    }

    //Upon the call of the N_C class, this will intitialise the game board and game state
    //so the game can begin
    resetBoard(){
        this.win_status = false;
        this.winner = "";
        this.xArr = []; 
        this.oArr = []; 
        document.querySelectorAll(".game-board-" + this.boardNumber.toString() +" > div").forEach(boardSquare => {
			boardSquare.innerHTML = "";
			boardSquare.className = "";
		});
    }

    startBoard(){
        if (currentTurn == "oTurn") this.randomWaitTime().then(() => this.aiTurn());
    }

    //After each move, this is called to check if the current move has caused a win on the board
    //If successful, it updates the win status, winner and stores the winning row
    winRowCheck(){
        if(this.win_status == false){
            let row, arrayToCheck;
            arrayToCheck = (currentTurn == "xTurn" ? this.xArr : this.oArr);
            if (arrayToCheck.length >= 3){
                winArr.forEach((winRow)=>{
                    if (winRow.every(x => this.xArr.includes(x))) {
                        this.winner = currentTurn;
                        row = winRow;
                        this.win_status = true;
                        //currently only works for first game board, change this
			            row.forEach(x => {
                            const boardSquare = document.querySelector("[data-id='" + ((9 * (boardNumber - 1)) + x) + "']");
                            console.log(boardSquare.classList);
                            boardSquare.classList.add("win");
			            });
                    }
                })
            }
        }
    }

    //Used in the case that the big board does not get a winning row
    //If the big board has no row, it will call this function in each of the boards
    //If the board has not won yet, it determines the winner of the board by a majority vote
    //Then it sets the winner and win status based off the majority vote
    totalWinCheck(){
        if (this.win_status == false){
            this.winner = (this.xArr.length > this.oArr.length ? "xTurn" : "oTurn");
            this.win_status = true;
        }
    }

    //Update the board when a move is made
    boardUpdate(){
        turnAmount++;
        this.winRowCheck();
        this.toggleTurn();
        if (boardStore == 10){
            document.querySelector(".game-prompt").innerHTML = "";
            for(let i = 0; i > 9; i++){
                if (i != 4){
                    gameBoardArr[i].boardActive = false;
                    gameBoardArr[i].box.classList.remove("current-board-active");
                }
            }
        } else {
            this.boardActive = false;
            this.box.classList.remove("current-board-active");
        }
    }

    //Create the visual grid in html with event listeners to the grid spaces
    genBoard(number){
        if (number != 0){
            const board = document.createElement("div");
            board.classList.add("game-board", this.boardNumberClass);
            for (let i = 0; i < 9; i++){
                const div = document.createElement("div");
                div.setAttribute("data-id", (9 * (boardNumber - 1)) + i + 1);
                board.appendChild(div);
            }
            board.addEventListener("click", this.playerTurn.bind(this));
            this.box.appendChild(board);
        }
        /*const winnerOutput = document.createElement("div"); will keep this here for later when a position is decided
		winnerOutput.classList.add("winner-output");
		this.winnerOutput = this.container.appendChild(winnerOutput);*/
    }

    //Actions taken when it is the player's turn to move
    playerTurn(move){
        if(currentTurn == "oTurn" || !this.boardActive || move.target.classList.contains("selected")) return false;
        const square = parseInt(move.target.dataset.id, 10);
		this.xArr.push(square);
		move.target.innerHTML = "X";
		move.target.classList.add("selected");
        this.boardUpdate();
        boardStore = square - 1;
        this.randomWaitTime();
        game0.setBoardActive();
    }

    //Used to add a small buffer time for ai moves, before a player moves, and other functions
    randomWaitTime(){
        let waitTime = 0; //set a random wait time here
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, waitTime);
        });
    }

    //Actions taken when it is the ai's turn to move
    aiTurn(){
        if(currentTurn == "oTurn"){

        }
    }
}

class XN_C extends N_C{
    constructor(box){
        super(box, 0);
        this.genBoards();
        this.startBoard();
    }

    genBoards(){
        const box1 = document.querySelector(".game-box-1");
        const box2 = document.querySelector(".game-box-2");
        const box3 = document.querySelector(".game-box-3");
        const box4 = document.querySelector(".game-box-4");
        const box5 = document.querySelector(".game-box-5");
        const box6 = document.querySelector(".game-box-6");
        const box7 = document.querySelector(".game-box-7");
        const box8 = document.querySelector(".game-box-8");
        const box9 = document.querySelector(".game-box-9");
        const game1 = new N_C(box1,1);
        const game2 = new N_C(box2,2);
        const game3 = new N_C(box3,3);
        const game4 = new N_C(box4,4);
        const game5 = new N_C(box5,5);
        const game6 = new N_C(box6,6);
        const game7 = new N_C(box7,7);
        const game8 = new N_C(box8,8);
        const game9 = new N_C(box9,9); 
        gameBoardArr = [game1, game2, game3, game4, game5, game6, game7, game8, game9];
    }
    
    resetBoards(){
        for(let i = 0; i > 9; i++){
            gameBoardArr[i].resetBoard();
        }
    }
    setBoardActive(){
        if(gameBoardArr[boardStore].xArr.length + gameBoardArr[boardStore].oArr.length == 9){
            if (currentTurn == "xTurn"){
                boardStore = 10;
                document.querySelector(".game-prompt").innerHTML = "Choose a move on any of the other boards!";
                for(let i = 0; i > 9; i++){
                    if (i != 4){
                        gameBoardArr[i].boardActive = true;
                        gameBoardArr[i].box.classList.add("current-board-active");
                        gameBoardArr[i].startBoard();
                    }
                }
            } else {
                const randomBoard = Math.floor(Math.random() * 8);
                const randomArray = [0,1,2,3,5,6,7,8,9]
                boardStore =  randomArray(randomBoard);
                gameBoardArr[boardStore].boardActive = true;
                gameBoardArr[boardStore].box.classList.add("current-board-active");
                gameBoardArr[boardStore].startBoard();
            }
        } else {
            gameBoardArr[boardStore].boardActive = true;
            gameBoardArr[boardStore].box.classList.add("current-board-active");
            gameBoardArr[boardStore].startBoard();
        }
    }

    //Upon the call of the XN_C class, this will intitialise the game board and game state
    //so the game can begin
    startBoard(){
        this.win_status = false;
        this.winner = "";
        this.xArr = []; 
        this.oArr = [];
        turnAmount = 0;
        boardStore = 4;
        currentTurn = this.turnRandom();
        this.resetBoards();
        this.setBoardActive();
    }

    //Initial randomiser of turn order once the game begins
    turnRandom(){
        const random = 0.7;//Math.random();
        return random >= 0.5 ? "xTurn" : "oTurn";
    }

    //will be overidden
    winRowCheck(){
        if(this.win_status == false){
            let row, arrayToCheck;
            arrayToCheck = (currentTurn == "xTurn" ? this.xArr : this.oArr);
            if (arrayToCheck.length >= 3){
                winArr.forEach((winRow)=>{
                    if (winRow.every(x => this.xArr.includes(x))) {
                        this.winner = currentTurn;
                        //row = winRow.slice();
                        this.win_status = true;
                    }
                })
            }
        }
    }

}

//Create a new Xtreme Noughts and Crosses board class 
//Which will call the creation of 9 other mini boards through the N_C class
//const game = new N_C(box,1);

const boardbox = document.querySelector("#large-game-box");
const game0 = new XN_C(boardbox);