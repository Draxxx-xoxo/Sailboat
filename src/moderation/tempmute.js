const fs = require('fs');
const Discord = require('discord.js');
const { mainprefix, token, pgkey } = require('../../config.json');
const {Client} = require('pg');
const functions = require('../common_functions')
const yaml = require('js-yaml')

const discordclient = new Discord.Client();
discordclient.commands = new Discord.Collection();

discordclient.once('ready', () => {
	console.log('tempmutemute Ready!');

	discordclient.user.setActivity(`Watching EVEE`)
});



discordclient.on('message', async message => {

    const prefix = functions.getPreix(fs, yaml) 

    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);
    let msg = messageArray[0];

     if(msg === prefix + 'tempmute'){
        if(message.member.hasPermission('MANAGE_MESSAGES')) {

            const client = new Client({
                connectionString: pgkey,
                    ssl: {
                    rejectUnauthorized: false
                    }
                });      
        
            await client.connect()

            var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
            if(!member) return message.reply('Please Provide a Member to TempMute.')

            let time = args[1];
            let reason_ = args.slice(2).join(" ").toString()

            const select_query = `
            SELECT * FROM guild_settings.mute_role WHERE server_id = ${message.guild.id} 
            `

            const moderator_id = message.member.user
            const timestamp = Date.now()
            const query = `
        
            INSERT INTO guild.Infractions(
                discord_id, discord_tag, infractions, moderator_id, moderator_tag, reason, timestamp, server_id)
                VALUES (${member.user.id}, '${member.user.username}#${member.user.discriminator}', 'mute', ${message.author.id}, '${moderator_id.username}#${moderator_id.discriminator}', '${reason_}', ${timestamp}, ${message.guild.id});
            
            `

            var res = await client.query(select_query).catch(console.error)

            for (let row of res.rows) {
            var role_id = row.mute_role_id

            let role = message.guild.roles.cache.find(role => role.id === role_id);

            if (!role) return message.reply("Couldn't find the 'muted' role.")

            if (!time) {
                return message.reply("You didnt specify a time!");
            }


            member.roles.add(role_id);
            await client.query(query);


            const embed = new Discord.MessageEmbed()
            .setTitle(`You have been muted in ${message.guild.name}`)
            .setDescription(`**Reason**\n` + reason_ )


            message.channel.send(`${member.user.tag} has been warned :ok_hand: User has been notified`)
            .then(msg => {
                msg.delete({ timeout: 3000 })
              })

              discordclient.users.cache.get(member.id).send(embed);
            }

            setTimeout( function () {
                member.roles.remove(role_id);
                message.channel.send(`${member.user.tag} has been unmuted.`)
            },time);
        client.end()
        } 
        }
    });



discordclient.login(process.env.token);