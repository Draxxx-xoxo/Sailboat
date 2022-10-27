const {Client} = require("pg");
const {pgkey} = require("../../../config.json");
const {MessageEmbed} = require("discord.js");
const Log = require("../../handlers/logging");
const {command_logging, infractionQ, infraction_logging} = require("../../handlers/common_functions");
const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
  name: "kick",
  category: "botinfo",
  permissions:["KICK_MEMBERS"],
  enable: true,
  description: "Returns bot and API latency in milliseconds.",
  execute: async (message, discordclient) => {

    const member = message.options.getUser("user");
  
    let reason_ = message.options.getString("reason");
        
    if (member.id == message.member.id){
      return message.reply("You cannot kick youself :person_facepalming:");
    }
    
    const client = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.db,
      password: process.env.passwd,
      port: process.env.port,
    });
    
    await client.connect()
        
    const moderator_id = message.member.user
    const timestamp = Date.now()
    const query = await infractionQ(member, moderator_id, reason_, message, timestamp, "kick")
                
    const embed = new MessageEmbed()
      .setTitle(`You have been kicked in ${message.guild.name}`)
      .setDescription("Reason\n" + "```" + reason_ + "```")
                
                
    message.guild.members.kick(member)
                
    client.query(query);
                
    message.reply({content: `${member.id} has been kicked :ok_hand: User has been notified`, fetchReply: true})

    setTimeout(async function() {
      await message.deleteReply()
    }, 3000)

    //discordclient.users.cache.get(member.id).send(embed).catch(() => message.reply("Can't send DM to your user!"));;

    if(await infraction_logging(message.guild.id) ==  true){
      Log.Send(
        discordclient,
        `${moderator_id.username}#${moderator_id.discriminator} kicked ${member.username}#${member.user.discriminator} ` + "`" + `${member.user.id}` + "`" + ` Reason: ${reason_ || "None"}`, 
        message.guild.id
      );
    }
            
    client.end();
  },
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Moderator command to kick a member")
    .addUserOption(option => option.setName("user").setDescription("Select a user").setRequired(true))
    .addStringOption(option => option.setName("reason").setDescription("Reason for the warn"))

}
    