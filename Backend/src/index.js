require("dotenv").config()
const fs = require("fs")
const { Intents } = require("discord.js")
const Discord = require("discord.js")
const { resolve } = require("path")
const discordClient = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS] })
discordClient.commands = new Discord.Collection()

const commandFolders = fs.readdirSync("./src/plugins")

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./src/plugins/${folder}`).filter(file => file.endsWith(".js"))
  for (const file of commandFiles) {
    const command = require(`./plugins/${folder}/${file}`)
    discordClient.commands.set(command.name, command)
  }
}

fs.readdir(resolve(__dirname, "./events/"), (err, files) => {
  if (err) return console.error
  files.forEach((file) => {
    if (!file.endsWith(".js")) return
    if (file === "logging_events.js") return
    const evt = require(`./events/${file}`)
    const evtName = file.split(".")[0]
    discordClient.on(evtName, evt.bind(null, discordClient))
  })
})

discordClient.login(process.env.token)
