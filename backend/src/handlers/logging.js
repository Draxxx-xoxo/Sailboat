const fs = require("fs");
const functions = require("./pg");

async function pg_table(guildid){
  const pg = await functions.pg(`SELECT * FROM public.configurator_v1s WHERE guild_id = ${guildid}`)
  const config = pg.rows[0]
  return config 
}

module.exports = {
  Command: async (discordclient, log, guildid) => {
    const config = await pg_table(guildid)

    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();

    discordclient.channels.cache
      .get(config.command_logging_channel)
      .send(`\`\`[${hour}:${minute}]\`\` ${log}`);
  },
  Infraction: async (discordclient, log, guildid) => {
    const config = await pg_table(guildid)

    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();

    discordclient.channels.cache
      .get(config.infraction_logging_channel)
      .send(`\`\`[${hour}:${minute}]\`\` ${log}`);
  },
};
