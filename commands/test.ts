import { ButtonInteraction, Interaction, MessageActionRow, MessageButton, MessageComponentInteraction } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Testing',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt, channel}) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ban_yes')
                    .setEmoji('❤')
                    .setLabel('Confirm')
                    .setStyle('SUCCESS')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('ban_no')
                    .setLabel('Cancel')
                    .setStyle('DANGER')
            )
        
        const linkRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('https://img-4.linternaute.com/rvZoqScZYxmiYjHKyfYNEbOHOyw=/1500x/smart/c31b409149eb4eb1980f18cc439000ab/ccmcms-linternaute/13717714.jpg')
                    .setLabel('Visit @Daraminix#0877')
                    .setStyle('LINK')
            )
        
        await msgInt.reply({
            content: 'Are you sure?',
            components: [row, linkRow],
            ephemeral: true,
        })

        const filter = (btnInt: Interaction ) => {
            return msgInt.user.id === btnInt.user.id
        }

        const collector = channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 1000 * 15,

        })

        // collector.on('collect', (i: MessageComponentInteraction ) => {
        //     i.reply({
        //         content: 'you cliked a button !',
        //         ephemeral: true,

        //     })
        // })

        collector.on('end', async (collection) => {
            collection.forEach((click) => {
                console.log(click.user.id, click.customId);
            })

            if (collection.first()?.customId === 'ban_yes') {
                //
            }

            await msgInt.editReply({
                content: 'An action has already been taken.',
                components: []
            })
        })
    }
} as ICommand