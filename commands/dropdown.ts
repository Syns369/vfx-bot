import { Client, GuildMember, Message, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, Role, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Add a role to the auto role message',

    permissions: ['ADMINISTRATOR'],

    // minArgs: 2,
    // maxArgs: 2,
    expectedArgs: '<text>',
    expectedArgsTypes: ['STRING'],

    testOnly: true,
    guildOnly: true,
    slash: false,

    init: (client : Client) => {
        client.on('interactionCreate', interaction => {
            if (!interaction.isSelectMenu()) return;
            const { customId, values, member } = interaction

            if (customId === 'auto_roles' && member instanceof GuildMember) {
                const component = interaction.component as MessageSelectMenu
                const removed = component.options.filter(option => !values.includes(option.value))

                for (const id of removed) {
                    member.roles.remove(id.value)
                }

                for (const id of values) {
                    member.roles.add(id)
                }

                interaction.reply({
                    content: `Ton rôle a été update `,
                    ephemeral: true
                })
            }
        })
        
    },

    callback: async ({ message, args, client }) => {

        //get arg 
        const text = args[0]

        if (text === undefined) {
            return message.reply('Please provide a valid argument')
        }
            
        if (text === 'promo') {
            const option = [
            {
                label: 'PROF',
                description: 'PROF',
                value: '899414061366788116',
                emoji: '👨‍🏫'
            },
            {
                label: 'PROMO 1',
                description: '2017 -> 2020',
                value: '891961391861354536',
                emoji: '🟣'
            },
            {
                label: 'PROMO 2',
                description: '2018 -> 2021',
                value: '891961598313394176',
                emoji: '🔵'
            },
            {
                label: 'PROMO 3',
                description: '2019 -> 2022',
                value: '891961650737999914',
                emoji: '🟢'
            },
            {
                label: 'PROMO 4',
                description: '2020 -> 2023',
                value: '891961719222566962',
                emoji: '🟡'
            },
            {
                label: 'PROMO 5',
                description: '2021 -> 2024',
                value: '891961749337686046',
                emoji: '🟠'
            },
        ]

        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('auto_roles')
					.setPlaceholder('Selectionne ta Promo')
					.addOptions(option)
		    );

        message.channel.send({content:'**SELECTIONNE TA PROMO :**',components: [row]})

        } else if (text === 'notifs') {
            const option = [
                {
                    label: 'Sport',
                    description: 'Pour être notifié des événements sportifs',
                    value: '899413164209344513',
                    emoji: '🎾', 
                },
                {
                    label: 'G@m3rZ',
                    description: 'Pour être notifié des soirées Game',
                    value: '899413326843482163',
                    emoji: '🕹',
                },
                {
                    label: 'Soirées',
                    description: 'Pour être notifié des soirées',
                    value: '899413367926693958',
                    emoji: '🥳',
                },
                {
                    label: 'Challenge',
                    description: 'Pour être notifié des challenges',
                    value: '899421466532151296',
                    emoji: '💪',
                },
            ]

            const row = new MessageActionRow()
			    .addComponents(
				    new MessageSelectMenu()
					    .setCustomId('auto_roles')
					    .setPlaceholder('Choisis tes notifs')
					    .addOptions(option)
                        .setMinValues(0)
                        .setMaxValues(option.length)
		        );

            message.channel.send({content:'**CHOISIS TES NOTIFS :**',components: [row]})
        }   
    }
} as ICommand