const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const commands = [];
var commandFolders = fs.readdirSync("./src/plugins");

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./src/plugins/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./plugins/${folder}/${file}`);
        if(command.data){
        commands.push(command.data.toJSON())
        }
	}
}

const rest = new REST({ version: '9' }).setToken('NzQ2NzQzODA3MDQyOTEyMzM2.X0ExXQ.P-ASQembqGsKZAEDghUIVNuZF0s');

rest.put(Routes.applicationGuildCommands(`746743807042912336`, '734281219839230022'), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);