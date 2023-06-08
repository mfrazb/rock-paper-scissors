// ask user how many rounds to play 
function howManyRounds() {
    //input - none - invoked with nothing passed in when site loads 
    //output - number of rounds to play 

    // ask user how many rounds to play
    let numOfRounds = prompt(`Welcome to Rock, Paper, Scissors. How many rounds would you like to play?`);

    // if user inputs an invalid number
    if (numOfRounds < 1 || numOfRounds > 10) {
        let secondChanceNum;

        // give guidance on picking a valid number 
        if (numOfRounds < 1) secondChanceNum = prompt(`Please add at least 1 round.`);
        if (numOfRounds > 10) secondChanceNum = prompt(`That's probably too many for today. Choose less than 10 rounds.`);

        // if number is still invalid, send to goodbye message 
        if (secondChanceNum < 1 || secondChanceNum > 10) {
            let message = "You gotta play by the rules. See ya next time!";
            sayGoodbye(message);
        }

        return secondChanceNum;
    }
    // uncomment console log when testing function
    // console.log(numOfRounds);
    return numOfRounds;
}

// // test for executing howManyRounds
// howManyRounds();

// remove game buttons and scoreboard from UI and show final status
function sayGoodbye(status) {
    //input - string with goodbye message  
    //output - none

    // remove the rock paper scissors buttons and scoreboard 
    const gameContainer = document.querySelector(".game-container");
    while (gameContainer.hasChildNodes()) {
        gameContainer.removeChild(gameContainer.firstChild);
    }

    // replace with 'goodbye' message
    const goodbye = document.createElement("div");
    goodbye.classList.add("goodbye");
    goodbye.textContent = status;
    gameContainer.appendChild(goodbye);
}

// // test for executing sayGoodbye 
// sayGoodbye(`Turtles rock it.`);

// get computer choice via random number
function getComputerChoice() {
    //input - none - invoked when round is played 
    //output - string with computer choice 

    // create a variable computerChoice with no assignment 
    let computerChoice;
    // randomly select a number between 0 and 1
    const randomNum = Math.random();
    // if number is in bottom 3rd (0 - 0.33), assign computerChoice to 'rock' 
    if (randomNum < 0.33) computerChoice = 'rock';
    // if number is in 2nd 3rd (0.34 - 0.67), assign computerChoice to 'paper'
    else if (randomNum < 0.67) computerChoice = 'paper';
    // if number is in top 3rd (0.68-1), assign computerChoice to 'scissors'
    else computerChoice = 'scissors';

    // uncomment console log when testing function
    // console.log(computerChoice);

    return computerChoice;
}

// // test for computerChoice
// getComputerChoice();

// get playerChoice value via user prompt
function getPlayerChoice() {
    //input - none, user inputs when prompted 
    //output - string with user choice 

    const choice = prompt(`Rock, paper, scissors...shoot! What's your choice?`);

    // uncomment console log when testing function
    // console.log(choice);
    return choice;
}

// // test for getPlayerChoice
// getPlayerChoice();

// play round of rock paper scissors 
function playRound(playerChoice, computerChoice) {
    //input - playerChoice - get from click or output of getPlayerChoice function, computerChoice - output of getComputerChoice function
    //output - array with ['winner', string like 'You lose! Paper beats rock!']

    // if player does not choose rock, paper, or scissors, ask them to try again 
    if (playerChoice.toLowerCase() !== 'rock' && playerChoice.toLowerCase() !== 'paper' && playerChoice.toLowerCase() !== 'scissors') {
        playerChoice = prompt(`Your last choice wasn't valid. Please select rock, paper, or scissors.`);
        return playRound(playerChoice, computerChoice);
    }

    // if player chooses rock, return in an array [winner, playerMessage]
    if (playerChoice.toLowerCase() === 'rock') {
        if (computerChoice === 'paper') return ['computer', `You lost! Paper covers rock!`];
        else if (computerChoice === 'scissors') return ['player', `You win! Rock smashes scissors!`];
    }

    // if player chooses paper, return in an array [winner, playerMessage]
    if (playerChoice.toLowerCase() === 'paper') {
        if (computerChoice === 'scissors') return ['computer', `You lost! Scissors cut paper!`];
        else if (computerChoice === 'rock') return ['player', `You win! Paper covers rock!`];
    }

    // if player chooses scissors, return in an array [winner, playerMessage]
    if (playerChoice.toLowerCase() === 'scissors') {
        if (computerChoice === 'rock') return ['computer', `You lost! Rock smashes scissors!`];
        else if (computerChoice === 'paper') return ['player', `You win! Scissors cut paper!`];
    }

    // if both players make same choice, share what they choose and that it's a tie 
    return ['neither', `It's a tie! You both chose ${computerChoice}.`];
}

