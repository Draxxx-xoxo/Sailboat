const {Client} = require("pg");
const {MessageEmbed} = require("discord.js")
const Log = require("../../handlers/logging");
const {command_logging, infractionQ, infraction_logging} = require("../../handlers/common_functions");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "warn",
  category: "botinfo",
  permissions:["MANAGE_MESSAGES"],
  enable: true,
  description: "Returns bot and API latency in milliseconds.",
  execute: async (message, discordclient) => {
    const client = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.db,
      password: process.env.passwd,
      port: process.env.port,
    });  
    
    await client.connect()

    const member = message.options.getUser("user");
    //var member = message.mentions.members.first() || await message.guild.members.fetch(args[0])

    //Dumb not working

    let reason_ = message.options.getString("reason");

    if (member.id == message.member.id){
      return message.reply("You cannot warn youself :person_facepalming:")
    };


    const moderator_id = message.user
    const timestamp = Date.now();

    const query = await infractionQ(member, moderator_id, reason_, message, timestamp, "warn")

    const DmMsg = `You have been warned in ${message.guild.name}\n Reason\n` + "```" + reason_ + "```"


    await client.query(query);

    const msg = await message.reply({content: `${member.id} has been warned :ok_hand: User has been notified`, fetchReply: true})

    setTimeout(async function() {
      await message.deleteReply()
    }, 3000)


    //member.send(DmMsg).catch(() => message.reply("Can't send DM to your user!"));

    if(await infraction_logging(message.guild.id) ==  true){
      Log.Send(
			    discordclient,
			    `${moderator_id.username}#${moderator_id.discriminator} warned ${member.username}#${member.discriminator} ` + "`" + `${member.id}` + "`" + ` Reason: ${reason_ || "None"}`,
        message.guild.id
		    );
    }
    await client.end();
  },
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Moderator command to warn a user")
    .addUserOption(option => option.setName("user").setDescription("Select a user").setRequired(true))
    .addStringOption(option => option.setName("reason").setDescription("Reason for the warn"))

};
