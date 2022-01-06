var wordList = [];
function getData() {
  var word = wordList[0];
  fetch("https://wordsapiv1.p.rapidapi.com/words/" + word , {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
		"x-rapidapi-key": "60c5dbb668msh1e563b9d339bd3ep1cea02jsn0849238ba190"
	}
})
  // fetch(
  //   "https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=" +
  //     word + '"',
  //   {
  //     method: "GET",
  //     headers: {
  //       "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
  //       "x-rapidapi-key": "60c5dbb668msh1e563b9d339bd3ep1cea02jsn0849238ba190",
  //     },
  //   }
  // )
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function getArray(input) {
  for (i = 0; i < input.length; i++) {
    wordList.push(input[i]);
  }
}

function getRandom() {
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
          // words = JSON.stringify(data);
          // console.log(words);
          //getData(words);
          getArray(data);
          console.log(wordList)
          getData();
        });
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

getRandom();
