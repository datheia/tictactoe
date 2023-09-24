let currentPlayer = "X";
const tracker = document.getElementById("tracker");
const grid = document.querySelector(".grid");

const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(event) {
  const selectedCell = event.target;
  if (selectedCell.textContent === "") {
    selectedCell.textContent = currentPlayer;
    selectedCell.classList.add(currentPlayer);
    if (checkWin(currentPlayer)) {
      applyWinningAnimation(currentPlayer);
      return;
    }
    if (checkDraw()) {
      alert("It's a draw!");
      resetGame();
      return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTracker();
    selectedCell.style.transform = "scale(0.9)";
    setTimeout(() => {
      selectedCell.style.transform = "scale(1)";
    }, 300);
  }
}

function applyWinningAnimation(winner) {
  grid.style.transition = "background-color 1s ease";
  grid.style.backgroundColor = winner === "X" ? "#4b95ef" : "#f44336";

  setTimeout(() => {
    alert(`Player ${winner} wins!`);
    resetGame();
  }, 1000);
}
  function updateTracker() {
    tracker.textContent = `Player ${currentPlayer}'s Turn`;
  }

function checkWin(player) {
  const winningCombinations = [
    ["A1", "A2", "A3"],
    ["B1", "B2", "B3"],
    ["C1", "C2", "C3"],
    ["A1", "B1", "C1"],
    ["A2", "B2", "C2"],
    ["A3", "B3", "C3"],
    ["A1", "B2", "C3"],
    ["A3", "B2", "C1"]
  ];

  return winningCombinations.some(combination => {
    return combination.every(cellId => {
      const cell = document.getElementById(cellId);
      return cell.classList.contains(player);
    });
  });
}

function checkDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

function showWinnerMessage(message) {
    winnerDisplay.textContent = message;
    document.body.appendChild(winnerDisplay);
  
    setTimeout(() => {
      winnerDisplay.textContent = "";
      document.body.removeChild(winnerDisplay);
    }, 2000);
  }

  function resetGame() {
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("X");
      cell.classList.remove("O");
    });
  
    currentPlayer = "X";
    updateTracker();
    grid.style.backgroundColor = "#eee";
  }

