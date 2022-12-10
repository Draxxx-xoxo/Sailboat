const {Client} = require("pg");
const {MessageEmbed} = require("discord.js");
const Log = require("../handlers/logging");
const functions = require("../handlers/common_functions")

module.exports = {
  module:"Censor",
  permissions:[],
  description: "",
  execute: async (message, discordclient) => {


    var censorArray = await functions.censorWords(message);
    var ignoreChannels = await functions.censorIgnoreChannel(message);
    var ignoreusers = await functions.censorIgnoreUser(message);

    for(let i = 0; i < ignoreChannels.length; i++) {
      if(ignoreChannels[i] == message.channel.id) return;
    };

    for(let i = 0; i < ignoreusers.length; i++) {
      if(ignoreusers[i] == message.member.user.id) return;
    };


    for (let i = 0; i < censorArray.length; i++) { 
      if(message.content.includes(censorArray[i])){
        message.delete();

        Log.Send(
          discordclient, 
          `censored message by ${message.member.user.tag} in ${message.channel.id} found blacklist word ${censorArray[i]}` + "```" + message.content + "```", 
          message.guild.id
        );
        return;
      };
    };
  }
};
