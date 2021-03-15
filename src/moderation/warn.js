const fs = require('fs');
const Discord = require('discord.js');
const { mainprefix, token, pgkey } = require('../../config.json');
const {Client} = require('pg')

const discordclient = new Discord.Client();
discordclient.commands = new Discord.Collection();

discordclient.once('ready', () => {
	console.log('warn Ready!');

	discordclient.user.setActivity(`Watching EVEE`)
});

  discordclient.on('message', async message => {

    if (message.content.startsWith(`${mainprefix}warn`)) {
         
        if(message.member.hasPermission("MANAGE_MESSAGES")){


            const client = new Client({
                connectionString: pgkey,
                ssl: {
                  rejectUnauthorized: false
                }
            });
            
            // opening connection
            await client.connect();
        
       
            let cont = message.content.slice((mainprefix + `warn `).length).split(" ")
            var member_id = message.mentions.users.first()
            var member_id = message.mentions.users.first()|| cont.slice(0,1).toString()
            let reason_ = cont.slice(1).join(" ").toString()
            let member_guild = message.guild.members.cache.get(member_id.id || member_id);

        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.channel.send('You do not have permissions to ban')
        }
        else if (message.mentions.users.first() == message.member.user){
            return message.channel.send('You cannot warn youself :person_facepalming:')
        }
        else if (member_id == message.member.user.id){
            return message.channel.send('You cannot warn yourself :person_facepalming:')
        }

        if (member_guild){

            const warn_member = member_guild.user
            const moderator_id = message.member.user
            const timestamp = Date.now()
            const query = `
        
            INSERT INTO guild.Infractions(
                discord_id, discord_tag, infractions, moderator_id, moderator_tag, reason, timestamp, server_id)
                VALUES (${warn_member.id}, '${warn_member.username}#${warn_member.discriminator}', 'warn', ${message.author.id}, '${moderator_id.username}#${moderator_id.discriminator}', '${reason_}', ${timestamp}, ${message.guild.id});
            
            `
            const embed = new Discord.MessageEmbed()
            .setTitle(`You have been warned in ${message.guild.name}`)
            .setDescription(`Reason\n` + '```' + reason_ + '```')


            await client.query(query);

            message.channel.send(`${member_id} has been warned :ok_hand: User has been notified`)
            .then(msg => {
                msg.delete({ timeout: 3000 })
              })

              discordclient.users.cache.get(member_guild.user.id).send(embed);
            }
            client.end();
    }
    
    } 
})





discordclient.login(process.env.token);


