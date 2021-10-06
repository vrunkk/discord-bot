const Discord = require('discord.js')
const bot = new Discord.Client();

module.exports = {
    name: 'snipe',
    description: 'Snipe',
    execute: async (bot, message, args) => {
        const msg = bot.snipes.get(message.channel.id)
        if (!msg) {
            message.channel.send("No messages have been deleted recently!");
        }
        else {
            const embed = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.displayAvatarURL())
                .setDescription(msg.content)
                .setTimestamp();
            message.channel.send(embed);
        }
    }
}