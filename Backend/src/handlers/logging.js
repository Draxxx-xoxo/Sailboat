const yaml = require("js-yaml");
const fs = require("fs");
const Discord = require("discord.js");
const functions = require("./pg");

async function pg_table(guildid){
  const pg = await functions.pg(`SELECT * FROM public.configurations WHERE guild_id = ${guildid}`)
  const doc = pg.rows[0].configuration
  return doc 
}

module.exports = {
  Send: async (discordclient, log, guildid) => {
    const doc = await pg_table(guildid)

    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();

    discordclient.channels.cache
      .get(doc.plugins.logging.channel)
      .send(`\`\`[${hour}:${minute}]\`\` ${log}`);
  },
};
