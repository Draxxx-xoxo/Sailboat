const Log = require("../../handlers/logging")
const functions = require("../../handlers/common_functions")

module.exports = async (discordClient, emoji) => {
  const guildid = emoji.guild.id
  if(emoji.guild.channels.cache.get(await functions.guild_logging(guildid)) != undefined){
    Log.Guild(
      discordClient,
      `Emoji ${emoji.name} was created`,
      emoji.guild.id
    )
  }	
};
  