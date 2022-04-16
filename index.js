/* eslint-disable no-mixed-spaces-and-tabs */
const discordjs = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const axios = require("axios");
const puppeteer = require('puppeteer');
const mongoose = require("mongoose");
const sConfig = require("./models/sConfig");
const client = new discordjs.Client({ intents: [ 'GUILDS', 'GUILD_MESSAGES' ] });
const Sheets = require("node-sheets").default;
const nseStatsRows = [];
client.commands = new discordjs.Collection();
dotenv.config();

//Get from database soon
const prefix = '+';

fs.readdir("./commands", (err, files) => {
	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
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
	mongoose.connect(process.env.dbToken, {useUnifiedTopology: true, useNewUrlParser: true });



});



client.on('messageCreate', message => {

    	//Setting up server specific config file
	sConfig.findOne({
		serverN: message.guild.name, 
		serverID: message.guild.id
	}, (err, config) => {
		if(err) console.log(err);
		if(!config){
			const newsConfig = new sConfig({
				serverN: message.guild.name, 
				serverID: message.guild.id,
				prefix: "+",
				commands: ["nsestats","nuelstats"]
        
			});

			newsConfig.save().catch(err => console.log(err));
		}else{
			//Do nothing currently
		}

		let messageArray = message.content.split(" ");
 
		let cmd = messageArray[0];

		let args = messageArray.slice(1);

		let commandfile = client.commands.get(cmd.slice(prefix.length));
		//a little bit of data parsing/general checks
		if(message.content.startsWith(prefix) && !message.author.bot) {   // Starts with prefix or author isnt bot
			console.log(client.commands);
			let commandfile = client.commands.get(cmd.slice(prefix.length));
			sConfig.findOne({
				serverID: message.guild.id
			}, (err, result) => {
				console.log(`Commands ${result.commands}`);
				console.log(`Execution command ${JSON.stringify(commandfile, null, 2)}`);

				console.log(`Includes; ${result.commands.includes(commandfile.help.name)}`);
				if (commandfile && result.commands.includes(commandfile.help.name) || message.author.id === '276641144128012289') {
					commandfile.run(client, message,args);
				}
				else {
					message.reply(`This server does not have access to ${cmd}`);
					console.log( "Message sent by: " + message.author.username );
				}

			});
			
		}
		




	});

  
});


client.login(process.env.TOKEN);