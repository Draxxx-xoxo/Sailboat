const functions = require("../handlers/common_functions")

module.exports = async (discordClient, interaction) => {

  if (interaction.isButton()){
    if(interaction.component.customId == "yes" || "no"){
      const destroy_infs = require("../plugins/infractions/destroy_inf")

      try{
        destroy_infs.button(interaction, discordClient)
      } catch (error) {
        console.log(error);
      }
    }

    if(interaction.component.customId.toLowerCase() == "warn" || "mute" || "ban" || "kick" || "deny"){
      const report_buttons = require("../plugins/report/report_buttons") 

      try{
        report_buttons.execute(interaction, discordClient)
      } catch (error) {
        console.log(error);
      }
    }
  }

  if(interaction.isSelectMenu()){
    const message_menu = require("../plugins/infractions/message_menu") 

    try{
      message_menu.execute(interaction, discordClient)
    } catch (error) {
      console.log(error);
    }
  }
  if(interaction.isCommand()){

    const { commandName } = interaction;
    const command = discordClient.commands.get(commandName)
    const commandEnabled = command.enable || false
    const super_admins = await functions.super_admins()

    if(commandEnabled == false){
      if(super_admins[0] !== interaction.user.id){
        await interaction.reply({ content:"This commands are not ready to use yet! We will be releasing them soon.", ephemeral: true })
        return;
      }
    }
    if (command.permissions) {
      const authorPerms = interaction.channel.permissionsFor(interaction.user);
      if (!authorPerms || !authorPerms.has(command.permissions)) {
        return interaction.reply({content: "You cannot use the " + command.name + " command", ephemeral: true});
      }
    }

    try{
      await command.execute(interaction, discordClient)
    } catch (error) {
      console.log(error);
    }
  
  }
};