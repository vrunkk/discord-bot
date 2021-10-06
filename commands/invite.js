module.exports = {
  name: 'invite',
  aliases: ['inv'],
  description: 'Get the bot invite',
  execute(bot, message, args) {
    const prefixes = ['pp', 'pp ', 'Pp', 'Pp '];
    let prefix = false;
    for (const thisPrefix of prefixes) {
      if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
    }
    if (!message.content.startsWith(prefix)) return

    message.channel.send("Invite link for this bot is <https://discordapp.com/oauth2/authorize?client_id=731529524080148504&scope=bot&permissions=8>")

  }
}