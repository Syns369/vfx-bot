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

    await interaction.deferReply(); //defer reply

    const type = args[0]
    let lieu = args[1]
    const date = args[2]
    const heure = args[3]

    let browser;
    
    try {
        browser = await puppeteer.launch({
            headless: false,
            userDataDir: './userData',
        }); //launch chrome
    } catch (error) {
        browser = await puppeteer.launch({
            headless: true,
            executablePath: '/bin/chromium-browser',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            userDataDir: './userData',
        }); //launch chrome
    }

    const page = await browser.newPage(); //new page

    if (lieu.split('/').shift() === 'https:') {

      await page.goto(lieu); //go to google maps

    } else {

      await page.goto('https://www.google.com/maps/search/' + lieu); //go to google maps

      await page.waitForNavigation({
        waitUntil: 'networkidle0',
      });
      
      //click searchboxinput
      await page.click('#searchboxinput');

      //press enter
      await page.keyboard.press('Enter');

      lieu = await page.url();
    }
    
    await new Promise(r => setTimeout(r, 1000 * 2)); //wait 2 seconds

    //take screenshot of google maps
    await page.screenshot({
        path: './commands/screenshot.png',
        fullPage: true
    });

    await browser.close(); //close chrome

    let pronom;
    let title;

    if (type.toLowerCase() === "soiree") {
        pronom = 'chez'
        title = 'Rdv Soirée 🥳'
    } else if (type.toLocaleLowerCase() === "bar") {
        pronom = 'avec'
        title = 'Rdv Bar 🍻'
    }
    
    const description = `Rendez-vous ${pronom} @${interaction.user.username}`
    
    const screenshot = new MessageAttachment('./commands/screenshot.png')

    const exampleEmbed = new MessageEmbed()
        .setTitle(String(title))
        .setDescription(`${description}`)
        .setColor('#0099ff')
        .setURL(lieu)
        .setTimestamp()
        .setAuthor(interaction.user.username, String(interaction.user.avatarURL()))
        .addField('Date', date)
        .addField('Heure', heure)
        .setImage('attachment://screenshot.png')
        .setThumbnail('attachment://screenshot.png')


    const message = await interaction.editReply({
        embeds: [exampleEmbed],
        files: [screenshot],
    }) as Message
    
    message.react('✅')
    message.react('⛔')
  },
} as ICommand