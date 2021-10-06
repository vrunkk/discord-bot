const Discord = require('discord.js');
module.exports = {
  name: "ping",
  description: "Shows ping",
  execute: async (bot, message, args) => {

    const prefixes = ['pp', 'pp ', 'Pp', 'Pp '];
    let prefix = false;
    for (const thisPrefix of prefixes) {
      if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
    }
    if (!message.content.startsWith(prefix)) return

    const msg = await message.channel.send('Pinging....')
    const embed = new Discord.MessageEmbed()
      .setTitle("Pong!")
      .setDescription(`Your ping is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}milliseconds`)
      .setColor("RANDOM")

    msg.edit(embed)
  }

}
