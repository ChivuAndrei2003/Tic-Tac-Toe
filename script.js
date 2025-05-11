function Gameboard(){

    const rows = 3;
    const columns = 3;
    const board=[];

    //this creates a board[1,1],[1,2]
    for(let i = 0;i < rows; i++){
        board[i]=[];

        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard=()=>board;

    const findCellsAvailable=(column, player)=> {

      const availableCells=board.filter((row) => row[column].getValue() === 0).map(row =>
        row[column]);

        if(!availableCells.length) return;

        const lowestRow = availableCells.length - 1;
        board[lowestRow][column].addInput(player);

    };

    const printBoard=() =>{
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };
    
    return { getBoard, findCellsAvailable,printBoard };

}

function Cell(){
    let value = 0;

    const addInput=(player) => {
        value = player;
    };

    return{
        addInput,
        getValue
    };
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
){
    const board = Gameboard();

    const players = [
        {
            name:playerOneName,
            token:1
        },

        {
            name:playerTwoName,
            token:2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    };

    const playRound = (column) => {

        console.log(
            `Dropping ${getActivePlayer().name}'s token into clumn ${column}...`
        );
        board.findCellsAvailable(column,getActivePlayer().token);


        switchPlayerTurn();
        printNewRound();


    };

    printNewRound();


    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();

