const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const discordjs = require("discord.js");
const fs = require("fs");
const dotenv = require("dotenv");
const Sheets = require("node-sheets").default;
const nseStatsRows = [];
dotenv.config();

module.exports.run = async (Client, message, args) => {


    

(async () => {  try {
    const gs = new Sheets('1-OA3YpObVKpwi-Tx6F-F2dipr-oCIxPgiN-MxQXxpJM');
    const authData = require('../GoogleCredentials.json');
    await gs.authorizeJWT(authData);
    const table = await gs.tables('Main - updated');
    //Adding all rows to an array
    for (let i = 0; i < table.rows.length; i++) {
        nseStatsRows[i] = table.rows[i];
    }
    console.log(args[0])
    
    let username = nseStatsRows.find(o => o.Name === args);
    console.log(username)

} catch (err) { 
    console.error(err);  }})();

};

    module.exports.help = {
    
        name: 'nsestats'
    
};