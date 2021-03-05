require('dotenv').config()
const fs = require('fs');
const Discord = require('discord.js');
const { mainprefix, token, pgkey } = require('../config.json');
const {Client} = require('pg');

const discordclient = new Discord.Client();
discordclient.commands = new Discord.Collection();

const utilities = require('./utilities/index');
const moderation = require('./moderation/index');



discordclient.once('ready', () => {
	console.log('Index.js!');

	discordclient.user.setActivity(`Watching EVEE`)
});






discordclient.login(process.env.token);