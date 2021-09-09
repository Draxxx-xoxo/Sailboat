const {Client} = require('pg');
const {pgkey} = require('../../config.json');
const {MessageEmbed} = require('discord.js');
const Log = require('../handlers/logging');
const functions = require('../handlers/common_functions')

module.exports = {
	module:'Censor',
    permissions:[],
	description: "",
	execute: async (message, discordclient) => {

	if(await functions.censorWords(message)) return

	var censorArray = await functions.censorWords(message);


	for (let i = 0; i < censorArray.length; i++) { 
		if(message.content.includes(censorArray[i])){
			message.delete();

			Log.Send(
				discordclient, 
				`censored message by ${message.member.user.tag} in ${message.channel.id} found blacklist word ${censorArray[i]}` + '```' + message.content + '```', 
				message.guild.id
				)

		}
	}
	}
};
