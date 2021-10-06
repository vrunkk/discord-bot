
module.exports = {
	name: 'play',
	description: 'Play a song!',
execute(message){

  const ytdl = require('ytdl-core');
  var servers = {}
  function play(connection,message){
    var server = servers[message.guild.id]
    server.dispatcher=connection.playStream(ytdl(server.queue[0], {filter: 'audioonly'}));
    server.queue.shift();
    server.dispatcher.on('end', function(){
  if(server.queue[0]){
    play(connection,message)
  }
  else{
    connection.disconnect()
  }
    })
  }

const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send("You need to be in a voice channel to play music!")

    const prefixes = ['pp', 'pp ','Pp','Pp '];
    let prefix = false;
    for(const thisPrefix of prefixes) {
      if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
    }


if(!servers[message.guild.id]) servers[message.guild.id] = {
queue: []
}
var server = servers[message.guild.id]

server.queue.push(args[1]);

if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
play(connection,message)

})

}

  }
