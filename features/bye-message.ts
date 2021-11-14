import { Client, TextChannel } from 'discord.js'
import WOKCommands from 'wokcommands'

export default (client: Client, instance: WOKCommands) => {
  // Listen for new members joining a guild
  client.on('guildMemberRemove', (member) => {
    // Access the guild that they joined
    const { guild } = member

    // Get the channel named "welcome"
    const channel = guild.channels.cache.find(
      (channel) => channel.name === '👋bienvenue'
    ) as TextChannel

    // Ensure this channel exists
    if (!channel) {
      return
    }

    const welcome = [
      `${member} a quitté le serv ...`,
      `${member} est parti ..`,
      `Aurevoir ${member} 🏳`,
      `A bientôt ${member} 👋 !`,
    ]

    // Send the welcome message
    channel.send({
      content: welcome[Math.floor(Math.random() * welcome.length)],
    })
  })
}
