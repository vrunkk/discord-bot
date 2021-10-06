if(message.content.startsWith(`${prefix}talk`)){
	var talk="739806748910813216"
	
	if(message.channel.id!==talk) message.channel.send("This command is for the Bot server only!")//if the channel isnt "talk" return
    
  if(message.channel.id===talk){
		let channelid=message.content.slice(prefix.length+4).trim().split(/ +/g).toString(); // slice prefix plus 4 letters for "talk", trim removes extra space
		//toString() is the most important part, it converts the channel id to a string so that it can be used for get()
		
    if(!channelid){message.channel.send("Please specify a channel ID")} 
    if(channelid){
    success = false
   try{   
	  var channelName= bot.channels.cache.get(channelid).name.toString() //gets the channel and its name
		message.channel.setName(channelName)
     success=true
  }catch(error){message.channel.send("That is either an invalid ID or the bot cannot access the channel!")
  } 
  if(success){
 var channelllid= channelid
 message.channel.send(`Successfully talking in <#${channelid}>!`)
    }
  }
 }
}
if(!channelllid) return
if(channelllid){
	
	if(message.channel.id===channelllid){message.stupidchannel.send("I can see!")}
}