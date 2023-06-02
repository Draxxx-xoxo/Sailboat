const Log = require("../../handlers/logging")
const functions = require("../../handlers/common_functions")

module.exports = async (discordClient, channel) => {
  const guildid = channel.guild.id
  if(channel.guild.channels.cache.get(await functions.guild_logging(guildid)) != undefined){
    Log.Guild(
      discordClient,
      "A message was pinned in " + "`" + `${channel.name}` + "`",
      channel.guild.id
    )
  }	
};
  