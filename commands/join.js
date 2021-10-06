module.exports = {
	name: 'join',
	aliases: ['summon', 'vc'],
	description: 'Get the bot to join your vc!',
	execute(bot, message, args) {
		const prefixes = ['pp', 'pp ', 'Pp', 'Pp '];
		let prefix = false;
		for (const thisPrefix of prefixes) {
			if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
		}
		if (!message.content.startsWith(prefix)) return

		const voiceChannel = message.member.voice.channel

		if (!voiceChannel) return message.reply('please join a voice channel first!');

		voiceChannel.join().catch(err => {
			console.error(err);
			message.channel.reply('Could not join the voice channel!');
		})
		message.channel.send('Joined vc!');
	}
}
