window.onload = main;
let correctNumber = 0;
let numAttempts = 1;

function main() {
    let value = prompt("Give me an integer value between 1 and 100.");
    if (value == null) {
        return;
    }
    if (isNaN(Number(value)) || Number(value) > 100 || Number(value) < 1) {
        alert("Invalid input, please try again.");
        main();
    }
    correctNumber = (Math.floor(Math.random() * (value)) + 1);
    console.log(correctNumber);
    let guess = value;
    while(guess != 0) {
        guess = prompt(`Guess the correct number from 1 to ${value}`);
        if (guess == correctNumber) {
            alert(`You win! The answer was ${correctNumber}. It only took you ${numAttempts} tries!`);
            return;
        } else {
            alert("No sorry. Try again!");
            numAttempts++;
        }
    }
    alert(`Bummer...The correct answer was ${correctNumber}.`);
}