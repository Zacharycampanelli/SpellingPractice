function getData(word) {
  fetch("https://wordsapiv1.p.rapidapi.com/words/" + word, {
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
          console.log(data, data.results[0]);
        });
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

getData("collaborate");
