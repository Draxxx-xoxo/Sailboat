const { MessageEmbed } = require("discord.js")
const {Client} = require("pg");
const buttons = require("../../../handlers/common_buttons");
const { Modal, TextInputComponent, MessageActionRow } = require("discord.js");

module.exports = {
  mute: async (message, discordClient) => {

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

    const button = await buttons.setupbutton(false, false, false, "Mutes");

    const reporting = new MessageEmbed()
      .setColor("ad94f2")
      .setTitle("Reporting")
      .setDescription("This are the current configurations for the reporting system. You can change them by clicking on the buttons below.")
      .addFields(
        { name: "Mute Role", value: message.guild.roles.cache.get(res.rows[0].mute_role).name + " `" + res.rows[0].mute_role + "`" || "No role setup"},
      )

    console.log(message.guild.roles.cache.get(res.rows[0].mute_role).name)
    await message.message.edit({ embeds: [reporting], components: [button] });
    message.deferUpdate()

    client.end()
  },
  setup1: async (message, discordClient) => {

    const modal = new Modal()
      .setCustomId("roleID")
      .setTitle("Change Mute Role");

    const changeLoggingChannel = new TextInputComponent()
      .setCustomId("roleID")
      .setLabel("Whats the Role ID of the Mute Role?")
      .setStyle("SHORT");

    const firstactionrow = new MessageActionRow().addComponents(changeLoggingChannel)
    modal.addComponents(firstactionrow)
    await message.showModal(modal);

  }, 
  setup2: async (message, discordClient) => {
    const roleId = message.fields.getTextInputValue("roleID") || null;

    const client = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.db,
      password: process.env.passwd,
      port: process.env.port,
    });

    await client.connect();  

    const query = `UPDATE public.configurator_v1s SET mute_role = '${roleId}' WHERE guild_id = ${message.guild.id}`

    await client.query(query);

    message.reply({content: "Mute Role has been updated. Please click on the update button to see the changes", ephemeral: true})

    client.end()
  },
}