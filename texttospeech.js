fetch("https://voicerss-text-to-speech.p.rapidapi.com/?key=686c70ef815540a7bf530efb66b4255d&src=Hello%2C%20world!&hl=en-us&r=0&c=mp3&f=8khz_8bit_mono", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "voicerss-text-to-speech.p.rapidapi.com",
		"x-rapidapi-key": "686c70ef815540a7bf530efb66b4255d"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});