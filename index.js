//import discordjs, { client, Intents } from 'discord.js'
const discordjs = require("discord.js");
//import dotenv from 'dotenv';
const dotenv = require("dotenv");
//import * as fs from 'fs';
const fs = require("fs");
const axios = require("axios")
const puppeteer = require('puppeteer')
const client = new discordjs.Client({ intents: [ 'GUILDS', 'GUILD_MESSAGES' ] });

//client.commands = new discordjs.Collection();
client.commands = new discordjs.Collection();
dotenv.config();
const prefix = '+';

fs.readdir("./commands", (err, files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Commands could not be loaded.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!` );
    client.commands.set(props.help.name, props);
  });
});


client.on('ready', () => {

    // When bot comes online
    console.log(`Bot online as ${client.user.tag}`);
    })



client.on('messageCreate', message => {

  let messageArray = message.content.split(" ");
 
  let cmd = messageArray[0];

  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  //a little bit of data parsing/general checks
  if(message.content.startsWith(prefix) && !message.author.bot) {   // Starts with prefix or author isnt bot
    console.log(client.commands);
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(client, message,args)
  }
  else {

    console.log( "Message sent by: " + message.author.username );
  }

  message.guild.members.fetch().then(members =>
    {
      console.log("Here")
        // Loop through every members
      members.forEach(member =>
        {
          const activity = member.presence.activities[0];
          console.log(activity)
          console.log("Here1")
        });
});
  
})


client.login(process.env.TOKEN);