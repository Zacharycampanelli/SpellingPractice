var startBtn = document.querySelector(".start-btn");
var welcomePage = document.querySelector(".welcome-page")
var userInput = document.querySelector(".user-input");
var continueBtn = document.querySelector(".continue-btn");
var gamePage = document.querySelector(".game-page");


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

