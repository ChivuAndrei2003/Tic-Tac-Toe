function Gameboard(){
  const gameboard = [];
  const rows = 3;
  const columns = 3;
  getUser = '';
  
  for(let i = 0; i < rows; i++) {
    gameboard[i]=[];
    for(let j = 0; j < columns; j++){   //this creates an 3x3 array with Cell() on every line & column
      gameboard[i].push(Cell());
    } 
   }
                                          //getGameboard() is equivalent to :
  const getGameboard = () => gameboard;   //const board = Gameboard();
                                          //board.getGameboard();
   
  const getAvailableCells = () => {
    const cells = [];
      for(let i=0; i < rows ; i++){
        for(let j=0 ; j < columns ; j++){
          if(gameboard[i][j].getValue() === "") {
            cells.push([i,j]);
          }
        }
      }
      return cells;
  };

  const printBoard = () => {
    const boardWithCellValue = gameboard.map((rows) => rows.map((cell) => 
     cell.getValue()))
    console.log(boardWithCellValue);
  };
  
  return{getGameboard,getAvailableCells,printBoard};
}

//board.gameboard[0][0].setValue("X");        // acces direct

function Cell(){
  let value = 0;
  
  const addSign = (player) => {
    value = player;
  };

  const getValue = () => value;

  return{
    addSign,
    getValue
  };
}


function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();

  const players = [
    {
      name:playerOneName,
      token:'X'
    },
    {
      name:playerTwoName,
      token:'O'
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] :
    players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn. `);
  };

  const playRound = () => {
    
  }
}





/*
const dropSign = () => {
   
    const availableCells = gameboard.forEach(element => {
   
      if(element)

   });
  }













*/
