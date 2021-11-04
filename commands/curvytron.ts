import { MessageAttachment, MessageEmbed, MessageButton, MessageActionRow } from "discord.js";
const puppeteer = require("puppeteer");
require("isomorphic-fetch");
import { GiphyFetch } from '@giphy/js-fetch-api'
const gf = new GiphyFetch('0UTRbFtkMxAplrohufYco5IY74U8hOes')
// const fs = require('fs');
// const path = require('path')

const config = require('../config.json')
const jc = config.jc

const chance = 1

module.exports = {
    
    category: 'Testing',
    description: 'Create a private curvytron room for you and your friends', // Required for slash commands
    
    slash: true, // Create both a slash and legacy command
    testOnly: true, // Only register a slash command for the testing guilds
    
    callback: async ({interaction} : {interaction : any}) => {

        await interaction.deferReply(); //defer reply

        let browser;
    
        try {
            browser = await puppeteer.launch(); //launch chrome
        } catch (error) {
            browser = await puppeteer.launch({
                headless: true,
                executablePath: '/bin/chromium-browser',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }); //launch chrome
        }

        const page = await browser.newPage(); //new page
        
        await page.goto("http://www.curvytron.com/#/"); //navigate to curvyton website
        await new Promise(r => setTimeout(r, 100));
        
        await page.click("#submit"); //create room
        await new Promise(r => setTimeout(r, 100));
        
        await page.type("#profile-name", "VFX-BOT"); //set profile name
        await new Promise(r => setTimeout(r, 100));
        
        await page.click("#profile > div.profile-form.ng-scope > div > div > button"); //confirm profile
        await new Promise(r => setTimeout(r, 100));
        
        await page.click(".icon-params"); //open settings
        await new Promise(r => setTimeout(r, 100));
        
        await page.click("#open"); //set room as private
        await new Promise(r => setTimeout(r, 100));
        
        await page.click(".icon-params"); //close settings
        await new Promise(r => setTimeout(r, 100));
        
        const url = await page.url(); //get url
        console.log(url);
        
        const joinButton = new MessageActionRow() //join game button
            .addComponents(
                new MessageButton()
                .setURL(url)
                .setLabel('Rejoindre la room')
                .setStyle('LINK')
                .setEmoji("🎮")
            )
            
        const spectateButton = new MessageActionRow() //spectate button
            .addComponents(
                new MessageButton()
                .setURL(url)
                .setLabel('Regarder la game')
                .setStyle('LINK')
                .setEmoji("👀")
                )
                
                
        let gifUrlWait;
        let gifUrlStart;

        const jcOrGifs = Math.round(Math.random() * (chance - 1)) //probabilité de tomber sur jc ou un gif

        const randGif = (Math.round(Math.random() * 25)) //random gif parmis 25
        const randOffset = (Math.round(Math.random() * 100)) //random offset
    
        const { data: gifsWait } = await gf.search('still waiting', {sort: 'relevant', offset: randOffset , type: 'gifs',}) //gif waiting
        const { data: gifsStart } = await gf.search('Start', {sort: 'relevant', offset: randOffset , type: 'gifs',}) //gif start game
        
        gifUrlStart = gifsStart[randGif].images.original.url //url gif start

        if (jcOrGifs) {

            gifUrlWait = gifsWait[randGif].images.original.url //url gif wait
            
        } else {
            const randJc = Math.round(Math.random() * (jc.length - 1)) //random images parmis l'array

            gifUrlWait = jc[randJc] //gif url wait jc

        }

        
        const embedWait = new MessageEmbed() //embed wait
                .setColor('BLURPLE')
                .setTitle('✨ Ready, waiting for players ... ✨')
                .setURL(url)
                // .setImage('http://www.curvytron.com/images/tuto/turn.gif')
                // .setThumbnail('http://www.curvytron.com/images/tuto/turn.gif')
                .setImage(gifUrlWait) //git url wait

        
        const embedSart = new MessageEmbed() //embed start
                .setColor('GOLD')
                .setTitle('Partie lancée 🥳!')
                .setURL(url)
                .setImage(gifUrlStart) //gif url start

        await interaction.editReply({ //edit reply with waiting
            embeds: [embedWait],
            components: [joinButton],
        });

        console.log('Ready, waiting for players ...');
        
        let currentTime = 0
        let launch = false;
        // let noPlayer = false;
        let playersolo;
        
        while (true) {
            
            const playerName = await page.$$eval(".player-name", (players : any) => { //get players names
                return players.map((option : any) => option.textContent)
            })
            
            const playerNumber = await page.$$eval(".player-name", (players : any) => { //get number of players
                return players.length - 1;
            })
            
            const ready = await page.$$eval(".ready", (ready : any) => { //get number of ready players
                return ready.length;
            })
            
            if (playerNumber > 1 && playerNumber === ready) { //more than 1 player and everyone is ready
                launch = true;
                break
            } else if (currentTime >= 10 && playerNumber === 0) { //after seconds and nobody break
                break
            } else if (currentTime === 10 && playerNumber === 1) { //after .. seconds and 1 player notify everyone

                playersolo = playerName.pop() //get the solo player name

                await page.screenshot({path: './commands/playerSolo.png', clip: {x:250, y:440, width: 550, height: 200}}); //screenshot

                const playerSoloAttachment = new MessageAttachment('./commands/playerSolo.png')

                const joinButtonUser = new MessageActionRow() //join @user button
                .addComponents(
                    new MessageButton()
                        .setURL(url)
                        .setLabel(`Rejoindre @${playersolo}`)
                        .setStyle('LINK')
                        .setEmoji("🎮")
                )

                const embedSoloPlayer = new MessageEmbed() //embed solo player
                    .setColor('RED')
                    .setTitle(`@${playersolo} est tout seul dans la partie`)
                    .setURL(url)
                    .setImage('attachment://playerSolo.png')

                await interaction.editReply({ //edit reply with solo player embed
                    embeds: [embedSoloPlayer],
                    files: [playerSoloAttachment],
                    components: [joinButtonUser],
                });
            }
            
            console.log(`player number : ${playerNumber}, readyPlayer : ${ready}, iteration : ${currentTime}, playerNames : ${playerName}`);

            await new Promise(r => setTimeout(r, 1000)); //1 second

            currentTime++
        }

        await browser.close(); //close browser and stop puppeteer bot
        
        if (launch) { //if party launch

            console.log("Party launch !");
            
            await interaction.editReply({ // edit reply with embed start
                embeds: [embedSart],
                components: [spectateButton]
            });
            
            await new Promise(r => setTimeout(r, 300*1000)); //wait 3min before deleting message

            interaction.deleteReply() //delete message

        } else { //if found nobody
            await interaction.editReply({
                content: "Aucun joueur n'a rejoint la partie 😭",
                components: [],
                embeds: [],
                attachments: []
            });

            await new Promise(r => setTimeout(r, 10*1000)); //wait 10 seconds

            interaction.deleteReply() //delete message
        }
    },
}