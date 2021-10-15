const fetch = require('node-fetch');
const express = require('express');
const { clientId, clientSecret, port } = require('./config.json');

const app = express();

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get('/test', async ({ query }, response, ) => {
	const { code } = query;

	if(!code){
		await response.sendfile(__dirname + "/index.html");
	}
	if (code) {
		try {
			const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: clientId,
					client_secret: clientSecret,
					code,
					grant_type: 'authorization_code',
					redirect_uri: `http://localhost:${port}/test`,
					scope: 'identify',
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			const oauthData = await oauthResult.json();

			const userResult = await fetch('https://discord.com/api/users/@me/guilds', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			console.log(await userResult.json());
		} catch (error) {
			console.error(error);
		}
	}
	return response.sendFile(__dirname + "/configuation_files/746773959068090368.yml");
});

  
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));