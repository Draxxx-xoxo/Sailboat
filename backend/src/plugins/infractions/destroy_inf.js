const {Client} = require("pg");
const {MessageEmbed} = require("discord.js")
const {destroyinf} = require("../../handlers/common_buttons")
const { MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
  name: "infraction_destroy",
  aliases:["infraction_destroy", "inf_destroy","inf_delete"],
  enable: true,
  permissions: 80,
  execute: async (message, discordclient) => {

    const inf_id = message.options.getNumber("id");
  
    const client = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.db,
      password: process.env.passwd,
      port: process.env.port,
    });
              
    // opening connection
    await client.connect();

    const query = `SELECT * FROM public.infractions WHERE id = ${inf_id} AND guild_id = ${message.guild.id} ORDER BY id DESC`
       
    const res = (await client.query(query).catch(console.error)).rows[0]

    if(res == undefined) return message.reply("This infraction does not exsist on this server")

    //const timestamp = `${res.timestamp}` || ''

    //var date = new Date (timestamp).toLocaleString()


    const embed = new MessageEmbed()
      .setTitle("Infraction #" + res.id)
      .addFields(
        {name: "User", value: res.discord_tag + "\n<@" + res.discord_id + ">", inline: true},
        {name: "Moderator", value: res.moderator_tag + "\n<@" + res.moderator_id + ">", inline: true},
        {name: "Reason", value: res.reason || "No Reason"}
      )
      .setFooter({text:"Infraction was created on " + res.created_at})


    const buttons = await destroyinf(false)


    message.reply({content: "Are you sure you want to delete this infraction? Click on `Yes` if you wish to procced", components:[buttons], embeds:[embed]})
        
    client.end();
        
  },

  button: async(button, discordclient) => {

    const client = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.db,
      password: process.env.passwd,
      port: process.env.port,
    });

    const buttons = await destroyinf(true)

    if(button.component.customId == "yes"){

      await client.connect()

      const inf_id =  button.message.embeds[0].title.slice(12)
      const delete_query = `DELETE FROM public.infractions WHERE id = ${inf_id} AND guild_id = ${button.guild.id}`
      const res = await client.query(delete_query).catch(console.error)

      button.reply("#" + inf_id + " has been deleted");
      button.message.edit({
        components:[buttons]
      })

      client.end()
    }
    if (button.component.customId == "no"){

      button.reply("Action cancelled")
      button.message.edit({
        components:[buttons]
      })
    }
  },
  data: new SlashCommandBuilder()
    .setName("infraction_destroy")
    .setDescription("Destroy an infraction")
	  .addNumberOption(option => option.setName("id").setDescription("Delete a specific infraction").setRequired(true))
};  