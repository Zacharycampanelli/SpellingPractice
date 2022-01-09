var enterButtonEl = document.querySelector("#enter-button");
var definitionEl = document.querySelector("#definition");

var startBtn = document.querySelector(".start-btn");
var welcomePage = document.querySelector(".welcome-page");
var userInput = document.querySelector(".user-input");
var continueBtn = document.querySelector(".continue-btn");
var gamePage = document.querySelector(".game-page");
var nextBtn = document.querySelector(".next-btn");
var levelPage = document.querySelector(".level-page");
var keepgBtn = document.querySelector(".keep-btn2");
var endBtn = document.querySelector(".end-btn");
var endPage = document.querySelector(".end-page");

var titleEl = document.querySelector(".title");
var timerEl = document.querySelector(".timer");
var timer = 30;
var currentLevel = 1;

var wordList = [];
var frequencyList = [];

var easy = [];
var medium = [];
var hard = [];

// Timer Function
function setTimer() {
  timeInterval = setInterval(function () {
    if (timer > 0) {
      timerEl.textContent = timer;
      timer--;
    } else {
      timerEl.textContent = 0;
      clearInterval(timeInterval);
    }
  }, 1000);
}

//Gets definition of word
function getDefinition(word) {
  console.log(word);
  fetch(
    "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" +
      word +
      "?key=9294c7d2-c67b-4413-96a7-06eaf28b0be7"
  )
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(response, data);
          var definitionWord = data[0].shortdef[0];
          definitionEl.textContent = definitionWord;
        });
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

// Dynamically updates html page
function updatePage(level) {
  console.log(level);

  var questionNum = 0;
  var currentWord;
  if (currentLevel === 1) {
    currentWord = level;

    getDefinition(currentWord);
    // definitionEl.innerHTML = ;
  }
}

// Sorts words based on frequency score
function scoreFrequency(item) {
  console.log(item);
  if (item.score > 4.5) {
    easy.push(item.word);
  } else if (item.score > 3) {
    medium.push(item.word);
  } else if (item.score > 0) {
    hard.push(item.word);
  }
}

// Returns a global array of words created with the random words api
function getArray(list, input) {
  for (i = 0; i < input.length; i++) {
    list.push(input[i]);
  }
}

// Returns the frequency (0 - 7) of a word to rate it's difficulty
async function getFrequencyAPI() {
  var word;
  var freq;
  for (var i = 0; i < wordList.length; i++) {
    const res = await fetch(
      "https://wordsapiv1.p.rapidapi.com/words/" + wordList[i] + "/frequency",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          "x-rapidapi-key":
            "60c5dbb668msh1e563b9d339bd3ep1cea02jsn0849238ba190",
        },
      }
    )
      .then(function (res) {
        if (res.ok && res.status == 200) {
          res.json().then(function (data) {
            if (data.frequency.zipf != undefined) {
              //   {
              console.log(data.frequency.zipf);
              freq = data.frequency.zipf;
              chosenWord = data.word;
              freq = data.frequency.zipf;
              var wordScore = {
                word: chosenWord,
                score: freq,
              };
              frequencyList.push(wordScore);
              //frequencyList.push(data.frequency.zipf);
              //   }
            }
          });
        } else {
          console.log(
            "Error Code: " + response.status + "\n" + response.statusText
          );
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  for (var i = 0; i < frequencyList.length; i++) {
    console.log(wordList, freq);
    console.log(frequencyList[i]);
    //scoreFrequency(wordList[i], frequencyList[i]);
    scoreFrequency(frequencyList[i]);
  }
  console.log(easy, medium);
  updatePage(easy);
}

// Returns a list of random words
function getRandomWord() {
  var words;

  fetch("https://random-words5.p.rapidapi.com/getMultipleRandom?count=5", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "random-words5.p.rapidapi.com",
      "x-rapidapi-key": "60c5dbb668msh1e563b9d339bd3ep1cea02jsn0849238ba190",
    },
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          getArray(wordList, data);
          console.log(wordList);
          getFrequencyAPI();
        });
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

//Start game
startBtn.onclick = () => {
  welcomePage.classList.add("deactiveWelcome");
  userInput.classList.add("activeInput");
};

//Continue game
continueBtn.onclick = () => {
  userInput.classList.remove("activeInput");
  gamePage.classList.add("activeGame");
  setTimer();
  getRandomWord();
};

//Next button to the level page
nextBtn.onclick = () => {
  gamePage.classList.remove("activeGame");
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

// add selectors for button and input
var playerBtnEl = document.querySelector("#enter-button");
var inputName = document.querySelector("#input-name");
var username = document.querySelector("#user-name");

// have the value of the input be added to the Welcome...
document.getElementById("enter-button").onclick = function () {
  document.getElementById("welcome").textContent =
    "Welcome to Spell Practice " + inputName.value + " !";

  // select other areas that need a username
  document.getElementById("user-name").textContent = inputName.value;
  document.getElementById("user-names").textContent = inputName.value;

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

//onclick speech API

var key = "2b89fd9e589e45af8478db4356434374";
var src = chosenWord;
var hl = "en-us";
var voice = "Linda";
var c = "mp3";
var f = "44khz_16bit_stereo";
var ssml = false;

document.getElementById("speech-button").onclick = function talk() {
  fetch(
    "http://api.voicerss.org/?key=" +
      key +
      "&hl=" +
      hl +
      "&c=" +
      c +
      "&f=" +
      f +
      "&src=" +
      src,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "voicerss-text-to-speech.p.rapidapi.com",
        "x-rapidapi-key": "2b89fd9e589e45af8478db4356434374",
      }

        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.error(err);
        }),
    }
  );
};

getRandomWord();

enterButtonEl.addEventListener("click", getRandomWord);
enterButtonEl.addEventListener("click", setTimer);
