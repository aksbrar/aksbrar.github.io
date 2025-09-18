// lab1.js
import prompt from "prompt";

// Start the prompt
prompt.start();

// Ask the user for their choice
prompt.get(['userSelection'], function (err, result) {

    let userSelection = result.userSelection.toUpperCase();

    // Generate computer's choice
    let randomNumber = Math.random();
    let computerChoice;

    if (randomNumber <= 0.34) {
        computerChoice = "PAPER";
    } else if (randomNumber <= 0.67) {
        computerChoice = "SCISSORS";
    } else {
        computerChoice = "ROCK";
    }

    console.log(`User Selection: ${userSelection}`);
    console.log(`Computer Selection: ${computerChoice}`);

    // Determine the winner
    if (userSelection === computerChoice) {
        console.log("Tie");
    } else if (
        (userSelection === "ROCK" && computerChoice === "SCISSORS") ||
        (userSelection === "SCISSORS" && computerChoice === "PAPER") ||
        (userSelection === "PAPER" && computerChoice === "ROCK")
    ) {
        console.log("User Wins");
    } else {
        console.log("Computer Wins");
    }
});
