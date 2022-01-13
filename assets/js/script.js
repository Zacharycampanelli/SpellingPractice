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
var playerBtnEl = document.querySelector("#enter-button");
var inputName = document.querySelector("#input-name");
var username = document.querySelector("#user-name");
var modal = document.querySelector(".modal");
var modalTimer = document.querySelector("#modal-timer")
var modalCloseEl = document.querySelector(".modal-closes");
var modalBg = document.querySelector(".modal-background");
var modalBgTimer = document.querySelector("#modalbg-timer")
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

var rightOrWrongEl = document.getElementById("success");
var rightOrWrongEl2 = document.getElementById("success2");
var rightOrWrongEl3 = document.getElementById("success3");
var rightOrWrongEl4 = document.getElementById("success4");
var rightOrWrongEl5 = document.getElementById("success5");

var titleEl = document.querySelector(".title");
var timerEl = document.querySelector(".timer");
var timerEl2 = document.querySelector(".timer2");
var timerEl3 = document.querySelector(".timer3");
var timerEl4 = document.querySelector(".timer4");
var timerEl5 = document.querySelector(".timer5");

var rightOrWrongEl = document.getElementById("success");
var rightOrWrongEl2 = document.getElementById("success2");
var rightOrWrongEl3 = document.getElementById("success3");
var rightOrWrongEl4 = document.getElementById("success4");
var rightOrWrongEl5 = document.getElementById("success5");

var timer = 60;
var currentLevel = 1;
var currentWord;
var wordList = [];
var definitionList = [];
var questionNum = 0;

// Timer Function
function setTimer() {
  timeInterval = setInterval(function () {
    if (timer >= 0) {
      timerEl.textContent = timer;
      timerEl2.textContent = timer;
      timerEl3.textContent = timer;
      timerEl4.textContent = timer;
      timerEl5.textContent = timer;
      timer--;
    } else {
      timerEl.textContent = 0;
      modalTimer.classList.add("is-active");
      modalBgTimer.addEventListener("click", () => {
        modalTimer.classList.remove("is-active");
      })
      levelPage.classList.add("activeLevel");
      gamePage.classList.remove("activeGame");
      gamePage2.classList.remove("activeGame2");
      gamePage3.classList.remove("activeGame3");
      gamePage4.classList.remove("activeGame4");
      gamePage5.classList.remove("activeGame5");
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

// have the value of the input be added to the Welcome...
document.getElementById("enter-button").onclick = function () {

  // select other areas that need a username
  document.getElementById("user-name1").textContent = inputName.value;
  document.getElementById("user-name2").textContent = inputName.value;
  document.getElementById("user-name3").textContent = inputName.value;
  document.getElementById("user-name4").textContent = inputName.value;
  document.getElementById("user-name5").textContent = inputName.value;
  document.getElementById("user-name6").textContent = inputName.value;
  document.getElementById("user-name7").textContent = inputName.value;

  document.getElementById("welcome").classList.add("hidden");

  // if a player puts in nothing give a alert.
  if (inputName.value === "") {

    modal.classList.add("is-active");

    modalBg.addEventListener("click", () => {
      modal.classList.remove("is-active");
    })

  } else {
    window.localStorage.setItem("player", inputName.value);
    titleEl.textContent = inputName;
  }

  //clear out name after it is entered
  inputName.value = "";
};

modalCloseEl.onclick = function () {
  // this.removeAttribute("is-active");
  modalCloseEl.classList.remove("is-active");
}

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
  if (
    currentWord.toLowerCase() ==
    document.getElementById("userAnswer").value.toLowerCase()
  ) {
    rightOrWrongEl.classList.remove("has-text-danger");
    rightOrWrongEl.classList.add("has-text-success-dark");
    rightOrWrongEl.textContent = "correct!";
  } else {
    rightOrWrongEl.classList.remove("has-text-success-dark");
    rightOrWrongEl.classList.add("has-text-danger");
    rightOrWrongEl.textContent = "wrong!";
  }
};

submitBtn2.onclick = function () {
  if (
    currentWord.toLowerCase() ==
    document.getElementById("userAnswer2").value.toLowerCase()
  ) {
    rightOrWrongEl2.classList.remove("has-text-danger");
    rightOrWrongEl2.classList.add("has-text-success-dark");
    rightOrWrongEl2.textContent = "correct!";
  } else {
    rightOrWrongEl2.classList.remove("has-text-success-dark");
    rightOrWrongEl2.classList.add("has-text-danger");
    rightOrWrongEl2.textContent = "wrong!";
  }
};

submitBtn3.onclick = function () {
  if (
    currentWord.toLowerCase() ==
    document.getElementById("userAnswer3").value.toLowerCase()
  ) {
    rightOrWrongEl3.classList.remove("has-text-danger");
    rightOrWrongEl3.classList.add("has-text-success-dark");
    rightOrWrongEl3.textContent = "correct!";
  } else {
    rightOrWrongEl3.classList.remove("has-text-success-dark");
    rightOrWrongEl3.classList.add("has-text-danger");
    rightOrWrongEl3.textContent = "wrong!";
  }
};

submitBtn4.onclick = function () {
  if (
    currentWord.toLowerCase() ==
    document.getElementById("userAnswer4").value.toLowerCase()
  ) {
    rightOrWrongEl4.classList.remove("has-text-danger");
    rightOrWrongEl4.classList.add("has-text-success-dark");
    rightOrWrongEl4.textContent = "correct!";
  } else {
    rightOrWrongEl4.classList.remove("has-text-success-dark");
    rightOrWrongEl4.classList.add("has-text-danger");
    rightOrWrongEl4.textContent = "wrong!";
  }
};

submitBtn5.onclick = function () {
  if (
    currentWord.toLowerCase() ==
    document.getElementById("userAnswer5").value.toLowerCase()
  ) {
    rightOrWrongEl5.classList.remove("has-text-danger");
    rightOrWrongEl5.classList.add("has-text-success-dark");
    rightOrWrongEl5.textContent = "correct!";
  } else {
    rightOrWrongEl5.classList.remove("has-text-success-dark");
    rightOrWrongEl5.classList.add("has-text-danger");
    rightOrWrongEl5.textContent = "wrong!";
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
