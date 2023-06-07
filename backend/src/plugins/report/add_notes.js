const {Client} = require("pg");
const {MessageEmbed} = require("discord.js");
const Log = require("../../handlers/logging");
const {command_logging, report_pugin, report_logging, report_logging_channel} = require("../../handlers/common_functions");
const {reportbuttons} = require("../../handlers/common_buttons")
const deny = require("./report_buttons/moderation")
const {reportlog, notelog} = require("../../handlers/common_embeds");
const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
  name: "note",
  permissions: 50,
  enable: true,
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

    const searchquery = `
      SELECT * FROM public.reports WHERE id = ${id} AND guild_id = ${message.guild.id};
    `
    const searchres = (await client.query(searchquery).catch(console.error)).rows[0]

    if(!searchres) return message.reply({content: "No report found with that ID", ephemeral: true})

    // ADD NOTE TO THE DB
    const query = `
        INSERT INTO public.notes(
            guild_id, user_id, username, report_id, note, report_message_id)
            VALUES (${message.guild.id},'${message.user.id}', '${message.user.tag}', '${id}', '${note}', '${searchres.message_id}');
        `
        
    const res = (await client.query(query).catch(console.error))

    if(res.rowCount == 1){
      message.reply({content: "Your note was created successfully", ephemeral: true})
    }



    // LOG THE NOTE
    const channelquery = `SELECT * FROM public.configurator_v1s WHERE guild_id = ${message.guild.id.toString()}`

    const channelres = await client.query(channelquery).catch(console.error);
    const note_channel = message.guild.channels.cache.get(channelres.rows[0].command_logging_channel)
    const note_message = await note_channel.messages.fetch(`${searchres.message_id}`)
    const reportembed = await reportlog(searchres,"🟡")
    const report_buttons = await reportbuttons(false)
    const search_notes = `SELECT * FROM public.notes WHERE report_id = ${id} AND guild_id = ${message.guild.id}`
    const notes = (await client.query(search_notes).catch(console.error))
    var notes_embed_fields = []

    for(var i = 0; i < notes.rowCount; i++){
      notes_embed_fields.push({name: "Note from " + notes.rows[i].username, value: notes.rows[i].note})
    }

    const note_embed = (await notelog(searchres.id)).addFields(notes_embed_fields)


    note_message.edit({
      components: [report_buttons],
      embeds: [reportembed, note_embed]
    })

    await client.end();  

    
  },
  data: new SlashCommandBuilder()
    .setName("note")
    .setDescription("Add a note to the report")
    .addNumberOption(option => option.setName("id").setDescription("Report ID to add the note").setRequired(true))
    .addStringOption(option => option.setName("note").setDescription("Note that you want to add to the report").setRequired(true))
};