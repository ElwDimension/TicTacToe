function Game(){
    const rows=3;
    const columns=3;
    const board=[];

    for(let i=0;i<rows;i++){
        board[i]=[];
        for (let j=0;j<columns;j++){
            board[i].push(Square());
        }
    }

    const getBoard = () => board;

    const drawSymbol = (row,column,player) => {

        if(board[row][column].getValue()===''){
            board[row][column].chooseSquare(player);
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }

    const clearBoard = () => {
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                board[i][j].chooseSquare('');
            }
        }
    }

    return{getBoard,drawSymbol,printBoard, clearBoard}
}


function Square(){
    let value='';

    function chooseSquare(player){
        value=player;
    }

    function getValue(){
        return value;
    }

    return{chooseSquare, getValue};
}


function gameController(playerOne="Player One", playerTwo="Player Two"){

    const board=Game();

    const players = [
    {
      name: playerOne,
      token: 'O',
      score:0
    },
    {
      name: playerTwo,
      token: 'X',
      score:0
    }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }
    
    const checkForWin = (currentBoard) => {
        if(currentBoard[0][0].getValue()===currentBoard[0][1].getValue() && currentBoard[0][0].getValue()===currentBoard[0][2].getValue() && currentBoard[0][0].getValue() != ''||
           currentBoard[1][0].getValue()===currentBoard[1][1].getValue() && currentBoard[1][0].getValue()===currentBoard[1][2].getValue() && currentBoard[1][0].getValue() != ''|| 
           currentBoard[2][0].getValue()===currentBoard[2][1].getValue() && currentBoard[2][0].getValue()===currentBoard[2][2].getValue() && currentBoard[2][0].getValue() != ''||
           currentBoard[0][0].getValue()===currentBoard[1][1].getValue() && currentBoard[0][0].getValue()===currentBoard[2][2].getValue() && currentBoard[0][0].getValue() != ''||
           currentBoard[2][0].getValue()===currentBoard[1][1].getValue() && currentBoard[2][0].getValue()===currentBoard[0][2].getValue() && currentBoard[2][0].getValue() != ''||
           currentBoard[0][0].getValue()===currentBoard[1][0].getValue() && currentBoard[0][0].getValue()===currentBoard[2][0].getValue() && currentBoard[0][0].getValue() != ''||
           currentBoard[0][1].getValue()===currentBoard[1][1].getValue() && currentBoard[0][1].getValue()===currentBoard[2][1].getValue() && currentBoard[0][1].getValue() != ''||
           currentBoard[0][2].getValue()===currentBoard[1][2].getValue() && currentBoard[0][2].getValue()===currentBoard[2][2].getValue() && currentBoard[0][2].getValue() != ''){
                return true;
           }
        else{
            return false;
        }
    }

    const checkForTie = (currentBoard) =>{
        let check=true;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(currentBoard[i][j].getValue()===''){
                    check=false;
                }
            }
        }
        return check;
    }

    const playRound = (row,column) => {
        
    
        console.log(
            `Drawing ${getActivePlayer().name}'s symbol at [${row},${column}]...`
        );

        board.drawSymbol(row, column, getActivePlayer().token);

        const resultDiv=document.querySelector('.result');
        const currentBoard = board.getBoard();
        
        if(checkForWin(currentBoard)){
            resultDiv.textContent=`${getActivePlayer().name} wins!`;
            console.log(`${getActivePlayer().name} wins!`);
            console.log(`Starting new round...`)
            board.clearBoard();
            activePlayer=players[1];
           }
        else if(checkForTie(currentBoard)){
            console.log("It's a tie!")
            console.log(`Starting new round...`)
            board.clearBoard();
            activePlayer=players[1];
        }

    
        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}


function ScreenController(){
    const game = gameController();
    const playerTurnDiv=document.querySelector('.turn');
    const resultDiv=document.querySelector('.result');
    const boardDiv=document.querySelector('.board');

    const updateScreen=()=>{
        //clear the board
        boardDiv.textContent="";
        resultDiv.textContent="";

        //get newest version of board/turn
        const board=game.getBoard();
        const activePlayer=game.getActivePlayer();

        //display turn
        playerTurnDiv.textContent=`${activePlayer.name}'s turn...`

        //render board squares
        var rowCount= 0;
        board.forEach(row => {
            
            row.forEach((cell,index) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.column =index
                cellButton.dataset.row=rowCount
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
            rowCount++;
        })
    }

    //event listener for board
    function clickHandlerBoard(e){
        const selectedRow=e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        if(!selectedColumn) return;

        game.playRound(selectedRow,selectedColumn);
        updateScreen();
    }
    boardDiv.addEventListener("click", clickHandlerBoard);

    updateScreen();
}

ScreenController();

//const game = gameController();