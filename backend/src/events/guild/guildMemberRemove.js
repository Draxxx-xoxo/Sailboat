const Log = require("../../handlers/logging")
const functions = require("../../handlers/common_functions")

module.exports = async (discordClient, member) => {
  if(member.guild.channels.cache.get(await functions.guild_logging(member.guild.id)) != undefined){
    Log.Guild(
      discordClient,
      ` :outbox_tray:  (${member.user.tag},` + "`" + `${member.id})` + "`" + "left the server)",
      member.guild.id
    )
  }	
};
  