const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const {Client} = require("pg");
const buttons = require("../../handlers/common_buttons");

module.exports = {
  name: "configurator",
  category: "botinfo",
  description: "Returns bot and API latency in milliseconds.",
  enable: true,
  main_button: async (message, discordClient) => {
    if(message.component.customId.toLowerCase() == "mutes"){
      var mute_config_buttons = require("./config_buttons/mute_config_buttons")
      mute_config_buttons.mute(message, discordClient)
    }
    if(message.component.customId.toLowerCase() == "reporting"){
      var report_config_buttons = require("./config_buttons/report_config_buttons")
      report_config_buttons.report(message, discordClient)
    }
    if(message.component.customId.toLowerCase() == "logging" ){

    } 

  }
}
