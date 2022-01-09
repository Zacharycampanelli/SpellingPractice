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

