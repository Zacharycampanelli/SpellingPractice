var startBtn = document.querySelector(".start-btn");
var welcomePage = document.querySelector(".welcome-page")
var userInput = document.querySelector(".user-input");
var continueBtn = document.querySelector(".continue-btn");
var gamePage = document.querySelector(".game-page");
var nextBtn = document.querySelector(".next-btn");
var levelPage = document.querySelector(".level-page")
var keepgBtn = document.querySelector(".keep-btn2")
var endBtn = document.querySelector(".end-btn")
var endPage = document.querySelector(".end-page")

//Start game
startBtn.onclick = ()=>{
  welcomePage.classList.add("deactiveWelcome")
  userInput.classList.add("activeInput");
}

//Continue game
continueBtn.onclick = ()=>{
  userInput.classList.remove("activeInput");
  gamePage.classList.add("activeGame");
}

//Next button to the level page
nextBtn.onclick = ()=>{
  gamePage.classList.remove("activeGame");
  levelPage.classList.add("activeLevel")
}

//Keep going to the next game level
keepgBtn.onclick =()=>{
  levelPage.classList.remove("activeLevel");
  gamePage.classList.add("activeGame");
}

//End button to end screen
endBtn.onclick =()=>{
  levelPage.classList.remove("activeLevel");
  endPage.classList.add("activeEndpage")
}

getRandomWord();

// add selectors for button and input
var playerBtnEl = document.querySelector("#enter-button");
var inputName = document.querySelector("#input-name");
var username = document.querySelector("#user-name");

// have the value of the input be added to the Welcome...
document.getElementById("enter-button").onclick = function () {
  document.getElementById("welcome").textContent = "Welcome to Spell Practice " + inputName.value + " !";

  // select other areas that need a username
  document.getElementById("user-name").textContent = inputName.value
  document.getElementById("user-names").textContent = inputName.value

  // Add the player name to local storage and usage json to make a value
  window.localStorage.setItem("player", JSON.stringify(inputName.value));

  // if a player puts in nothing give a alert.
  if (inputName.value === "") {
    alert("You must enter a name");
  }

  //clear out name after it is entered
  inputName.value = "";
}


// Timer Function
function setTimer() {
  timeInterval = setInterval(function () {
    if (timer > 0) {
      timerEl.textContent = timer;
      timer--;
    } else {
      timerEl.textContent = 0;
      clearInterval(timeInterval);
    }console.log(timer)
    
  }, 1000);
}

enterButtonEl.addEventListener("click", getRandomWord);
enterButtonEl.addEventListener("click", setTimer);