// test for executing one round of game 
// console.log(playRound(getPlayerChoice(), getComputerChoice()));


// play x number of rounds to see who wins 
function playBestOutOf(num) {
    // start score and round count 
    let playerScore = 0;
    let computerScore = 0;
    let roundCount = 1;

    // callback function to invoke when user clicks rock, paper, or scissors
    function tallyScore(event) {
        //input - click event from button rock, paper, scissors 
        // output - none 

        // button flashes yellowgreen when user clicks 
        event.target.classList.add("clicking");

        // playRound and store result [winner, playerMessage]
        let roundSummary = playRound(event.target.id, getComputerChoice());

        // if computer is winner, increment computerScore by 1 for scoreboard
        if (roundSummary[0] === 'computer') {
            computerScore++;
        } else if (roundSummary[0] === 'player') {
            // if player is winner, increment playerScore by 1 for scoreboard
            playerScore++;
        }

        // update scoreboard on UI 
        let scoreboard = document.getElementById("scoreboard");
        scoreboard.textContent = `Round: ${roundCount} of ${num}. ${roundSummary[1]} Computer: ${computerScore}. You: ${playerScore}.`;

        //round has been played and score has been recorded
        //increment roundCount 
        roundCount++;

        // when all rounds have been played, set scoreboard to appropriate final message
        if (roundCount > num) {

            // update rock button to 'thanks for playing' on UI
            const rockButton = document.getElementById("rock");
            rockButton.textContent = `Thanks for playing!`;
            rockButton.removeEventListener("click", tallyScore);

            // update scissors button to 'play again' on UI
            const scissorsButton = document.getElementById("scissors");
            scissorsButton.style.backgroundColor = "blue";
            scissorsButton.textContent = "Play again";
            scissorsButton.addEventListener("click", () => location.reload());

            // update paper button to appropriate game summary on UI
            const paperButton = document.getElementById("paper");
            paperButton.removeEventListener("click", tallyScore);

            // playerScore is higher, game summary is 'player is all-time winner' 
            if (computerScore > playerScore) {
                paperButton.style.backgroundColor = "firebrick";
                console.log(`Game's done. Computer is the winner :( Final Score -- Player: ${playerScore}. Computer: ${computerScore}.`);
                paperButton.textContent = `Computer is the winner :( Final Score -- Player: ${playerScore}. Computer: ${computerScore}.`;
            }
            // if computerScore is higher, print 'computer is all-time winner' to console
            if (playerScore > computerScore) {
                paperButton.style.backgroundColor = "turquoise";
                console.log(`Game's done. Player is the winner :) Final Score -- Player: ${playerScore}. Computer: ${computerScore}.`);
                paperButton.textContent = `You're the winner :) Final Score -- Player: ${playerScore}. Computer: ${computerScore}.`;
            }
            if (playerScore === computerScore) {
                paperButton.style.backgroundColor = "silver";
                console.log(`It's a tie! Winning eludes both player and computer.`);
                paperButton.textContent = `It's a tie! Winning eludes both you and the computer.`;
            }
        }
    }

    // add listener to all buttons that initiates round when user clicks a button
    const choices = document.querySelectorAll(".choice");

    choices.forEach(choice => {
        choice.addEventListener("click", tallyScore);
    });

    // callback to invoke when CSS transition is complete
    function removeTransition(event) {
        this.classList.remove("clicking");
    }
    // for all buttons, remove transitions after completed
    choices.forEach(choice => choice.addEventListener("transitionend", removeTransition));
}



// // test for 2 rounds of playBestOutOf 
// playBestOutOf(2);

// // execute playBestOutOf to play x number of rounds of game 
playBestOutOf(howManyRounds());





