const {Client} = require('pg');
const {pgkey, prefix} = require('../../../config.json');
const {MessageEmbed} = require('discord.js')
const Log = require("../../handlers/logging");
const {command_logging, infractionQ} = require('../../handlers/common_functions');

module.exports = {
	name: "warn",
	category: "botinfo",
    permissions:["MANAGE_MESSAGES"],
	description: "Returns bot and API latency in milliseconds.",
	execute: async (message, args, discordclient) => {
        const client = new Client({
            user: process.env.user,
            host: process.env.host,
            database: process.env.db,
            password: process.env.passwd,
            port: process.env.port,
        });  
    
        await client.connect()

        if(message.mentions.roles.first()){
            return message.channel.send('Why are you mentioning a role? <:blob_ping:807930234410237963>')
        }

        var member = message.mentions.users.first() || await message.guild.members.fetch(args[0])

        //Dumb not working
        if(!member){
            return message.channel.send('Please mention a user or input a user ID')
        };

        let reason_ = args.slice(1).join(" ").toString();

        if (member.id == message.member.id){
            return message.channel.send('You cannot warn youself :person_facepalming:')
        };


        const moderator_id = message.member.user
        const timestamp = Date.now();

        const query = await infractionQ(member, moderator_id, reason_, message, timestamp, 'warn')

        console.log(query)

        const embed = new MessageEmbed()
        .setTitle(`You have been warned in ${message.guild.name}`)
        .setDescription(`Reason\n` + '```' + reason_ + '```');


        await client.query(query);

        message.channel.send(`${member.id} has been warned :ok_hand: User has been notified`)
        .then(msg => {
            msg.delete({ timeout: 3000 })
          });


        discordclient.users.cache.get(member.user.id).send(embed).catch(() => message.reply("Can't send DM to your user!"));


        if(await command_logging(message.guild.id) ==  true){
            Log.Send(
			    discordclient,
			    `${moderator_id.username}#${moderator_id.discriminator} warned ${member.username}#${member.discriminator} ` + '`' + `${member.id}` + '`' + ` Reason: ${reason_ || 'None'}`,
                message.guild.id
		    );
        }
        await client.end();
    },
};
