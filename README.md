

# Documentation for `script.js` (Tic Tac Toe)

## Overview

This script implements a simple browser-based Tic Tac Toe game using JavaScript modules and factory functions. It organizes code into three main components:

* **Player** (factory function for player objects)
* **gameBoard** (module for the board state)
* **displayController** (module for handling UI interactions)
* **gameController** (module for the main game logic)

---

## 1. Player Factory

```js
const Player = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return sign;
  };

  return { getSign };
};
```

**Purpose:**
Creates a player object with a sign ("X" or "O").

**Methods:**

* `getSign()`: Returns the player's sign.

---

## 2. Game Board Module

```js
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setField = (index, sign) => {
    if (index > board.length) return;
    board[index] = sign;
  };

  const getField = (index) => {
    if (index > board.length) return;
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { setField, getField, reset };
})();
```

**Purpose:**
Manages the board state as a one-dimensional array of 9 cells.

**Methods:**

* `setField(index, sign)`: Sets a board cell at `index` with the player's sign.
* `getField(index)`: Gets the value (sign) at a specific cell.
* `reset()`: Resets the board to its initial empty state.

---

## 3. Display Controller Module

```js
const displayController = (() => {
  const fieldElements = document.querySelectorAll(".field");
  const messageElement = document.getElementById("message");
  const restartButton = document.getElementById("restart-button");

  fieldElements.forEach((field) =>
    field.addEventListener("click", (e) => {
      if (gameController.getIsOver() || e.target.textContent !== "") return;
      gameController.playRound(parseInt(e.target.dataset.index));
      updateGameboard();
    })
  );

  restartButton.addEventListener("click", (e) => {
    gameBoard.reset();
    gameController.reset();
    updateGameboard();
    setMessageElement("Player X's turn");
  });

  const updateGameboard = () => {
    for (let i = 0; i < fieldElements.length; i++) {
      fieldElements[i].textContent = gameBoard.getField(i);
    }
  };

  const setResultMessage = (winner) => {
    if (winner === "Draw") {
      setMessageElement("It's a draw!");
    } else {
      setMessageElement(`Player ${winner} has won!`);
    }
  };

  const setMessageElement = (message) => {
    messageElement.textContent = message;
  };

  return { setResultMessage, setMessageElement };
})();
```

**Purpose:**
Handles all UI updates and user interactions.

**Key Features:**

* Adds click listeners to all game fields (cells).

  * When a cell is clicked:

    * Checks if the game is over or if the cell is already occupied.
    * If valid, plays the round via `gameController`, and updates the board display.
* Adds a click listener to the restart button.

  * Resets the board, game state, updates display, and shows the initial message.
* `updateGameboard()`: Updates the DOM with the current board state.
* `setResultMessage(winner)`: Displays winner or draw messages.
* `setMessageElement(message)`: Updates the turn/message area in the UI.

---

## 4. Game Controller Module

```js
const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 1;
  let isOver = false;

  const playRound = (fieldIndex) => {
    gameBoard.setField(fieldIndex, getCurrentPlayerSign());
    if (checkWinner(fieldIndex)) {
      displayController.setResultMessage(getCurrentPlayerSign());
      isOver = true;
      return;
    }
    if (round === 9) {
      displayController.setResultMessage("Draw");
      isOver = true;
      return;
    }
    round++;
    displayController.setMessageElement(
      `Player ${getCurrentPlayerSign()}'s turn`
    );
  };

  const getCurrentPlayerSign = () => {
    return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
  };

  const checkWinner = (fieldIndex) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .filter((combination) => combination.includes(fieldIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getField(index) === getCurrentPlayerSign()
        )
      );
  };

  const getIsOver = () => {
    return isOver;
  };

  const reset = () => {
    round = 1;
    isOver = false;
  };

  return { playRound, getIsOver, reset };
})();
```

**Purpose:**
Contains the core game logic: manages rounds, turns, checking for a winner, and game state.

**Methods/Features:**

* `playRound(fieldIndex)`: Handles a move at `fieldIndex`, checks for win/draw, advances turn.
* `getCurrentPlayerSign()`: Returns "X" or "O" based on the current round number.
* `checkWinner(fieldIndex)`: Checks if the current move caused a win (using standard Tic Tac Toe win conditions).
* `getIsOver()`: Returns `true` if the game has finished.
* `reset()`: Resets round count and game-over flag for a new game.

---

## Game Flow (Summary)

1. The user clicks on a cell.
2. The cell click handler checks if the move is allowed, then triggers `gameController.playRound()`.
3. The game controller updates the board, checks for win/draw, and notifies the display controller to update the UI.
4. The display controller updates the board display and message area.
5. The game continues until a win or a draw is detected.
6. Clicking the restart button resets everything for a new game.

---

If you want **inline comments in the code**, let me know and I’ll add them directly inside your script!
