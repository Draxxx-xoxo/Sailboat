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
};