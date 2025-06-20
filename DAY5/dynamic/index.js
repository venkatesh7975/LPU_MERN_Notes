//guess the number

let root = document.getElementById("root");

let h1=document.createElement("h1");
h1.textContent="Guess the number";
h1.style.textAlign="center";
root.appendChild(h1);


let input = document.createElement("input");
input.type = "number";
input.placeholder = "Enter a number between 1 and 10";
input.style.display = "block";
root.appendChild(input);

let button = document.createElement("button");
button.textContent = "Guess";

root.appendChild(button);

let result = document.createElement("p");
result.style.textAlign = "center";
result.style.fontSize = "20px";
root.appendChild(result);

let randomNumber = Math.floor(Math.random() * 10) + 1;
button.addEventListener("click", function() {
    let userInput = parseInt(input.value);
    if (userInput < 1 || userInput > 10 || isNaN(userInput)) {
        result.textContent = "Please enter a valid number between 1 and 10.";
    } else if (userInput === randomNumber) {
        result.textContent = "Congratulations! You guessed the correct number: " + randomNumber;
    } else {
        result.textContent = "Wrong guess! The correct number was: " + randomNumber;
    }
});

