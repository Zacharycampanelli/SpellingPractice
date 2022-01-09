var enterButtonEl = document.querySelector("#enter-button");
var definitionEl = document.querySelector("#definition");

var timerEl = document.createElement("div");
var timer = 30;
var currentLevel = 1;

var wordList = [];
var frequencyList = [];

var easy = [];
var medium = [];
var hard = [];

// Gets definition of word
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
  //  fetch("https://random-word-api.herokuapp.com/word?number=10")

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

function startGame() {
  setTimer();
  getRandomWord();

  updatePage();
}

// enterButtonEl.addEventListener("click", getRandomWord);
// enterButtonEl.addEventListener("click", setTimer);
// enterButtonEl.addEventListener("click", updatePage);

enterButtonEl.addEventListener("click", startGame);


