const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const functions = require('../../handlers/common_functions')


module.exports = {
	name: "inf_search",
	category: "botinfo",
  aliases:['infraction search','infraction_search', 'inf search'],
  permissions:["MANAGE_GUILD","ADMINISTRATOR"],
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {

        var member = 	message.mentions.members.first() || await message.guild.members.fetch(args[0])

        const client = new Client({
          user: process.env.user,
          host: process.env.host,
          database: process.env.db,
          password: process.env.passwd,
          port: process.env.port,
      });
              
        // opening connection
        await client.connect();
         
        const query = `SELECT * FROM guild.infractions WHERE discord_id = ${member.user.id} AND server_id = ${message.guild.id} ORDER BY report_id DESC`
        const totalquery = `SELECT * FROM guild.infractions WHERE discord_id = ${member.user.id} AND server_id = ${message.guild.id} ORDER BY report_id`
  
        var res = (await client.query(query).catch(console.error)).rows
        var rowcount = (await client.query(query).catch(console.error)).rowCount
        var totalrowcount = (await client.query(totalquery).catch(console.error)).rowCount


        var report_id_arrary = [];
        var infractions_arrary = [];
        var reason_arrary = [];


        for (let i = 0; i < rowcount; i++) {
            var report_id = report_id_arrary.push(res[i].report_id)
            var infractions = infractions_arrary.push(res[i].infractions)
            var reason = reason_arrary.push(res[i].reason)
        }

        if(rowcount === 0){
            message.channel.send('This user does not have any infractions for this server')
            return
        }

        var report_arrary = [];

        for(let i = 0; i < rowcount; i++){
            var report = report_arrary.push(`#${report_id_arrary[i]} (${infractions_arrary[i]}): ${reason_arrary[i] || 'No Reason'}`)
        }


        var options = [];

        if(rowcount >= 25) var rowcount = 25

        for(let i = 0; i < rowcount; i++){

            switch (infractions_arrary[i]) {
                case 'warn':
                  emoji = "⚠️";
                  break;
                case 'ban':
                  emoji = "🚫";
                  break;
                case 'tempmute':
                   emoji = "🔕"
                  break;
                case 'mute':
                  emoji = "🔕";
                  break;
                case 'kick':
                  emoji = "🦵🏼";
                  break;
                default:
                  emoji = "⚠️";
                  break;
              };
        
            let option = options.push(
              {
                label: '#' + report_id_arrary[i],
                emoji: emoji,
                description: infractions_arrary[i],
                value: 'infraction' + report_id_arrary[i],
              },
            )

        }

        console.log(options)
        const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('search')
            .setPlaceholder('Nothing selected')
            .addOptions(options),
        );

        var prefix = await functions.getPreix(message.guild.id)

        var inf_search = new MessageEmbed()
            .setAuthor({name: `Infractions Overview for ${member.user.username.toString()}`, iconURL: member.user.displayAvatarURL()})
            .setDescription('Use `' + prefix + 'inf {infraction_no}` to see more information about an individual infraction')
            .setThumbnail(member.user.displayAvatarURL())
            .addFields(
                { name: "Infractions", value: report_arrary.join('\n'), inline: false},
                { name: 'Total Infractions', value: totalrowcount.toString(), inline: true },
                { name: `Joined ${message.member.guild.name.toString()}`, value: new Date (member.joinedTimestamp).toLocaleString(), inline: true },
            )
        message.channel.send({embeds: [inf_search], components: [row]});
        
        client.end();
    }
};  
