function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    var randomNumber = Math.floor(random * maxValue) + minValue;
    return randomNumber;
}
function changePlayers() {
    var currentPlayerName = document.getElementById("current");
    var player1 = document.getElementById("player1").value;
    var player2 = document.getElementById("player2").value;
    if (currentPlayerName.innerText == player1) {
        currentPlayerName.innerText = player2;
    }
    else {
        currentPlayerName.innerText = player1;
    }
}
window.onload = function () {
    var newGameBtn = document.getElementById("new-game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    document.getElementById("score1").value = "0";
    document.getElementById("score2").value = "0";
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    var errorDisplayElement = document.getElementById("name-errors");
    errorDisplayElement.innerHTML = "";
    if (player1Name == null || player1Name == "") {
        var nameErrorElement = document.createElement("p");
        nameErrorElement.innerText = "Please enter a valid name for Player 1.";
        errorDisplayElement.appendChild(nameErrorElement);
    }
    else if (player2Name == null || player2Name == "") {
        var nameErrorElement = document.createElement("p");
        nameErrorElement.innerText = "Please enter a valid name for Player 2.";
        errorDisplayElement.appendChild(nameErrorElement);
    }
    else if (player1Name == player2Name) {
        var nameErrorElement = document.createElement("p");
        nameErrorElement.innerText = "Please enter distinct names for each player";
        errorDisplayElement.appendChild(nameErrorElement);
    }
    else {
        document.getElementById("total").value = "0";
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        document.getElementById("roll").removeAttribute("disabled");
        document.getElementById("hold").removeAttribute("disabled");
        changePlayers();
    }
}
function rollDie() {
    var turnTotal = parseInt(document.getElementById("total").value);
    var numberRolled = generateRandomValue(1, 6);
    if (numberRolled == 1) {
        changePlayers();
        turnTotal = 0;
    }
    else {
        turnTotal += numberRolled;
    }
    document.getElementById("total").value = turnTotal.toString();
    document.getElementById("die").value = numberRolled.toString();
}
function holdDie() {
    var turnTotal = parseInt(document.getElementById("total").value);
    var currentPlayerName = document.getElementById("current").innerText;
    var player1 = document.getElementById("player1").value;
    var currentScoreId = "";
    if (currentPlayerName == player1) {
        currentScoreId = "score1";
    }
    else {
        currentScoreId = "score2";
    }
    document.getElementById(currentScoreId).value =
        (parseInt(document.getElementById(currentScoreId).value) + turnTotal).toString();
    document.getElementById("total").value = "0";
    document.getElementById("die").value = "0";
    if (parseInt(document.getElementById(currentScoreId).value) > 100) {
        endGame(currentPlayerName);
    }
    changePlayers();
}
function endGame(currentPlayerName) {
    var errorDisplayElement = document.getElementById("name-errors");
    var victoryMessage = document.createElement("p");
    victoryMessage.innerText = "Congratulations! ".concat(currentPlayerName, " wins!");
    errorDisplayElement.appendChild(victoryMessage);
    document.getElementById("player1").removeAttribute("disabled");
    document.getElementById("player2").removeAttribute("disabled");
}
