const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')
const functions = require('../.././handlers/common_functions')
const Log = require('../../handlers/logging');

module.exports = {
	name: "tempmute",
	category: "botinfo",
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {
        const client = new Client({
            connectionString: pgkey,
                ssl: {
                rejectUnauthorized: false
                }
            });      
    
        await client.connect()

        var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!member){ 
            message.reply('Please Provide a Member to TempMute.')
        }
        else if (member == message.member){
            return message.channel.send('You cannot tempmute youself :person_facepalming:')
        }

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
            VALUES (${member.user.id}, '${member.user.username}#${member.user.discriminator}', 'tempmute', ${message.author.id}, '${moderator_id.username}#${moderator_id.discriminator}', '${reason_}', ${timestamp}, ${message.guild.id});
        
        `

       


        var role_id = await functions.muteRole(message);

        let role = message.guild.roles.cache.find(role => role.id === role_id);

        if (!role) return message.reply("Couldn't find the 'muted' role.")

        if (!time) {
            return message.reply("You didnt specify a time!");
        }


        member.roles.add(role_id);
        await client.query(query);


        const embed = new MessageEmbed()
        .setTitle(`You have been muted in ${message.guild.name}`)
        .setDescription(`**Reason**\n` + reason_ )



        
        message.channel.send(`${member.user.tag} has been warned :ok_hand: User has been notified`)
        .then(msg => {
            msg.delete({ timeout: 3000 })
        })
            
        discordclient.users.cache.get(member.id).send(embed).catch(() => message.reply("Can't send DM to your user!"));;


        if(await functions.command_logging(message.guild.id) ==  true){
            Log.Send(
			    discordclient,
	            `${moderator_id.username}#${moderator_id.discriminator} tempmuted ${member.user.username}#${member.user.discriminator} ` + '`' + `${member.user.id}` + '`' + ` Reason: ${reason_ || 'None'}`,
                message.guild.id
            );
        }

        setTimeout( function() {
            member.roles.remove(role_id);
            message.channel.send(`${member.user.tag} has been unmuted.`)


                Log.Send(
                    discordclient,
                    `${member.user.username}#${member.user.discriminator} ` + '`' + `${member.user.id}` + '`' + `has been unmuted`,
                    message.guild.id
                );
            
    
        },time);

        await client.end()
            
        } 
    };
    