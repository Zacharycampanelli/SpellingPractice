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
var submitBtn = document.querySelector(".submit");

var titleEl = document.querySelector(".title");
var timerEl = document.querySelector(".timer");
var timer = 30;
var currentLevel = 1;
var currentWord;
var wordList = [];
// var frequencyList = [];
var definitionList = [];
var questionNum = 0;

// var easy = [];
// var medium = [];
// var hard = [];

// Timer Function
function setTimer() {
  timeInterval = setInterval(function () {
    if (timer > 0) {
      timerEl.textContent = timer;
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
async function getDefinition(word) {
  const response = await fetch(
    "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" +
      word +
      "?key=9294c7d2-c67b-4413-96a7-06eaf28b0be7"
  );
  const data = await response.json();
  console.log(data);
  if (data[0] != undefined) {
    var definitionWord = data[0].shortdef[0];
    definitionList.push(definitionWord);
    console.log(definitionList);
    definitionEl.textContent = definitionWord;
    currentWord = wordList[0];
    console.log(currentWord);
  }

  // ERROR HANDLING HERE
  else {
  }
}
// .catch(function (err) {
//   console.error(err);
// });
//}

// Dynamically updates html page
function updatePage(level) {
  console.log(level);
  for (i = 0; i < level.length; i++) {
    currentWord = level[i];
    getDefinition(level[questionNum]);
  }
}

// Returns a global array of words created with the random words api
function getArray(list, input) {
  for (i = 0; i < input.length; i++) {
    list.push(input[i]);
  }
}

// Sorts words based on frequency score
// function scoreFrequency(item) {
//   console.log(item);
//   if (item.score > 4.5) {
//     easy.push(item.word);
//   } else if (item.score > 3) {
//     medium.push(item.word);
//   } else if (item.score > 0) {
//     hard.push(item.word);
//   }
// }
//
// // Returns the frequency (0 - 7) of a word to rate it's difficulty
// async function getFrequencyAPI() {
//   var word;
//   var freq;
//   for (var i = 0; i < wordList.length; i++) {
//     const res = await fetch(
//       "https://wordsapiv1.p.rapidapi.com/words/" + wordList[i] + "/frequency",
//       {
//         method: "GET",
//         headers: {
//           "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
//           "x-rapidapi-key":
//             "60c5dbb668msh1e563b9d339bd3ep1cea02jsn0849238ba190",
//         },
//       }
//     )
//       .then(function (res) {
//         if (res.ok && res.status == 200) {
//           res.json().then(function (data) {
//             if (data.frequency.zipf != undefined) {
//               console.log(data.frequency.zipf);
//               freq = data.frequency.zipf;
//               chosenWord = data.word;
//               freq = data.frequency.zipf;
//               var wordScore = {
//                 word: chosenWord,
//                 score: freq,
//               };
//               frequencyList.push(wordScore);
//             }
//           });
//         } else {
//           console.log(
//             "Error Code: " + response.status + "\n" + response.statusText
//           );
//         }
//       })
//       .catch(function (err) {
//         console.error(err);
//       });
//   }

//   for (var i = 0; i < frequencyList.length; i++) {
//     console.log(wordList, freq);
//     console.log(frequencyList[i]);
//     scoreFrequency(frequencyList[i]);
//   }
//   console.log(easy, medium);
//   updatePage(easy);
// }

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
  console.log(data);
  // if
  //   .then(function (response) {
  //     if (response.ok) {
  //       response.json().then(function (data) {
  getArray(wordList, data);

  console.log(wordList);
  for (var i = 0; i < wordList.length; i++) getDefinition(wordList[i]);
  //     });
  // //   }
  // })
  // .catch(function (err) {
  //   console.error(err);
  // });
}

//Start game
startBtn.onclick = () => {
  welcomePage.classList.add("deactiveWelcome");
  userInput.classList.add("activeInput");
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

//Continue game
continueBtn.onclick = () => {
  userInput.classList.remove("activeInput");
  gamePage.classList.add("activeGame");
  setTimer();
  getRandomWord();
};

//Submit button
submitBtn.onclick = function () {
  if (currentWord == document.getElementById("userAnswer").value) {
    console.log("success");
  } else {
    console.log("failure");
  }
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

//onclick speech API

var key = "0e3c3b4db7374feea8cf6109d290d6ec";
var src = "this is working";
var hl = "en-us";
var c = "wav";
var f = "8khz_8bit_mono";
var ssml = false;

var speechButtonEl = document.getElementById("speech-button");

var url =
  "http://api.voicerss.org/?key=0e3c3b4db7374feea8cf6109d290d6ec&hl=" +
  hl +
  "&c=" +
  c +
  "&f=" +
  f +
  "&src=" +
  src;

speechButtonEl.onclick = function talk() {
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
