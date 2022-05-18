
module.exports = {
	name: "hello",
	category: "botinfo",
	description: "Returns bot and API latency in milliseconds.",
	user: ["716206954313285713"],
	execute: async (message, args, client) => {

        let option = new disbut.MessageMenuOption()
        .setLabel('Your Label')
        .setEmoji('🍔')
        .setValue('menuid')
        .setDescription('Custom Description!')
    
        let select = new disbut.MessageMenu()
        .setID('customid')
        .setPlaceholder('Click me! :D')
        .setMaxValues(1)
        .setMinValues(1)
        .addOption(option)

        message.channel.send('Text with menu!', select);


    }
};
