/**
 * This function generates random values within 
 * the given minimum and maximum(inclusive).
 * @param minValue A number value that represents the smallest
 *      number that can be randomly generated.
 * @param maxValue A number value that represents the biggest
 *      number that can be randomly generated.
 * @returns A random number between the minimum and maximum values(inclusive).
 */
function generateRandomValue(minValue:number, maxValue:number):number{
    var random = Math.random();
    
    let randomNumber = Math.floor(random * maxValue) + minValue;

    return randomNumber;
}

/**
 * This function changes the player who's turn it is to roll the dice.
 */
function changePlayers():void{
    let currentPlayerName = document.getElementById("current");
    let player1 = <HTMLInputElement>document.getElementById("player1");
    let player2 = <HTMLInputElement>document.getElementById("player2");

    // I'm comparing them based off of a class so that I can do some css
    // styling in the future, and it makes a bit more sense to me.
    if (!player1.classList.contains("current-turn")){
        player1.classList.add("current-turn");
        currentPlayerName.innerText = player1.innerText;
    } else {
        player2.classList.add("current-turn");
        currentPlayerName.innerText = player2.innerText;
    }
}

// using window.onload to set up onclicks and make a new game.
window.onload = function(){
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;

    document.getElementById("roll").onclick = rollDie;

    document.getElementById("hold").onclick = holdDie;
}

/**
 * This function makes a new game and sets the first player's turn.
 */
function createNewGame(){
    //set player 1 and player 2 scores to 0
    (<HTMLInputElement>document.getElementById("score1")).value = "0";
    (<HTMLInputElement>document.getElementById("score2")).value = "0";

    // getting the player names off of the website.
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    // getting the error display div
    let errorDisplayElement:HTMLElement = document.getElementById("name-errors");
    
    // checking if the player names are null or empty
    if (player1Name == null || player1Name == ""){
        let nameErrorElement = document.createElement("p");
        nameErrorElement.innerText = "Please enter a valid name for Player 1.";
        errorDisplayElement.appendChild(nameErrorElement);
    }
    if (player2Name == null || player2Name == ""){
        let nameErrorElement = document.createElement("p");
        nameErrorElement.innerText = "Please enter a valid name for Player 2.";
        errorDisplayElement.appendChild(nameErrorElement);
    }

    // initializing a new game if the players have valid names
    if (!(player1Name == null && player1Name == "") && !(player2Name == null && player2Name == "")){
        //if both players do have a name start the game!
        document.getElementById("turn").classList.add("open");
        (<HTMLInputElement>document.getElementById("total")).value = "0";
        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}

/**
 * This function gets a random number from generateRandomValue(),
 * if the number is a 1, it changes players and sets the Turn total to 0.
 * Otherwise, the function adds the generated number to the Turn total.
 */
function rollDie():void{
    let turnTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let numberRolled:number = generateRandomValue(1, 6);

    //if the roll is 1
    if (numberRolled == 1){
        changePlayers();    //  change players
        turnTotal = 0; //  set current total to 0
    } else {
        turnTotal += numberRolled; //  add roll value to current total
    } 

    //set the die roll to value player rolled
    //display current total on form
    (<HTMLInputElement>document.getElementById("die")).value = numberRolled.toString();
}

/**
 * This function takes the current Turn total and the current player,
 * and adds the Turn total to that player's Game total. Then it resets
 * the Turn total to 0 and changes to the next player's turn.
 */
function holdDie():void{
    //get the current turn total
    let turnTotal:number = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    let player1 = <HTMLInputElement>document.getElementById("player1");
    let currentScoreId = "";
    //determine who the current player is
    if (player1.classList.contains("current-turn")){
        currentScoreId = "score2";
    } else {
        currentScoreId = "score2";
    }
    //add the current turn total to the player's total score
    (<HTMLInputElement>document.getElementById(currentScoreId)).value = // the value of the current player's score
        (parseInt((<HTMLInputElement>document.getElementById(currentScoreId)).value) + turnTotal).toString();
    // equals what is already in the box ^^^                            plus the Turn total ^^^

    //reset the turn total to 0
    turnTotal = 0;
    
    //change players
    changePlayers();
}