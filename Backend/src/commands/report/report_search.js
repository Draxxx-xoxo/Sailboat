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
	name: "report_search",
	category: "",
    permissions:[""],
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {

		var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0])); 

        if(!member) return

		const client = new Client({
            connectionString: pgkey,
            ssl: {
                rejectUnauthorized: false
            }
        });
              
        // opening connection
        await client.connect();

		const query = `SELECT * FROM guild.reports WHERE reported_user_id = ${member.user.id} AND server_id = ${message.guild.id} ORDER BY report_id DESC`
		var res = (await client.query(query).catch(console.error))

		var report_id_arrary = [];
        var reason_arrary = [];
		var status_arrary = [];
		var message_id_arrary = []

        for (let i = 0; i < res.rowCount; i++) {
            var report_id = report_id_arrary.push(res.rows[i].report_id);
            var reason = reason_arrary.push(res.rows[i].reason);
			var reason = status_arrary.push(res.rows[i].status);
			var message_id = message_id_arrary.push(res.rows[i].message_id)

        }


        if(res.rowCount === 0){
            message.channel.send('This user does not have any infractions for this server')
            return
        }

		var report_arrary = [];
		const redirect_link = 'https://discord.com/channels/734281219839230022/861610169788268544/'

		for(let i = 0; i < res.rowCount; i++){
            var report = report_arrary.push(`[#${report_id_arrary[i]}](${redirect_link}${message_id_arrary[i]}): ${reason_arrary[i] || 'No Reason'}` + ' `Status: ' + status_arrary[i] + '`')
        }

		var report_search = new MessageEmbed()
            .setAuthor(`Infractions Overview for ${member.user.username}`, member.user.displayAvatarURL())
            .setDescription('Click on the message link to jump to that report')
            .setThumbnail(member.user.displayAvatarURL())
            .addFields(
                { name: "Infractions", value: report_arrary.slice(27).join('\n'), inline: false},
                { name: `Joined ${message.member.guild.name}`, value: new Date (member.joinedTimestamp).toLocaleString(), inline: false},
            )
        message.channel.send(report_search);

		console.log();

		await client.end();
	},
};