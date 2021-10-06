module.exports={
name: "send",
description: "Bot owner only!",
execute(message,bot){

  const prefixes = ['pp', 'pp ','Pp','Pp '];
  let prefix = false;
  for(const thisPrefix of prefixes) {
    if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
  }

if(message.channel.type !== 'dm') return;
let msg=message.content.split(`${prefix}send `).join("")
if(!msg) return message.channel.send("What do you want me to say,dumbass?")

if(message.author.id !== '717369063168409721'){

message.author.send("This command is for the Bot Owner only!")
}

else{

bot.channels.cache.get(channel => channel.id === '704907667507773480').send(msg);
}
}
}
//
