const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js');
const Log = require('../../handlers/logging');
const {MessageButton} = require("discord-buttons");
const {command_logging, report_pugin, report_logging, report_logging_channel} = require('../../handlers/common_functions');
const {reportbuttons} = require('../../handlers/common_buttons')
const deny = require('./report_buttons/moderation')
const {reportlog} = require('../../handlers/common_embeds');


module.exports = {
	name: "report",
	category: "",
    permissions:[""],
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {

        if(await report_pugin(message.guild.id) == false){
            return
        }

        if(message.mentions.roles.first()){
            return message.channel.send('Why are you mentioning a role? <:blob_ping:807930234410237963>')
        }

        var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

        if(!member){
            message.channel.send('Please mention a user or input a user ID')
            .then(msg => {
                msg.delete({ timeout: 3000 })
            });
            return  
        };


        let reason_ = args.slice(1).join(" ").toString();

        if (member.id == message.member.id){
            message.channel.send('You cannot report youself :person_facepalming:')
            .then(msg => {
                msg.delete({ timeout: 3000 })
            });    
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
        INSERT INTO guild.reports(
            reporter_id, reporter_tag, reported_user_tag, reported_user_id, reason, "timestamp", server_id, status)
            VALUES (${message.author.id},'${message.author.tag}', '${member.user.tag}', ${member.user.id},'${reason_|| 'No Reason'}',${Date.now()}, ${message.guild.id}, 'pending')
            RETURNING *
        `
        
        const res = (await client.query(query)).rows[0]

        message.channel.send(`User has been reported, please check your dm's for updates`)
        .then(msg => {
            msg.delete({ timeout: 3000 })
          })
        
        //message.author.send('Overview about report').catch(() => message.reply("Can't send DM to your user!"));;

        if(await report_logging(message.guild.id) ==  true){
            Log.Send(
                discordclient,
                `${message.author.tag} reported ${member.user.tag}` + '`' + `${member.user.id}` + '`' + ` Reason: ${reason_ || 'None'}`,
                message.guild.id
            );
            
            const reportchannel = await report_logging_channel(message.guild.id);

            const report_buttons = await reportbuttons(false)

            const embed = await reportlog(res,'🟡')

            
            message.guild.channels.cache.get(reportchannel).send({
                buttons: report_buttons,
                embed: embed
                }); 
        }
        
        await client.end();  
	},
};