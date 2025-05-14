const readlineSync = require("readline-sync");

console.log("Welcome to the Number Guessing Game!");
console.log("I'm thinking of a number between 1 and 100.");

let number
let score = {
    "Easy":11,
    "MEdium":6,
    "Hard": 4
}
const log = () => {
  number = Math.floor(Math.random() * 100) + 1;
  console.log("\n Please select the difficulty level:");
  console.log("1. Easy (10 chances)");
  console.log("2. Medium (5 chances)");
  console.log("3. Hard (3 chances)");
};

log();

const game = (level, chances) => {
  console.log(
    `\n Great! You have selected the ${level} difficulty level. \n Let's start the game!`
  );
  let startTime = new Date().getTime();
  let attempts = 1;
  while (attempts <= chances) {
    let choice = readlineSync.question("\n Enter your guess: ");
    if (choice == number) {
      break;
    } else if (Number(choice) < number) {
      console.log(`Incorrect! The number is greater than ${choice}.`);
    } else if (Number(choice) > number) {
      console.log(`Incorrect! The number is less than ${choice}.`);
    }
    attempts++;
  }
  let endTime = new Date().getTime();
  let timeTaken = Math.floor((endTime - startTime)/1000);
  if (attempts > chances) {
    console.log("\n your attempts finished you don't guess the number correct");
  }else{
    console.log(`\n Congratulations! You guessed the correct number in ${attempts} attempts and ${timeTaken} second.`);
    if(attempts < score[level]){
        score[level] = attempts
    }
  }
  console.log("\n You are countinue start the game");
  let count = ["Si", "view score for all level and new game"]
  let start = readlineSync.keyInSelect(count, 'enter your choice?, if cancel the game you lost the score.');
  if (count[start] === "Si"){
    log()
    difficulty()
  }
  if(count[start] === "view score for all level and new game"){
    for(let i of Object.keys(score)){
        if(i === "Hard" && score[i] < 4){
            console.log(`\n score from ${i} is ${score[i]}`)
        }
        if(i === "Easy" && score[i] < 11){
            console.log(`score from ${i} is ${score[i]}`)
        }
        if(i === "Medium" && score[i] < 6){
            console.log(`score from ${i} is ${score[i]}\n`)
        }
    }
    log()
    difficulty()
  }
};

const difficulty = () => {
  let choice = readlineSync.question("\n Enter your choice: ");
  if (choice == 1) {
    game("Easy", 10);
  } else if (choice == 2) {
    game("Medium ", 5);
  } else if (choice == 3) {
    game("Hard", 3);
  } else {
    console.log("please enter a number between 1 to 3");
    difficulty()
  }
};
difficulty();