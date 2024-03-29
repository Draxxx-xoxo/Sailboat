const {Client} = require("pg");
const {MessageEmbed} = require("discord.js");
const Discord = require("discord.js");
const {command_logging} = require("../../handlers/common_functions")
const {reportbuttons} = require("../../handlers/common_buttons")
const {reportlog} = require("../../handlers/common_embeds")
const moderation = require("./report_buttons/moderation");

module.exports = {
  execute: async (button, discordclient) => {

    const client = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.db,
      password: process.env.passwd,
      port: process.env.port,
    });
       
    const report_id = button.message.embeds[0].title.slice(8)

    // opening connection
    await client.connect();

    const query = `SELECT * FROM public.reports WHERE "guild_id" = ${button.guild.id} AND "id" = ${report_id}`

    const res = await client.query(query);

    const member = await button.guild.members.fetch(res.rows[0].reported_user_id)

    if(!member){
      button.reply.send({ content: "Member is not in the guild", ephemeral: true})
      return
    }

    const reason_ = res.rows[0].reason

    const report_buttons = await reportbuttons(true)

    if(button.component.customId == "warn"){
      await moderation.warn(button, report_id, client, member, report_buttons, reason_, discordclient);
    };
    if (button.component.customId == "deny"){
      await moderation.deny(button, report_id, client, member, report_buttons);
    };
    if (button.component.customId == "kick"){
      await moderation.kick(button, report_id, client, member, report_buttons, reason_, discordclient)
    };
    if (button.component.customId == "ban"){
      await moderation.ban(button, report_id, client, member, report_buttons, reason_, discordclient)
    }
    if (button.component.customId == "mute"){
      await moderation.mute(button, report_id, client, member, report_buttons, reason_, discordclient)
    }
    client.end();
        
  }
};  
