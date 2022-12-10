const {Client} = require("pg");
const {MessageEmbed} = require("discord.js");
const Log = require("../../handlers/logging");
const {command_logging, report_pugin, report_logging, report_logging_channel} = require("../../handlers/common_functions");
const {reportbuttons} = require("../../handlers/common_buttons")
const deny = require("./report_buttons/moderation")
const {reportlog} = require("../../handlers/common_embeds");
const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
  name: "note",
  category: "",
  permissions:[""],
  enable: false,
  description: "Returns bot and API latency in milliseconds.",
  execute: async (message, discordclient) => {

    const id = message.options.getNumber("id")
    const note = message.options.getString("note")

    const client = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.db,
      password: process.env.passwd,
      port: process.env.port,
    });
        
    await client.connect();


    const query = `
        INSERT INTO public.notes(
            guild_id, user_id, username, report_id, note)
            VALUES (${message.guild.id},'${message.user.id}', '${message.user.tag}', '${id}', '${note}');
        `
        
    const res = (await client.query(query).catch(console.error))

    if(res.rowCount == 1){
      message.reply({content: "Your note was created successfully", ephemeral: true})
    }
    
    await client.end();  
  },
  data: new SlashCommandBuilder()
    .setName("note")
    .setDescription("Add a note to the report")
    .addNumberOption(option => option.setName("id").setDescription("Report ID to add the note").setRequired(true))
    .addStringOption(option => option.setName("note").setDescription("Note that you want to add to the report").setRequired(true))
};