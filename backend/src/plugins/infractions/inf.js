const {Client} = require("pg");
const {pgkey} = require("../../../config.json");
const {MessageEmbed} = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "infraction",
  category: "botinfo",
  aliases:["infraction","inf_search","case"],
  enable: true,
  permissions:["MANAGE_GUILD","ADMINISTRATOR"],
  description: "Returns bot and API latency in milliseconds.",
  execute: async (message, args, discordclient) => {

    const inf_id = message.options.getNumber('id');
  
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

    if(res == undefined) return message.channel.send("This infraction does not exsist on this server")

    const timestamp = `${res.timestamp}`

    const embed = new MessageEmbed()
      .setTitle("Infraction #" + res.id)
      .addFields(
        {name: "User", value: res.discord_tag + "\n<@" + res.discord_id + ">", inline: true},
        {name: "Moderator", value: res.moderator_tag + "\n<@" + res.moderator_id + ">", inline: true},
        {name: "Reason", value: res.reason || "No Reason"}
      )
      .setFooter({text: "Infraction was created on " + res.created_at})
    await message.reply({embeds: [embed]})
    
    client.end();
        
  },
  data: new SlashCommandBuilder()
  .setName("infraction")
  .setDescription("Lookup for an infraction")
	.addNumberOption(option => option.setName('id').setDescription('Search for a specific infraction').setRequired(true))
};  