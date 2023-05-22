function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    var randomNumber = Math.floor(random * maxValue) + minValue;
    return randomNumber;
}
function changePlayers() {
    var currentPlayerName = document.getElementById("current");
    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2");
    if (!player1.classList.contains("current-turn")) {
        player1.classList.add("current-turn");
        currentPlayerName.innerText = player1.innerText;
    }
    else {
        player2.classList.add("current-turn");
        currentPlayerName.innerText = player2.innerText;
    }
}
window.onload = function () {
    var newGameBtn = document.getElementById("new_game");
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
    if (player1Name == null || player1Name == "") {
        var nameErrorElement = document.createElement("p");
        nameErrorElement.innerText = "Please enter a valid name for Player 1.";
        errorDisplayElement.appendChild(nameErrorElement);
    }
    if (player2Name == null || player2Name == "") {
        var nameErrorElement = document.createElement("p");
        nameErrorElement.innerText = "Please enter a valid name for Player 2.";
        errorDisplayElement.appendChild(nameErrorElement);
    }
    if (!(player1Name == null && player1Name == "") && !(player2Name == null && player2Name == "")) {
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
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
    document.getElementById("die").value = numberRolled.toString();
}
function holdDie() {
    var turnTotal = parseInt(document.getElementById("total").value);
    var player1 = document.getElementById("player1");
    var currentScoreId = "";
    if (player1.classList.contains("current-turn")) {
        currentScoreId = "score2";
    }
    else {
        currentScoreId = "score2";
    }
    document.getElementById(currentScoreId).value =
        (parseInt(document.getElementById(currentScoreId).value) + turnTotal).toString();
    turnTotal = 0;
    changePlayers();
}
