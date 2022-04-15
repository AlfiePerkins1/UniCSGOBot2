const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const discordjs = require("discord.js");
const fs = require("fs");
const dotenv = require("dotenv");
const Sheets = require("node-sheets").default;
const nseStatsRows = [];
// 1 Uni, 2 Team, 3 Matches, 4 Rounds, 5 Rating, 6 RWS, 7 KD, 8 Kills, 9 Ass, 10, Deaths, 11 KPR
dotenv.config();

module.exports.run = async (Client, message, args) => {

let playerRow = 0;
    

(async () => {  try {
    const gs = new Sheets('1-OA3YpObVKpwi-Tx6F-F2dipr-oCIxPgiN-MxQXxpJM');
    const authData = require('../GoogleCredentials.json');
    await gs.authorizeJWT(authData);
    const table = await gs.tables('Main - updated');
    //Adding all rows to an array
    for (let i = 0; i < table.rows.length; i++) {
        nseStatsRows[i] = table.rows[i];
    }

    //table.rows[x] where x is 2 less than intended player

    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i][table.headers[0]].value === args[0]) {
            console.log(`Done ${i}`)
            playerRow = i;
        }
    }

    //console.log(table.rows[playerRow])
    let playerUni = table.rows[playerRow][table.headers[1]].stringValue;
    let playerTeam = table.rows[playerRow][table.headers[2]].stringValue;
    let playerMatches = table.rows[playerRow][table.headers[3]].value.toString();
    let playerRounds = table.rows[playerRow][table.headers[4]].value.toString();
    let playerRating = table.rows[playerRow][table.headers[5]].value.toString();
    let playerRWS = table.rows[playerRow][table.headers[6]].value.toString();
    let playerKD = table.rows[playerRow][table.headers[7]].value.toString();
    let playerKills = table.rows[playerRow][table.headers[8]].value.toString();
    let playerAssists = table.rows[playerRow][table.headers[9]].value.toString();
    let playerDeaths = table.rows[playerRow][table.headers[10]].value.toString();
    let playerKPR = table.rows[playerRow][table.headers[11]].value.toString();
    let playerADR = table.rows[playerRow][table.headers[12]].value.toString();

    console.log(table.headers[0],args[0])
    console.log(table.headers[1], playerUni)
    console.log(table.headers[2],playerTeam)
    console.log(table.headers[3],playerMatches)
    console.log(table.headers[4],playerRounds)
    console.log(table.headers[5],playerRating)
    console.log(table.headers[6],playerRWS)
    console.log(table.headers[7],playerKD)
    console.log(table.headers[8],playerKills)
    console.log(table.headers[9],playerAssists)
    console.log(table.headers[10],playerDeaths)
    console.log(table.headers[11],playerKPR)
    

    const statsEmbed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`Stats for ${args}`)
    .setDescription("Stats")
    .addFields(
		{ name: table.headers[0], value: args[0], inline: true },
		{ name: table.headers[1], value: playerUni, inline: true },
		{ name: table.headers[2], value: playerTeam, inline: true  },
		{ name: table.headers[3], value: playerMatches, inline: true },
        { name: table.headers[4], value: playerRounds, inline: true },
		{ name: table.headers[5], value: playerRating, inline: true },
        { name: table.headers[6], value: playerRWS, inline: true },
		{ name: table.headers[7], value: playerKD, inline: true },
        { name: table.headers[8], value: playerKills, inline: true },
		{ name: table.headers[9], value: playerAssists, inline: true },
        { name: table.headers[10], value: playerDeaths, inline: true },
		{ name: table.headers[11], value: playerKPR, inline: true },
        { name: table.headers[11], value: playerADR, inline: true },
	)              
    

    message.channel.send({embeds: [statsEmbed]});


} catch (err) { 
    console.error(err);  }})();

};

    module.exports.help = {
    
        name: 'nsestats'
    
};