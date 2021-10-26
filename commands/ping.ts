require("isomorphic-fetch");
import { GiphyFetch } from '@giphy/js-fetch-api'

const gf = new GiphyFetch('0UTRbFtkMxAplrohufYco5IY74U8hOes')

module.exports = {
    category: 'Testing',
    description: 'Replies with pong', // Required for slash commands
    
    slash: 'both', // Create both a slash and legacy command
    testOnly: true, // Only register a slash command for the testing guilds
    
    callback: async ({interaction} : {interaction : any}) => {
        const rand = (Math.round(Math.random() * 25))
        const rand2 = (Math.round(Math.random() * 2))
        const { data: gifs } = await gf.search('waiting', {sort: 'relevant', type: 'gifs',})
        interaction.reply(gifs[rand].images.original.url)
        // interaction.reply(`${rand}`)
        
        console.log(rand2);
        console.log(interaction.user.id);
        
    },
  }