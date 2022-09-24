module.exports = {
  name: "ping",
  category: "botinfo",
  description: "Returns bot and API latency in milliseconds.",
  user: ["716206954313285713"],
  execute: async (message, args, client) => {
         	message.channel.send("Loading Data").then(async(msg) =>{
        	msg.edit(`🏓Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    })
  },
};
