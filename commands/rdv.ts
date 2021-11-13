import { Message, MessageAttachment, MessageEmbed, MessageReaction } from 'discord.js'
import { ICommand } from 'wokcommands'

//import puppeteer
const puppeteer = require('puppeteer')

export default {
  category: 'test', // Required for the slash commands
  description: 'Adds two numbers', // Required for the slash commands

  slash: 'both', // If options are given then slash must be either true or 'both'
  testOnly: true, // Ensure you have test servers setup
  ownerOnly: true, // Ensure you have test servers setup


  options: [
    {
      name: 'type', // Must be lower case
      description: 'Soirée ou Bar ?',
      required: true,
      type: 3, // This argument is a string
    },
    {
      name: 'lieu', // Must be lower case
      description: 'lien google maps',
      required: true,
      type: 3, // This argument is a string
    },
    {
      name: 'date', // Must be lower case
      description: 'La date du rdv format j/m',
      required: true,
      type: 3, // This argument is a string
    },
    {
      name: 'heure', // Must be lower case
      description: 'Heure du rdv format 10:30',
      required: true,
      type: 3, // This argument is a string
    },
  ],


  callback: async ({ interaction ,args, client }) => {
    const type = args[0]
    const lieu = args[1]
    const date = args[2]
    const heure = args[3]

    await interaction.deferReply(); //defer reply

    let browser;
    
        try {
            browser = await puppeteer.launch({
                headless: false,
            }); //launch chrome
        } catch (error) {
            browser = await puppeteer.launch({
                headless: true,
                executablePath: '/bin/chromium-browser',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }); //launch chrome
        }

    const page = await browser.newPage(); //new page
        
    await page.goto(lieu); //go to google maps
    await new Promise(r => setTimeout(r, 1000));

    // await page.click(".VfPpkd-vQzf8d");
    // await page.click(".VfPpkd-LgbsSe");
    await new Promise(r => setTimeout(r, 500));

    //click on span html text === "J'accepte"
    

    

    
    
    //take screenshot of google maps
    await page.screenshot({
        path: './commands/screenshot.png',
        fullPage: true
    });
    await new Promise(r => setTimeout(r, 1000 * 60));

    await browser.close(); //close chrome
    
    const description1 = `Rendez-vous chez @${interaction.user.username}`
    const description2 = `Rendez-vous avec ${interaction.user.username}`
    
    const screenshot = new MessageAttachment('./commands/screenshot.png')

    const exampleEmbed = new MessageEmbed()
        .setTitle(`Rdv ${type} 🍺`)
        .setDescription(`${description1}`)
        .setColor('#0099ff')
        .setURL(lieu)
        .setTimestamp()
        .setAuthor(interaction.user.username, String(interaction.user.avatarURL()))
        .addField('Date', date)
        .addField('Heure', heure)
        .setImage('attachment://screenshot.png')



    // const embed = {
    //     timestamp: new Date(),
    //     title: `Rdv ${type} 🍺`,
    //     description: description1,
    //     color: 16065893,
    //     url: lieu,
    //     author: {
    //         name: interaction.user.username,
    //         icon_url: interaction.user.displayAvatarURL(),  
    //     },
    //     fields: [
    //         {
    //             name: 'Date',
    //             value: date,
    //             inline: true,
    //         },
    //         {
    //             name: 'Heure',
    //             value: heure,
    //             inline: true,
    //         },
    //     ],
    //     image: {
    //         url: 'attachment:./screenshot.png',
    //     },

    //     // footer: {
    //     //     text: 'Votez avec ✅ ou ⛔',
    //     //     icon_url: interaction.user.displayAvatarURL(),
    //     // },
    
    // }

    const message = await interaction.editReply({
        embeds: [exampleEmbed],
        files: [screenshot],
    }) as Message
    
    message.react('✅')
    message.react('⛔')
  },
} as ICommand