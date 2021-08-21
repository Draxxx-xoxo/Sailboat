const {Client} = require('pg');
const {pgkey} = require('../../config.json');
const {MessageEmbed} = require('discord.js');
const Log = require('../handlers/logging');
const functions = require('../handlers/common_functions')

module.exports = {
	module:'Censor',
    permissions:[],
	description: "",
	execute: async (message, args, discordclient) => {

		for (let i = 0; i < functions.censorWords(message).length; i++) { 
		  }

		  if (message.content == functions.censorWords[0](message)){
		  console.log(functions.censorWords(message).length)
		  }
    }
};
