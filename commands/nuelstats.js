const puppeteer = require('puppeteer')
const { MessageEmbed, MessageActionRow, MessageButton, Permissions, GUILD_MEMBERS  } = require('discord.js');
const discordjs = require("discord.js");
const { head } = require('request');

module.exports.run = async (Client, message, args) => {
    
    console.log(args)

    async function start() {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(`https://stadistics.com/player/${args}`)
      
      const data = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("div.PlayerStats div.PSTop div.PSContent")).map(x => x.textContent)
      })
      const headings = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("div.PlayerStats div.PSTop div.PSLabel")).map(x => x.textContent)
      })
      const playerName = await page.evaluate(() => {
          return Array.from(document.querySelectorAll(" div.PDText > div.PDName > a")).map(x => x.textContent)
      })
      let broken = false;
console.log(headings[1])
          if (data[1] === undefined || headings[1] === undefined) {
              broken = true;
              console.log(broken)
          }
      

if (broken === false) {
        const statsEmbed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`Stats for ${playerName}`)
          .setDescription("Stats")
          for (let i = 0; i < headings.length; i++) {
              statsEmbed.addField(`${headings[i]}`,`${data[i]}`)               
          }
    
          message.channel.send({embeds: [statsEmbed]});

}
else {

 

    const statsEmbed = new MessageEmbed()
      .setColor("RED")
      .setTitle(`Stats for ${playerName} unavaliable`)
      .setDescription("Please try again")
      message.channel.send({embeds: [statsEmbed]});
}
    
      await browser.close()
      }
      start()
       
};

module.exports.help = {
    
        name: 'nuelstats'
    
};
