var startBtn = document.querySelector(".start-btn");
var welcomePage = document.querySelector(".welcome-page")
var userInput = document.querySelector(".user-input");
var continueBtn = document.querySelector(".continue-btn");
var gamePage = document.querySelector(".game-page");
var nextBtn = document.querySelector(".next-btn");
var levelPage = document.querySelector(".level-page")

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
  userInput.classList.remove("activeInput");
  gamePage.classList.remove("activeGame");
  levelPage.classList.add("activeLevel")
}