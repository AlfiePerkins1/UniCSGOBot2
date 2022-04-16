const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const discordjs = require("discord.js");
const mongoose = require("mongoose");
const sConfig = require("../models/sConfig");
const dotenv = require("dotenv");
dotenv.config();


module.exports.run = async (Client, message, args) => {
	const avaliableCommands = [];
	if (message.member.roles.cache.some(role => role.name === 'Admin') || message.author.id === '276641144128012289'  && !args[0]) {
        
		sConfig.findOne({
			serverID: message.guild.id
		}, (err, result) => {
			if(err) console.log(err);
			if(!result){
				message.reply(`No config avaliable for ${message.guild.name}`)	;			
			}else{
				for (let i = 0; i < result.commands.length; i++) {
					avaliableCommands[i] = result.commands[i];
					console.log(avaliableCommands[i]);
				}

				const configEmbed = new MessageEmbed()
					.setColor("GREEN")
					.setTitle(`Avaliable options to edit`)
					.setDescription("config");
				for (let i = 0; i < avaliableCommands.length; i++) {
					console.log(`cmd ${[i]} ${avaliableCommands[i]}`);
					configEmbed.addField(`${[i]}.`, avaliableCommands[i]);               
				}             
    

				message.channel.send({embeds: [configEmbed]});
			}
		});

		

	}
	else
	{
		message.reply("Not required perms");
	}

};

module.exports.help = {
    
	name: 'updateconfig'
    
};
