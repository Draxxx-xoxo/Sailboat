const { MessageEmbed } = require("discord.js")
const {Client} = require("pg");
const buttons = require("../../../handlers/common_buttons");
const { Modal, TextInputComponent, MessageActionRow } = require("discord.js");

module.exports = {
  report: async (message, discordClient) => {

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

    if(res.rowCount == 0){
      return message.reply("There is an error fetching your configurations. Please contact support if this issue persists.")
    }

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

    const button = await buttons.setupbutton(false, false, false, "Report");

    const reporting = new MessageEmbed()
      .setColor("ad94f2")
      .setTitle("Reporting")
      .setDescription("This are the current configurations for the reporting system. You can change them by clicking on the buttons below.")
      .addFields(
        { name: "Reporting", value: reportUser},
        { name: "Reporting Channel", value: reportChannel},
      )

    await message.message.edit({ embeds: [reporting], components: [button] });
    message.deferUpdate()

    client.end()
  },
  setup1: async (message, discordClient) => {
    var button = await buttons.setupbutton(true, false, false, "Report");

    message.message.edit({
      components: [button]
    })

    var button = await buttons.setupbutton1(false)
    message.reply({content: "Enable or Disable the reporting system.", components: [button], ephemeral: true})   
  }, 
  setup2: async (message, discordClient) => {
    var button = message.component.customId.toLowerCase()
    var report_user = ""

    if(button == "enable"){
      report_user = true
    }
    if(button == "disable"){
      report_user = false
    }

    const client = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.db,
      password: process.env.passwd,
      port: process.env.port,
    });

    await client.connect();  

    const query = `UPDATE public.configurator_v1s SET report_user = '${report_user}' WHERE guild_id = ${message.guild.id}`

    await client.query(query);

    const modal = new Modal()
      .setCustomId("reportChannelID")
      .setTitle("Change Logging Channel");

    const changeLoggingChannel = new TextInputComponent()
      .setCustomId("channelID")
      .setLabel("Whats the Channel ID of the logging channel?")
      .setStyle("SHORT");

    const firstactionrow = new MessageActionRow().addComponents(changeLoggingChannel)
    modal.addComponents(firstactionrow)
    await message.showModal(modal);

    client.end()
  },
  setup3: async (message, discordClient) => {
    const channelId = message.fields.getTextInputValue("channelID") || null;

    const client = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.db,
      password: process.env.passwd,
      port: process.env.port,
    });

    await client.connect();  

    const query = `UPDATE public.configurator_v1s SET report_user_logging_channel = '${channelId}' WHERE guild_id = ${message.guild.id}`

    await client.query(query);

    message.reply({content: "Logging channel has been updated. Please click on the update button to see the changes", ephemeral: true})

    client.end()

  }
}
