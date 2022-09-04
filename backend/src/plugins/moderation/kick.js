const {Client} = require('pg');
const {pgkey} = require('../../../config.json');
const {MessageEmbed} = require('discord.js');
const Log = require('../../handlers/logging');
const {command_logging, infractionQ} = require('../../handlers/common_functions');

module.exports = {
	name: "kick",
	category: "botinfo",
    permissions:["KICK_MEMBERS"],
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {

        if(message.mentions.roles.first()){
            return message.channel.send('Why are you mentioning a role? <:blob_ping:807930234410237963>')
        }

        var member = ''
        if(message.mentions.members.first()){
            member = message.mentions.members.first()
        }  else if(args[0]){
            member = await message.guild.members.fetch(args[0])
        }
        //var member = message.mentions.users.first() || await message.guild.members.fetch(args[0])

        //Dumb not working
        if(!member){
            return message.channel.send('Please mention a user or input a user ID')
        };
        
        let reason_ = args.slice(1).join(" ").toString() ;
        
        if (member.id == message.member.id){
            return message.channel.send('You cannot kick youself :person_facepalming:');
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
        const query = await infractionQ(member, moderator_id, reason_, message, timestamp, 'kick')
                
        const embed = new MessageEmbed()
            .setTitle(`You have been kicked in ${message.guild.name}`)
            .setDescription(`Reason\n` + '```' + reason_ + '```')
                
                
        user.kick()
                
        client.query(query);
                
        message.channel.send(`${member.id} has been kicked :ok_hand: User has been notified`)
            .then(msg => {
            msg.delete({ timeout: 3000 })
            })
                
        discordclient.users.cache.get(member.id).send(embed).catch(() => message.reply("Can't send DM to your user!"));;

        if(await command_logging(message.guild.id) ==  true){
            Log.Send(
                discordclient,
                `${moderator_id.username}#${moderator_id.discriminator} muted ${member.user.username}#${member.user.discriminator} ` + '`' + `${member.user.id}` + '`' + ` Reason: ${reason_ || 'None'}`, 
                message.guild.id
            );
        }
            
        client.end();
        }
    }
    