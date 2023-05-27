const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const {Client} = require("pg");
const buttons = require("../../handlers/common_buttons");

module.exports = {
  name: "configurator",
  enable: true,
  permissions: 100,
  execute: async (message, discordClient) => {

    const client = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.db,
      password: process.env.passwd,
      port: process.env.port,
    });

    await client.connect();  

    const query = `
        INSERT INTO public.configurator_v1s(guild_id)
        SELECT * FROM (SELECT ${message.guild.id} AS guild_id) AS temp
        WHERE NOT EXISTS (SELECT * FROM public.configurator_v1s WHERE guild_id = ${message.guild.id}) LIMIT 1;
    `

    const res = await client.query(query).catch(console.error);

    const configuator = new MessageEmbed()
      .setColor("ad94f2")
      .setTitle("Configurator")
      .setDescription("**Which configuration would you like to change?**\n- Logging\n- Reporting\n- Mutes\n*Others are still in development*")

    const button = await buttons.configurationbuttons(false, false, false)

    var backId = ""

    if(!message.component){
      backId = null
    } else {
      backId = message.component.customId.toLowerCase()
    }

    if(backId == "back"){
      await message.message.edit({ embeds: [configuator], components: [button] })
      message.deferUpdate()
    }
    else{
      await message.reply({ embeds: [configuator], components: [button] })
    }

    client.end()
  },
  update_button: async (message, discordClient) => {

    const client = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.db,
      password: process.env.passwd,
      port: process.env.port,
    });

    await client.connect(); 

    const query = `SELECT * FROM public.configurator_v1s WHERE guild_id = ${message.guild.id.toString()}`

    const res = await client.query(query).catch(console.error);

    var embed = ""
    var config = ""
    var reportUser = ""

    if(res.rows[0].report_user == true){
      reportUser = "On"
    }
    else{
      reportUser = "Off"
    }

    var reportChannel = ""

    if(message.guild.channels.cache.get(res.rows[0].report_user_logging_channel) == undefined){
      reportChannel =" No channel setup"
    }
    else {
      reportChannel = message.guild.channels.cache.get(res.rows[0].report_user_logging_channel).name + " `" + res.rows[0].report_user_logging_channel + "`" 
    }

    var muteRole = ""

    if(message.guild.roles.cache.get(res.rows[0].mute_role) == undefined){
      muteRole = "No role setup"
    }
    else {
      muteRole = message.guild.roles.cache.get(res.rows[0].mute_role).name + " `" + res.rows[0].mute_role + "`" 
    }

    const loggingChannel = res.rows[0]

    var infractionChannel = ""
    var commandChannel = ""
    var reportChannel = ""

    if(message.guild.channels.cache.get(loggingChannel.infraction_logging_channel) == undefined){
      infractionChannel = "No channel setup"
    }
    else{
      infractionChannel = message.guild.channels.cache.get(loggingChannel.infraction_logging_channel).name + " `" + loggingChannel.infraction_logging_channel + "`" 
    }

    if(message.guild.channels.cache.get(loggingChannel.command_logging_channel) == undefined){
      commandChannel = "No channel setup"
    }
    else{
      commandChannel = message.guild.channels.cache.get(loggingChannel.command_logging_channel).name + " `" + loggingChannel.command_logging_channel + "`" 
    }

    if(message.guild.channels.cache.get(loggingChannel.report_logging_channel) == undefined){
      reportChannel = "No channel setup"
    }
    else{
      reportChannel = message.guild.channels.cache.get(loggingChannel.report_logging_channel).name + " `" + loggingChannel.report_logging_channel + "`" 
    }

    if(message.component.customId == "updateReport"){
      embed = new MessageEmbed()
        .setColor("ad94f2")
        .setTitle("Reporting")
        .setDescription("This are the current configurations for the reporting system. You can change them by clicking on the buttons below.")
        .addFields(
          { name: "Reporting", value: reportUser},
          { name: "Reporting Channel", value: reportChannel},
        )
      config = "Report"
    }
    else if(message.component.customId == "updateMutes"){
      embed = new MessageEmbed()
        .setColor("ad94f2")
        .setTitle("Reporting")
        .setDescription("This are the current configurations for the reporting system. You can change them by clicking on the buttons below.")
        .addFields(
          { name: "Mute Role", value: muteRole},
        )
      config = "Mutes"
    }
    else if(message.component.customId == "updateLogging"){
      embed = new MessageEmbed()
        .setColor("ad94f2")
        .setTitle("Logging")
        .setDescription("These are the logging channels enabled for the server")
        .addFields(
          { name: "Infraction Logging", value: infractionChannel },
          { name: "Command Logging", value: commandChannel },
          { name: "Report Logging", value: reportChannel },
        )
      config = "Logging"
    }
    const button = await buttons.setupbutton(false, false, false, config);
    await message.message.edit({ embeds: [embed], components: [button] });
    message.deferUpdate()
  },
  data: new SlashCommandBuilder()
    .setName("configurator")
    .setDescription("Configure the settings of the Bot")
}
