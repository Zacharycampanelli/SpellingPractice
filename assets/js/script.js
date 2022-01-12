var enterButtonEl = document.querySelector("#enter-button");
var definitionEl = document.querySelector("#definition");
var definitionEl2 = document.querySelector("#definition2");
var definitionEl3 = document.querySelector("#definition3");
var definitionEl4 = document.querySelector("#definition4");
var definitionEl5 = document.querySelector("#definition5");

var startBtn = document.querySelector(".start-btn");
var welcomePage = document.querySelector(".welcome-page");
var userInput = document.querySelector(".user-input");
var continueBtn = document.querySelector(".continue-btn");
var gamePage = document.querySelector(".game-page");
var gamePage2 = document.querySelector(".game-page2");
var gamePage3 = document.querySelector(".game-page3");
var gamePage4 = document.querySelector(".game-page4");
var gamePage5 = document.querySelector(".game-page5");
var nextBtn = document.querySelector(".next-btn");
var nextBtn2 = document.querySelector(".next-btn2");
var nextBtn3 = document.querySelector(".next-btn3");
var nextBtn4 = document.querySelector(".next-btn4");
var nextBtn5 = document.querySelector(".next-btn5");
var levelPage = document.querySelector(".level-page");
var keepgBtn = document.querySelector(".keep-btn2");
var endBtn = document.querySelector(".end-btn");
var endPage = document.querySelector(".end-page");
var submitBtn = document.querySelector(".submit");
var submitBtn2 = document.querySelector(".submit2");
var submitBtn3 = document.querySelector(".submit3");
var submitBtn4 = document.querySelector(".submit4");
var submitBtn5 = document.querySelector(".submit5");
var speechButtonEl = document.getElementById("speech-button");
var speechButtonEl2 = document.getElementById("speech-button2");
var speechButtonEl3 = document.getElementById("speech-button3");
var speechButtonEl4 = document.getElementById("speech-button4");
var speechButtonEl5 = document.getElementById("speech-button5");


var titleEl = document.querySelector(".title");
var timerEl = document.querySelector(".timer");
var timerEl2 = document.querySelector(".timer2");
var timerEl3 = document.querySelector(".timer3");
var timerEl4 = document.querySelector(".timer4");
var timerEl5 = document.querySelector(".timer5");
var timer = 60;
var currentLevel = 1;
var currentWord;
var wordList = [];
var definitionList = [];
var questionNum = 0;


// Timer Function
function setTimer() {
  timeInterval = setInterval(function () {
    if (timer > 0) {
      timerEl.textContent = timer;
      timerEl2.textContent = timer;
      timerEl3.textContent = timer;
      timerEl4.textContent = timer;
      timerEl5.textContent = timer;
      timer--;
    } else {
      timerEl.textContent = 0;
      levelPage.classList.add("activeLevel");
      gamePage.classList.remove("activeGame");
      clearInterval(timeInterval);
    }
  }, 1000);
}

//Gets definition of word
async function getDefinition(list) {
  console.log(list);
  for (i = 0; i < 5; i++) {
    const response = await fetch(
      "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" +
        list[i] +
        "?key=9294c7d2-c67b-4413-96a7-06eaf28b0be7"
    );
    const data = await response.json();
    //console.log(data);
    if (data[0] != undefined) {
      var definitionWord = data[0].shortdef[0];

      var wordObj = {
        word: list[i],
        definition: definitionWord,
      };
      definitionList.push(wordObj);
      console.log(definitionList);
      definitionEl.textContent = definitionList[0].definition;
    }

    // ERROR HANDLING HERE
    else {
    }
  }
}
// .catch(function (err) {
//   console.error(err);
// });
//}

// Returns a global array of words created with the random words api
function getArray(list, input) {
  for (i = 0; i < input.length; i++) {
    list.push(input[i]);
  }
}

