const {Client} = require("pg");
const {pgkey} = require("../../../config.json");
const {MessageEmbed} = require("discord.js");
const Log = require("../../handlers/logging");
const {command_logging, report_pugin, report_logging, report_logging_channel} = require("../../handlers/common_functions");
const {reportbuttons} = require("../../handlers/common_buttons")
const deny = require("./report_buttons/moderation")
const {reportlog} = require("../../handlers/common_embeds");
const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
  name: "report",
  category: "",
  permissions:[""],
  description: "Returns bot and API latency in milliseconds.",
  execute: async (message, discordclient) => {

    if(await report_pugin(message.guild.id) == false){
      message.reply('This server is not setup to accept reports. Please contact your administrator if you believe this is an error')
      return
    }

    var member = await message.guild.members.fetch(message.options.getUser('user').id)


    let reason_ = message.options.getString('reason')

    if (member.id == message.member.id){
      message.reply({content: "You cannot report youself :person_facepalming:", fetchReply: true})

      setTimeout(async function() {
        await message.deleteReply()
      }, 3000)

      return
    }

    const client = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.db,
      password: process.env.passwd,
      port: process.env.port,
    });
        
    await client.connect();


    const query = `
        INSERT INTO public.reports(
            reporter_id, reporter_tag, reported_user_tag, reported_user_id, reason, guild_id, status)
            VALUES (${message.user.id},'${message.user.tag}', '${member.user.tag}', ${member.user.id},'${reason_|| "No Reason"}', ${message.guild.id}, 'pending')
            RETURNING *
        `
        
    const res = (await client.query(query)).rows[0]

    message.reply({content: "User has been reported, please check your DM's for updates", fetchReply: true})

    setTimeout(async function() {
      await message.deleteReply()
    }, 3000)
        
    //message.author.send('Overview about report').catch(() => message.reply("Can't send DM to your user!"));;

    if(await report_logging(message.guild.id) ==  true){
      Log.Send(
        discordclient,
        `${message.user.tag} reported ${member.user.tag}` + "`" + `${member.user.id}` + "`" + ` Reason: ${reason_ || "None"}`,
        message.guild.id
      );
            
      const reportchannel = await report_logging_channel(message.guild.id);

      const report_buttons = await reportbuttons(false)

      const embed = await reportlog(res,"🟡")
     
      message.guild.channels.cache.get(reportchannel).send({
        components: [report_buttons],
        embeds: [embed]
      });  
    }
    await client.end();  
  },
  data: new SlashCommandBuilder()
  .setName("report")
  .setDescription("Report a user for moderators to review")
  .addUserOption(option => option.setName("user").setDescription("Select a user").setRequired(true))
  .addStringOption(option => option.setName("reason").setDescription("Reason for the report").setRequired(true))
};