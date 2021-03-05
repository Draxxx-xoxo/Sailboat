const Discord = require('discord.js');
const { mainprefix, token } = require('../../../config.json');
const client = new Discord.Client();
const fetch = require('node-fetch');
client.commands = new Discord.Collection();


client.once('ready', () => {
	console.log('eval');
});

client.on('message', async message => {
	
    if(message.author.id === '716206954313285713', '254000526448918530'){
            try{
                if (message.content.startsWith(`${mainprefix}eval`)) {
                     var result = message.content.split(" ").slice(1).join(" ")
                    let evaled = eval(result);
                    message.channel.send('```'+ evaled + '```')
                    }
                }
            catch(error){
                console.log(error);
                message.channel.send('```'+ error + '```');
            }
        }
      });



    client.login(process.env.token)