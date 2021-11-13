import { Client, TextChannel } from 'discord.js'
import WOKCommands from 'wokcommands'

export default (client: Client, instance: WOKCommands) => {
  // Listen for new members joining a guild
  client.on('guildMemberAdd', (member) => {
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
        `Ho non pas ${member} ... `,
        `Bienvenue ${member}, prend une chaise installe toi`,
        `${member} vient de vent dans le serv !`,
        `Bienvenue àw ${member}, notre nouveau stagiaire`,
        `A t'es là toi ?${member}`,
        `Cry in ${member}`,
        `Un ${member} sauvage apparaît !`,
        `${member} a enfin trouver son chemin !`,
        `Encore toi fumier ?! ${member}`,
        `${member} vient d'arriver, on va encore se taper une barre (non)`,
        `${member} a rejoint la communauté`,
        `Salutations ${member}, puisse le sort t'être favorable`,
        `Bienvenue au Mordor ${member}`,
        `${member} s'est perdu je crois ..`,
        `${member} vient de spawn en x : 2545848m, y :56646587m`,
    ]

    // Send the welcome message
    channel.send({
      content: welcome[Math.floor(Math.random() * welcome.length)],
    })
  })
}
