import { MessageEmbed, MessageReaction, TextChannel, User } from "discord.js";
import { ICommand } from "wokcommands";

const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../data/propal.txt');

export default {
    category: "Propal",
    description: "Utilise cette commande pour faire des propals",

    slash: true,
    testOnly: true,
    guildOnly: true,

    options: [
        {
            name: "type",
            description: "Type de la propal",
            type: "STRING",
            required: true,
            choices : [
                {
                    name: 'Normale', value: 'normale'
                },
                {
                    name: 'Bot', value: 'bot' 
                },

            ]
        },
        {
            name: "propal",
            description: "La propal",
            type: "STRING",
            required: true,
        }
    ],

    callback: async ({args, interaction, channel, client}) => {

        const type = args[0];
        const propal = args[1];
        //read file nb
        await fs.readFile(file, 'utf8', async (err: any, data: string) => {
            if (err) throw err;
            let nb = parseInt(data);

            const embed = new MessageEmbed()
                .setAuthor(interaction.user.username, String(interaction.user.avatarURL() || interaction.user.defaultAvatarURL))
                .setTitle(`Propal n°${nb}`)
                .setDescription(propal)
                .setColor('BLURPLE')
                .addField('Status', 'En attente de votes', true)
                .setTimestamp();
                

            const m = await channel.send({
                embeds: [embed],
            });
            m.react('⬆')
            m.react('⬇')

            // console.log(m);

            console.log(`Propal n°${nb}`);

            nb++;

            fs.writeFile(file, String(nb), function(err: any) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });

            interaction.reply({
                content: "Votre propal a bien été envoyée !",
                ephemeral: true
            });

            const filter = (reaction: MessageReaction, user: User) => {
                return user.id === '199877925405720577' && reaction.emoji.name === '✅';
            }
    
            const collector = m.createReactionCollector({
                filter,
                max: 1,
            })
    
            collector.on("collect", (reaction) => {
                console.log(reaction.emoji.name);
            });
    
            collector.on("end", collected => {

                // const newDescription = `~~${m.embeds[0].description}~~`;

                //remove field
                m.embeds[0].fields = [];
                
                const embedValide = m.embeds[0]
                    .setColor("#00ff00")
                    // .setDescription(newDescription)
                    .addField('Status', 'Validé ✅', true)

                m.edit({
                    embeds: [embedValide],
                });

                interaction.editReply({
                    content: "Votre propal a bien été validée !",
                });
                
                //check if arg bot or normale
                if(args[0] === 'normale') {
                    const channel = client.channels.cache.get(`908350096540844032`) as TextChannel;
                    channel.send({
                        embeds: [embedValide],
                    });
                }


            });
        });
        
    }

} as ICommand