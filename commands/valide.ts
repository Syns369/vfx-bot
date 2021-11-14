import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: "Propal",
    description: "Valide une propal",

    slash: true,
    testOnly: true,
    guildOnly: true,
    ownerOnly: true,

    hidden: true,

    options: [
        {
            name: "messageid",
            description: "L'id de la propal à valider",
            required: true,
            type: "STRING"
        },
        {
            name: 'type',
            description: 'Le type de la propal',
            required: true,
            type: 'STRING',
            choices: [
                {
                    name: 'Bot', value: 'bot'
                },
                {
                    name: 'Normale', value: 'normale'
                },
            ]
        } 
    ],
    
    callback: ({interaction ,message, args, client}) => {

        const messageId = args[0];

        interaction.channel?.messages.fetch(messageId).then(message => {
            // const newDescription = `~~${message.embeds[0].description}~~`;

            //remove field
            message.embeds[0].fields = [];
            
            const embedValide = message.embeds[0]
                .setColor("#00ff00")
                // .setDescription(newDescription)
                .addField('Status', 'Validé ✅', true)

            message.edit({
                embeds: [embedValide],
            });

            if(args[1] === 'normale') {
                const channel = client.channels.cache.get(`908500208034394173`) as TextChannel;
                channel.send({
                    embeds: [embedValide],
                });
            }
        });

        interaction.reply({
            content: `Propal validé !`,
            ephemeral: true,
        });


    }

} as ICommand