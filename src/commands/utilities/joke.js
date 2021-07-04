const fetch = require('node-fetch');

module.exports = {
	name: "joke",
	category: "botinfo",
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, client) => {
		let getJoke = async () => {
			let result = await fetch('https://official-joke-api.appspot.com/random_joke');
			let json = await result.json();
				return json;
		}

		let joke = await getJoke();

		message.channel.send(`Here is your joke ${joke.setup} ${joke.punchline}`);
	},
};
