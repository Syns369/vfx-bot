import { Message, MessageAttachment, MessageEmbed, MessageReaction } from 'discord.js'
import { ICommand } from 'wokcommands'

require("isomorphic-fetch");
import { GiphyFetch } from '@giphy/js-fetch-api'
const gf = new GiphyFetch('0UTRbFtkMxAplrohufYco5IY74U8hOes')

//import puppeteer
const puppeteer = require('puppeteer')

export default {
  category: 'test', // Required for the slash commands
  description: 'Adds two numbers', // Required for the slash commands

  slash: true, // If options are given then slash must be either true or 'both'
  testOnly: true, // Ensure you have test servers setup
  guildOnly: true, // Ensure you have test servers setup

  options: [
    {
      name: 'type', // Must be lower case
      description: 'Soirée, Bar, Sport ?',
      required: true,
      type: 'STRING', // This argument is a string
      choices: [
        {
          name: "Soirée", value: "soirée"
        },
        {
          name: "Bar", value: "bar"
        },
        {
          name: "Sport", value: "sport"
        },
      ],
    },
    {
      name: 'lieu', // Must be lower case
      description: 'nom du lieu ou lien google maps',
      required: true,
      type: 'STRING', // This argument is a string
    },
    {
      name: 'jour', // Must be lower case
      description: 'Le jour du rdv',
      required: true,
      type: 'STRING', // This argument is a string
      choices: [
        {
            name: "Lundi", value: "Lundi"
        },
        {
            name: "Mardi", value: "Mardi"
        },
        {
            name: "Mercredi", value: "Mercredi"
        },
        {
            name: "Jeudi", value: "Jeudi"
        },
        {
            name: "Vendredi", value: "Vendredi"
        },
        {
            name: "Samedi", value: "Samedi"
        },
        {
            name: "Dimanche", value: "Dimanche"
        },
    ],
    },
    {
      name: 'jour_numéro', // Must be lower case
      description: 'De 1 à 31',
      required: true,
      type: 'NUMBER', // This argument is a string
    },
    {
      name: 'mois', // Must be lower case
      description: 'Le mois du rdv',
      required: true,
      type: 'STRING', // This argument is a string
      choices: [
        {
            name: "Janvier", value: "01"
        },
        {
            name: "Février", value: "02"
        },
        {
            name: "Mars", value: "03"
        },
        {
            name: "Avril", value: "04"
        },
        {
            name: "Mai", value: "05"
        },
        {
            name: "Juin", value: "06"
        },
        {
            name: "Juillet", value: "07"
        },
        {
            name: "Août", value: "08"
        },
        {
            name: "Septembre", value: "09"
        },
        {
            name: "Octobre", value: "10"
        },
        {
            name: "Novembre", value: "11"
        },
        {
            name: "Décembre", value: "12"
        },
    ],
    },
    {
      name: 'heure', // Must be lower case
      description: 'Heure du rdv de 00h à 23h',
      required: true,
      type: 'STRING', // This argument is a string
      choices: [
        {
            name: "00h", value: "00h"
        },
        {
            name: "01h", value: "01h"
        },
        {
            name: "02h", value: "02h"
        },
        {
            name: "03h", value: "03h"
        },
        {
            name: "04h", value: "04h"
        },
        {
            name: "05h", value: "05h"
        },
        {
            name: "06h", value: "06h"
        },
        {
            name: "07h", value: "07h"
        },
        {
            name: "08h", value: "08h"
        },
        {
            name: "09h", value: "09h"
        },
        {
            name: "10h", value: "10h"
        },
        {
            name: "11h", value: "11h"
        },
        {
            name: "12h", value: "12h"
        },
        {
            name: "13h", value: "13h"
        },
        {
            name: "14h", value: "14h"
        },
        {
            name: "15h", value: "15h"
        },
        {
            name: "16h", value: "16h"
        },
        {
            name: "17h", value: "17h"
        },
        {
            name: "18h", value: "18h"
        },
        {
            name: "19h", value: "19h"
        },
        {
            name: "20h", value: "20h"
        },
        {
            name: "21h", value: "21h"
        },
        {
            name: "22h", value: "22h"
        },
        {
            name: "23h", value: "23h"
        },
    ],
    },
    {
      name: 'minute', // Must be lower case
      description: 'Minute du rdv de 0 à 60',
      required: true,
      type: 'STRING', // This argument is a string
      choices: [
        {
            name: "00", value: "00"
        },
        {
            name: "05", value: "05"
        },
        {
            name: "10", value: "10"
        },
        {
            name: "15", value: "15"
        },
        {
            name: "20", value: "20"
        },
        {
            name: "25", value: "25"
        },
        {
            name: "30", value: "30"
        },
        {
            name: "35", value: "35"
        },
        {
            name: "40", value: "40"
        },
        {
            name: "45", value: "45"
        },
        {
            name: "50", value: "50"
        },
        {
            name: "55", value: "55"
        },
        {
            name: "60", value: "60"
        },
    ],
    },
  ],


  callback: async ({ interaction ,args, client }) => {

    await interaction.deferReply(); //defer reply
    
    const type = args[0];
    const lieu = args[1];
    const jour = args[2];
    let jour_numero = args[3];
    const mois = args[4];
    const heure = args[5];
    const minute = args[6];

    let url;

    let browser;

    let pronom;
    let title;
    
    if (jour_numero.length === 1) {
        jour_numero = '0' + jour_numero;
    }

    let gifUrl = '';
    
    // const randGif = (Math.round(Math.random() * 25)) //random gif parmis 25
    // const randOffset = (Math.round(Math.random() * 100)) //random offset

    // const { data: gifsParty } = await gf.search('Party', {sort: 'relevant', offset: randOffset , type: 'gifs',}) //gif start game
    // const { data: gifsSport } = await gf.search('Sport', {sort: 'relevant', offset: randOffset , type: 'gifs',}) //gif start game
    // const { data: gifsBar } = await gf.search('Bar', {sort: 'relevant', offset: randOffset , type: 'gifs',}) //gif start game
    
    if (type === 'soirée') {
        pronom = 'chez'
        title = 'Rdv Soirée 🥳'
        // gifUrl = gifsParty[randGif].images.original.url //url gif start
        gifUrl = 'https://media.giphy.com/media/blSTtZehjAZ8I/giphy.gif'
    } else if (type === 'bar') {
        pronom = 'avec'
        title = 'Rdv Bar 🍻'
        // gifUrl = gifsBar[randGif].images.original.url //url gif start
        gifUrl = 'https://media.giphy.com/media/lTGLOH7ml3poQ6JoFg/giphy.gif'
    } else if (type === 'sport') {
        pronom = 'avec'
        title = 'Rdv Sport 🏃'
        // gifUrl = gifsSport[randGif].images.original.url //url gif start
        gifUrl = 'https://media.giphy.com/media/1r8PZV2pFF4MUf6BcI/giphy.gif'
    }

    const description = `Rendez-vous ${pronom} @${interaction.user.username}`

    try {
        browser = await puppeteer.launch({
            headless: true,
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
      url = lieu;

    } else {

      await page.goto('https://www.google.com/maps/search/' + lieu); //go to google maps

      await page.waitForNavigation({
        waitUntil: 'networkidle0',
      });
      
      //click searchboxinput
      await page.click('#searchboxinput');

      //press enter
      await page.keyboard.press('Enter');

      url = await page.url();
    }
    
    await new Promise(r => setTimeout(r, 1000 * 3)); //wait 2 seconds

    //take screenshot of google maps
    await page.screenshot({
        path: './commands/screenshot.png',
        fullPage: true
    });

    await browser.close(); //close chrome
    
    const screenshot = new MessageAttachment('./commands/screenshot.png')

    const exampleEmbed = new MessageEmbed()
        .setTitle(String(title))
        .setDescription(`${description}`)
        .setColor('#0099ff')
        .setURL(url)
        .setTimestamp()
        .setAuthor(interaction.user.username, String(interaction.user.avatarURL()))
        .addField('Jour', `${jour} ${jour_numero}/${mois}`, true)
        .addField('Heure', `${heure+minute}`, true)
        .setThumbnail(gifUrl)
        .setImage('attachment://screenshot.png')


    const message = await interaction.editReply({
        embeds: [exampleEmbed],
        files: [screenshot],
    }) as Message
    
    message.react('✅')
    message.react('⛔')
  },
} as ICommand