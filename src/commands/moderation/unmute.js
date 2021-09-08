const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js');
const functions = require('../.././handlers/common_functions');
const Log = require('../../handlers/logging');
const {command_logging} = require('../../handlers/common_functions');

module.exports = {
	name: "unmute",
	category: "botinfo",
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {
                        
        if(message.mentions.roles.first()){
            return message.channel.send('Why are you mentioning a role? <:blob_ping:807930234410237963>')
        }

        var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

        //Dumb not working
        if(!member){
            return message.channel.send('Please mention a user or input a user ID')
        };

        let reason_ = args.slice(1).join(" ").toString();
                
    

        if (member.id == message.member.user.id){
            return message.channel.send('You cannot mute yourself :person_facepalming:')
        };
        
        const client = new Client({
            connectionString: pgkey,
                ssl: {
                rejectUnauthorized: false
                }
            });      
    
        await client.connect()

        const role_id = await functions.muteRole(message);
        const moderator_id = message.member.user
        

        if(!role_id){
            return message.channel.send('Please add a mute role')
        }

        if(member.roles.cache.has(role_id) == false){
            return message.channel.send('That person is not muted')
        }

        const embed = new MessageEmbed()
        .setTitle(`You have been unmuted in ${message.guild.name}`)

        member.roles.remove(role_id)
        
        client.end()
        message.channel.send(`${member.id} has been unmuted :ok_hand: User has been notified`)
            .then(msg => {
                msg.delete({ timeout: 3000 })
            })    
        discordclient.users.cache.get(member.id).send(embed).catch(error);

        if(await command_logging(message.guild.id) ==  true){
            Log.Send(
			    discordclient,
			    `${moderator_id.username}#${moderator_id.discriminator} unmuted ${member.user.username}#${member.user.discriminator} ` + '`' + `${member.id}` + '`',
                message.guild.id
		    );
        }
                
        await client.end()        
    } 
};
    