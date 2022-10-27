const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "role_remove",
  category: "botinfo",
  description: "Returns bot and API latency in milliseconds.",
  execute: async (message, args, client) => {
    const role = await message.guild.roles.fetch(message.options.getRole('role').id);
    const user = await message.guild.members.fetch(message.options.getUser('user').id);

    for (let i = 0; i < await user.roles.cache.map(r => r.id).length; i++) { 
        
      if(user.roles.cache.map(r => r.id)[i] != role){
            
      }
      else {
        user.roles.remove(role.id);
        message.reply(`Removed ${role.name} to <@${user.id}>`)
      }
    }
  },
  data: new SlashCommandBuilder()
  .setName("role_remove")
  .setDescription("Returns information about the role in the server")
  .addRoleOption(option => option.setName("role").setDescription("The role to add to the user").setRequired(true))
  .addUserOption(option => option.setName("user").setDescription("The user to have the role").setRequired(true))
};
