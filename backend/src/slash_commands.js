const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");


const admin_commands = [];
var adminCommandFolder = fs.readdirSync("./src/plugins/admin").filter(file => file.endsWith(".js"));

for (const file of adminCommandFolder) {
  const command = require(`./plugins/admin/${file}`);
  if(command.data){
    admin_commands.push(command.data.toJSON())
  }
}


const rest = new REST({ version: "9" }).setToken(process.env.sailboat_canary_token);

rest.put(Routes.applicationGuildCommands("952099325142528040", "734281219839230022"), { body: admin_commands })
  .then(() => console.log("Successfully registered admin commands."))
  .catch(console.error);

const globalCommands = [];
var commandFolders = fs.readdirSync("./src/plugins");

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./src/plugins/${folder}`).filter(file => file.endsWith(".js") && file != "eval.js" && file != "usercache.js" && file != "ping.js");
  for (const file of commandFiles) {
    const command = require(`./plugins/${folder}/${file}`);
    if(command.data){
      globalCommands.push(command.data.toJSON())
    }
  }
}

rest.put(Routes.applicationCommands("952099325142528040"),{ body: globalCommands },)
  .then(() => console.log("Successfully registered global commands."))
  .catch(console.error);