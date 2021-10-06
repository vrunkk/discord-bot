module.exports = {
  name: "say",
  description: "Make the bot say whatever you want!",
  execute(bot, message, args) {

    const prefixes = ['pp', 'pp ', 'Pp', 'Pp '];
    let prefix = false;
    for (const thisPrefix of prefixes) {
      if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
    }
    if (!message.content.startsWith(prefix)) return;
    let msg = message.content.slice(prefix.length + 4)
    if (!msg) return message.channel.send("What do you want me to say, dumbass?")
    message.channel.send(msg)
    message.delete()
  }
}
