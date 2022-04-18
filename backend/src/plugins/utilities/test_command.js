const functions = require("../../handlers/common_functions")

module.exports = {
	name: "boop",
	category: "botinfo",
	execute: async (message, args, client) => {
        console.log(await functions.rolelevel(message.guild.id))
	},
};
