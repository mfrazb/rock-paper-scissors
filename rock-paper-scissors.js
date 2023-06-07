// ask user how many rounds to play 
function howManyRounds() {
    //input - none - invoked with nothing passed in when site loads 
    //output - number of rounds to play 
    let numOfRounds = prompt(`Welcome to Rock, Paper, Scissors. How many rounds would you like to play?`);
    if (numOfRounds < 1 || numOfRounds > 10) {
        let secondChanceNum;
        if (numOfRounds < 1) secondChanceNum = prompt(`Please add at least 1 round.`);
        if (numOfRounds > 10) secondChanceNum = prompt(`That's probably too many for today. Choose less than 10 rounds.`);
        if (secondChanceNum < 1 || secondChanceNum > 10) {
            let message = "You gotta play by the rules. See ya next time!";
            sayGoodbye(message);
        }
    }
    // uncomment console log when testing function
    // console.log(numOfRounds);
    return numOfRounds;
}

// // test for executing howManyRounds
// howManyRounds();

// remove game buttons and scoreboard from UI and show final status
function sayGoodbye(status) {
    //input - string with status 
    //output - none

    // remove the rock paper scissors buttons and scoreboard 
    const gameContainer = document.querySelector(".game-container");
    while (gameContainer.hasChildNodes()) {
        gameContainer.removeChild(gameContainer.firstChild);
    }

    // replace with 'goodbye' message when you don't play by the rules
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
    // return computerChoice

    // uncomment console log when testing function
    // console.log(computerChoice);
    return computerChoice;
}

// // test for computerChoice
// getComputerChoice();

// get playerChoice value via user prompt
function getPlayerChoice() {
    const choice = prompt(`Rock, paper, scissors...shoot! What's your choice?`);

    // uncomment console log when testing function
    // console.log(choice);
    return choice;
}

// // test for getPlayerChoice
// getPlayerChoice();

// play round of rock paper scissors 
function playRound(playerChoice, computerChoice) {
    //input - playerChoice - output of getPlayerChoice function, computerChoice - output of getComputerChoice function
    //output - string like 'You lose! Paper beats rock!' 

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
    // play num rounds to see who wins 
    let playerScore = 0;
    let computerScore = 0;
    let roundCount = 1;

    // link player message and scoreboard in html to JS 
    let playerMessage = document.getElementById("player-msg-txt");
    let scoreboard = document.getElementById("scoreboard");

    //update scoreboard div to reflect opening score 0:0
    // scoreboard.textContent = `Computer: ${computerScore} You: ${playerScore}`;

    // store all html buttons (rock, paper, scissors)
    const choices = document.querySelectorAll(".choice");

    // each round - user click initiates round 
    choices.forEach(choice => {
        choice.addEventListener("click", () => {

            // store output of playRound in roundSummary variable [winner, playerMessage]
            let roundSummary = playRound(choice.id, getComputerChoice());

            // if computer is winner, increment computerScore by 1 
            if (roundSummary[0] === 'computer') {
                computerScore++;
            } else if (roundSummary[0] === 'player') {
                // if player is winner, increment playerScore by 1
                playerScore++;
            }

            // update scoreboard on UI 
            scoreboard.textContent = `Round: ${roundCount} of ${num}. ${roundSummary[1]} Computer: ${computerScore}. You: ${playerScore}.`;

            //increment score 
            roundCount++;

            // if roundCount equals num, set scoreboard to appropriate final message
            if (roundCount > num) {
                let message = '';

                // update rock button to 'thanks for playing' 
                const rockButton = document.getElementById("rock");
                rockButton.textContent = `Thanks for playing!`;

                // update scissors button to play again button
                const scissorsButton = document.getElementById("scissors");
                scissorsButton.style.backgroundColor = "blue";
                scissorsButton.textContent = "Play again";
                scissorsButton.addEventListener("click", () => location.reload());


                // update paper button to game summary 
                const paperButton = document.getElementById("paper");

                // playerScore is higher, game summary is 'player is all-time winner' 
                if (computerScore > playerScore) {
                    console.log(`Game's done. Computer is the all-time winner :( Final Score -- Player: ${playerScore}. Computer: ${computerScore}.`);
                    paperButton.textContent = `Computer is the all-time winner :( Final Score -- Player: ${playerScore}. Computer: ${computerScore}.`;
                }
                // if computerScore is higher, print 'computer is all-time winner' to console
                if (playerScore > computerScore) {
                    console.log(`Game's done. Player is the all-time winner :) Final Score -- Player: ${playerScore}. Computer: ${computerScore}.`);
                    paperButton.textContent = `You're the all-time winner :) Final Score -- Player: ${playerScore}. Computer: ${computerScore}.`;
                }
                if (playerScore === computerScore) {
                    console.log(`It's a tie! Winning eludes both player and computer.`);
                    paperButton.textContent = `It's a tie! Winning eludes both you and the computer.`;
                }



                return;
            }

        });
    });
}

// // test for 2 rounds of playBestOutOf 
// playBestOutOf(2);

// // execute playBestOutOf to play x number of rounds of game 
playBestOutOf(howManyRounds());





