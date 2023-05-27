const {Client} = require("pg");
const {MessageEmbed} = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const {addguild} = require("../../handlers/common_functions")


module.exports = {
  name: "add_guild",
  enable: true,
  user: ["716206954313285713"],
  permissions: 200, 
  execute: async (message, discordclient) => {

    const guild_name = message.options.getString("name");
    const guild_icon = message.options.getString("icon");
    const guild_id = message.options.getNumber("server");
    const user_id = message.options.getNumber("user");

    if(guild_icon.includes("https://cdn.discordapp.com/")){
      console.log("valid image link")
    }
    else {
      return message.reply({content: "Please provide a valid image link", ephemeral: true})
    }
  
    const client = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.db,
      password: process.env.passwd,
      port: process.env.port,
    });
              
    // opening connection
    await client.connect();

    const checkquery = `SELECT * FROM public.allowed_guilds WHERE guild_id = ${guild_id}`
       
    const checkres = (await client.query(checkquery).catch(console.error)).rows[0]

    if(checkres) return message.reply({content :"This server has access to the dashboard", ephemeral: true})

    const query = await addguild(guild_name, guild_id, guild_icon, user_id)
    const res = (await client.query(query).catch(console.error))

    const embed = new MessageEmbed()
      .setTitle("New Guild Added to Dashbaord")
      .setImage(guild_icon || "https://cdn.discordapp.com/icons/1035223973350359051/ac9cbcbf288c94c501d0815d5f963ad5.webp")
      .addFields(
        {name: "Guild Id", value: guild_id.toString(), inline: true},
        {name: "Guild Name", value: guild_name.toString(), inline: true},
        {name: "User ID", value: user_id.toString()}
      )


    message.reply({embeds: [embed], ephemeral: true})
        
    client.end();
        
  },

  data: new SlashCommandBuilder()
    .setName("add_guild")
    .setDescription("Add a guild to Sailboat's Dashboard")
    .addStringOption(option => option.setName("name").setDescription("Server Name").setRequired(true))
	  .addNumberOption(option => option.setName("server").setDescription("Server ID").setRequired(true))
    .addStringOption(option => option.setName("icon").setDescription("Server Icon").setRequired(true))
    .addNumberOption(option => option.setName("user").setDescription("User ID").setRequired(true))

};  