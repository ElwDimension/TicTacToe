function Game(){

    const board=[];

    for(let i=0;i<3;i++){
        board[i]=[];
        for (let j=0;j<3;j++){
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
      token: 'O'
    },
    {
      name: playerTwo,
      token: 'X'
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

    const playRound = (row,column) => {
    
        console.log(
            `Drawing ${getActivePlayer().name}'s symbol at [${row},${column}]...`
        );

        board.drawSymbol(row, column, getActivePlayer().token);
        
        const currentBoard = board.getBoard();
        if(currentBoard[0][0].getValue()===currentBoard[0][1].getValue() && currentBoard[0][0].getValue()===currentBoard[0][2].getValue() && currentBoard[0][0].getValue() != ''||
           currentBoard[1][0].getValue()===currentBoard[1][1].getValue() && currentBoard[1][0].getValue()===currentBoard[1][2].getValue() && currentBoard[1][0].getValue() != ''|| 
           currentBoard[2][0].getValue()===currentBoard[2][1].getValue() && currentBoard[2][0].getValue()===currentBoard[2][2].getValue() && currentBoard[2][0].getValue() != ''||
           currentBoard[0][0].getValue()===currentBoard[1][1].getValue() && currentBoard[0][0].getValue()===currentBoard[2][2].getValue() && currentBoard[0][0].getValue() != ''||
           currentBoard[2][0].getValue()===currentBoard[1][1].getValue() && currentBoard[2][0].getValue()===currentBoard[0][2].getValue() && currentBoard[2][0].getValue() != ''){
                console.log(`${getActivePlayer().name} wins!`);
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
        getActivePlayer
    };
}

const game = gameController();