// Returns a list of random words
async function getRandomWord() {
  const response = await fetch(
    "https://random-words5.p.rapidapi.com/getMultipleRandom?count=5",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "random-words5.p.rapidapi.com",
        "x-rapidapi-key": "60c5dbb668msh1e563b9d339bd3ep1cea02jsn0849238ba190",
      },
    }
  );
  const data = await response.json();
  getArray(wordList, data);
  console.log(wordList);
}

//Start game
startBtn.onclick = () => {
  welcomePage.classList.add("deactiveWelcome");
  userInput.classList.add("activeInput");
  getRandomWord();
};

// add selectors for button and input
var playerBtnEl = document.querySelector("#enter-button");
var inputName = document.querySelector("#input-name");
var username = document.querySelector("#user-name");

// have the value of the input be added to the Welcome...
document.getElementById("enter-button").onclick = function () {
  document.getElementById("welcome").textContent =
    "Welcome to Spelling Practice, " + inputName.value + " !";

  // select other areas that need a username
  document.getElementById("user-name").textContent = inputName.value;
  document.getElementById("user-name2").textContent = inputName.value;
  document.getElementById("user-name3").textContent = inputName.value;
  document.getElementById("user-name4").textContent = inputName.value;
  document.getElementById("user-name5").textContent = inputName.value;
  document.getElementById("user-name6").textContent = inputName.value;

  titleEl.textContent = inputName;
  // Add the player name to local storage and usage json to make a value
  window.localStorage.setItem("player", JSON.stringify(inputName.value));

  // if a player puts in nothing give a alert.
  if (inputName.value === "") {
    alert("You must enter a name");
  }

  //clear out name after it is entered
  inputName.value = "";
};

//Continue game
continueBtn.onclick = () => {
  userInput.classList.remove("activeInput");
  gamePage.classList.add("activeGame");
  setTimer();
  getDefinition(wordList);
  currentWord = wordList[0];
  console.log(wordList, currentWord);
  definitionEl.textContent = definitionList[questionNum];
};

//Submit button
submitBtn.onclick = function () {
  if (currentWord == document.getElementById("userAnswer").value) {
    console.log("success");
  } else {
    console.log("failure");
  }
};

submitBtn2.onclick = function () {
  if (currentWord == document.getElementById("userAnswer2").value) {
    console.log("success");
  } else {
    console.log("failure");
  }
};

submitBtn3.onclick = function () {
  if (currentWord == document.getElementById("userAnswer3").value) {
    console.log("success");
  } else {
    console.log("failure");
  }
};

submitBtn4.onclick = function () {
  if (currentWord == document.getElementById("userAnswer4").value) {
    console.log("success");
  } else {
    console.log("failure");
  }
};

submitBtn5.onclick = function () {
  if (currentWord == document.getElementById("userAnswer5").value) {
    console.log("success");
  } else {
    console.log("failure");
  }
};

// Next button to the level page
nextBtn.onclick = () => {
  gamePage.classList.remove("activeGame");
  gamePage2.classList.add("activeGame2");
  currentWord = wordList[1];
  definitionEl2.textContent = definitionList[1].definition;
};

nextBtn2.onclick = () => {
  gamePage2.classList.remove("activeGame2");
  gamePage3.classList.add("activeGame3");
  currentWord = wordList[2];
  definitionEl3.textContent = definitionList[2].definition;
};

nextBtn3.onclick = () => {
  gamePage3.classList.remove("activeGame3");
  gamePage4.classList.add("activeGame4");
  currentWord = wordList[3];
  definitionEl4.textContent = definitionList[3].definition;
};

nextBtn4.onclick = () => {
  gamePage4.classList.remove("activeGame4");
  gamePage5.classList.add("activeGame5");
  currentWord = wordList[4];
  definitionEl5.textContent = definitionList[4].definition;
};

nextBtn5.onclick = () => {
  gamePage5.classList.remove("activeGame5");
  levelPage.classList.add("activeLevel");
  
};

