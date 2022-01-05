function getData(word) {
  fetch("https://wordsapiv1.p.rapidapi.com/words/" + word + "/frequency", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "60c5dbb668msh1e563b9d339bd3ep1cea02jsn0849238ba190",
    },
  })
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data, data.results);
        });
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

getData("collaborate");

// function getRandomWord() {
//   fetch(
//     "https://wordsapiv1.p.rapidapi.com/words/?limit=10&frequencymin=1.74-3&hasDetails=hasDetails",
//     {
//       method: "GET",
//       headers: {
//         "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
//         "x-rapidapi-key": "60c5dbb668msh1e563b9d339bd3ep1cea02jsn0849238ba190",
//       },
//     }
//   )
//     .then(function (response) {
//       if (response.ok) {
//         console.log(response);
//         response.json().then(function (data) {
//           console.log(data, data.results);
//         });
//       }
//     })
//     .catch(function (err) {
//       console.error(err);
//     });
// }

// getRandomWord();
fetch(
  "https://wordsapiv1.p.rapidapi.com/words/?frequencymin=5&frequencymax=6&random=true",  {
    method: "GET",
    headers: {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "60c5dbb668msh1e563b9d339bd3ep1cea02jsn0849238ba190",
    },
  }
)
.then(function (response) {
  if (response.ok) {
    console.log(response);
    response.json().then(function (data) {
      console.log(data, data.results);
    });
  }
})
.catch(function (err) {
  console.error(err);
});