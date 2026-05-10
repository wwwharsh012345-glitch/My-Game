// Get references to important DOM elements
const boardElement = document.getElementById('board'); // The main game board container
const statusElement = document.getElementById('status'); // Element to display game status (e.g., current player, win/draw)
const resetBtn = document.getElementById('reset');     // The reset game button
const cells = document.querySelectorAll('.cell');      // All individual cell elements on the board

// Game state variables
let currentPlayer = 'X'; // Tracks the current player, starting with 'X'
// Represents the Tic-Tac-Toe board state. Each element corresponds to a cell's content ('X', 'O', or empty string).
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;   // Flag to indicate if the game is currently ongoing

// Defines all possible winning combinations of cell indices
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Winning conditions for rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Winning conditions for columns
    [0, 4, 8], [2, 4, 6]             // Winning conditions for diagonals
];

/**
 * Handles a click event on a game cell.
 * @param {Event} e The event object from the click.
 */
function handleCellClick(e) {
    const clickedCell = e.target; // The specific cell element that was clicked
    // Get the data-index attribute from the clicked cell and convert it to an integer
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    // If the clicked cell is already occupied or the game is not active, do nothing
    if (gameState[clickedIndex] !== "" || !gameActive) {
        return;
    }

    // Update the game state and the UI for the clicked cell
    updateCell(clickedCell, clickedIndex);
    // After updating the cell, check if there's a winner or a draw
    checkResult();
}

/**
 * Updates the game state array and the UI of a specific cell.
 * @param {HTMLElement} cell The HTML element of the cell to update.
 * @param {number} index The index of the cell in the gameState array.
 */
function updateCell(cell, index) {
    gameState[index] = currentPlayer; // Update the internal game state array
    cell.innerText = currentPlayer;   // Update the text content of the cell in the UI
}

/**
 * Checks if the current game state results in a win, a draw, or if the game should continue.
 * Updates the status display and gameActive flag accordingly.
 */
function checkResult() {
    let roundWon = false; // Flag to track if the current player has won

    // Iterate through all defined winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i]; // Destructure the current winning condition indices

        // Check if all three cells in the condition are non-empty and have the same player's mark
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true; // Set win flag to true
            break;           // No need to check other conditions if a win is found
        }
    }

    // If a player has won
    if (roundWon) {
        statusElement.innerText = `Player ${currentPlayer} Wins!`; // Display win message
        gameActive = false; // Deactivate the game
        return;             // End the function
    }

    // If there's no winner and all cells are filled, it's a draw
    if (!gameState.includes("")) {
        statusElement.innerText = "It's a Draw!"; // Display draw message
        gameActive = false; // Deactivate the game
        return;             // End the function
    }

    // If no win or draw, switch the current player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.innerText = `Player ${currentPlayer}'s Turn`; // Update status for the next player
}

/**
 * Resets the game to its initial state.
 * Clears the board, resets player turn, and reactivates the game.
 */
function resetGame() {
    currentPlayer = "X"; // Reset current player to 'X'
    // Reset the game state array to all empty strings
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;   // Reactivate the game
    statusElement.innerText = "Player X's Turn"; // Set initial status message
    // Clear the text content of all cells in the UI
    cells.forEach(cell => cell.innerText = "");
}

// Add click event listeners to each game cell
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
// Add click event listener to the reset button
resetBtn.addEventListener('click', resetGame);