//Keep going to the next game level
keepgBtn.onclick = () => {
  levelPage.classList.remove("activeLevel");
  gamePage.classList.add("activeGame");
};

//End button to end screen
endBtn.onclick = () => {
  levelPage.classList.remove("activeLevel");
  endPage.classList.add("activeEndpage");
};

//onclick speech API
speechButtonEl.onclick = function talk1() {
  var key = "0e3c3b4db7374feea8cf6109d290d6ec";
  var src = currentWord;
  var hl = "en-us";
  var c = "wav";
  var f = "8khz_8bit_mono";
  var ssml = false;

console.log(currentWord);

console.log(url);

  var url =
    "http://api.voicerss.org/?key=0e3c3b4db7374feea8cf6109d290d6ec&hl=" +
    hl +
    "&c=" +
    c +
    "&f=" +
    f +
    "&src=" +
    src;
  console.log(url);

  fetch(url)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });

  var audio = document.createElement("audio");

  speechButtonEl.appendChild(audio);

  var hearAudio = new Audio(url);
  hearAudio.play();
};

speechButtonEl2.onclick = function talk2() {
  var key = "0e3c3b4db7374feea8cf6109d290d6ec";
  var src = currentWord;
  var hl = "en-us";
  var c = "wav";
  var f = "8khz_8bit_mono";
  var ssml = false;



  var url =
    "http://api.voicerss.org/?key=0e3c3b4db7374feea8cf6109d290d6ec&hl=" +
    hl +
    "&c=" +
    c +
    "&f=" +
    f +
    "&src=" +
    src;
  console.log(url);

  fetch(url)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });

  var audio = document.createElement("audio");

  speechButtonEl2.appendChild(audio);

  var hearAudio = new Audio(url);
  hearAudio.play();
};

speechButtonEl3.onclick = function talk3() {
  var key = "0e3c3b4db7374feea8cf6109d290d6ec";
  var src = currentWord;
  var hl = "en-us";
  var c = "wav";
  var f = "8khz_8bit_mono";
  var ssml = false;



  var url =
    "http://api.voicerss.org/?key=0e3c3b4db7374feea8cf6109d290d6ec&hl=" +
    hl +
    "&c=" +
    c +
    "&f=" +
    f +
    "&src=" +
    src;
  console.log(url);

  fetch(url)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });

  var audio = document.createElement("audio");

  speechButtonEl3.appendChild(audio);

  var hearAudio = new Audio(url);
  hearAudio.play();
};

speechButtonEl4.onclick = function talk4() {
  var key = "0e3c3b4db7374feea8cf6109d290d6ec";
  var src = currentWord;
  var hl = "en-us";
  var c = "wav";
  var f = "8khz_8bit_mono";
  var ssml = false;



  var url =
    "http://api.voicerss.org/?key=0e3c3b4db7374feea8cf6109d290d6ec&hl=" +
    hl +
    "&c=" +
    c +
    "&f=" +
    f +
    "&src=" +
    src;
  console.log(url);

  fetch(url)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });

  var audio = document.createElement("audio");

  speechButtonEl4.appendChild(audio);

  var hearAudio = new Audio(url);
  hearAudio.play();
};

speechButtonEl5.onclick = function talk5() {
  var key = "0e3c3b4db7374feea8cf6109d290d6ec";
  var src = currentWord;
  var hl = "en-us";
  var c = "wav";
  var f = "8khz_8bit_mono";
  var ssml = false;



  var url =
    "http://api.voicerss.org/?key=0e3c3b4db7374feea8cf6109d290d6ec&hl=" +
    hl +
    "&c=" +
    c +
    "&f=" +
    f +
    "&src=" +
    src;
  console.log(url);

  fetch(url)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });

  var audio = document.createElement("audio");

  speechButtonEl5.appendChild(audio);

  var hearAudio = new Audio(url);
  hearAudio.play();
};

