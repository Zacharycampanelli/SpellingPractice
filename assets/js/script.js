var wordList = [];

var easy = [];
var medium = [];
var hard = [];

// Sorts words based on frequency score
function getFrequency(wordScore) {
  if (wordScore.score > 4.5) {
    easy.push(wordScore.word);
  } else if (wordScore.score > 3) {
    medium.push(wordScore.word);
  } else if (wordScore.score > 0) {
    hard.push(wordScore.score);
  }

  console.log(easy, medium, hard);
}

// Returns the frequency (0 - 7) of a word to rate it's difficulty
function getFrequencyAPI() {
  var word;
  var freq;
  for (var i = 0; i < wordList.length; i++) {
    fetch(
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
      .then(function (response) {
        if (response.ok && response.status == 200) {
          response.json().then(function (data) {
            if (data.frequency.zipf) {
              chosenWord = data.word;
              freq = data.frequency.zipf;
              var wordScore = {
                word: chosenWord,
                score: freq,
              };
              console.log(wordScore);
              getFrequency(wordScore);
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
}

// Returns a global array of words created with the random words api
function getArray(input) {
  for (i = 0; i < input.length; i++) {
    wordList.push(input[i]);
  }
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
          getArray(data);
          console.log(wordList);
          getFrequencyAPI();
        });
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

getRandomWord();
