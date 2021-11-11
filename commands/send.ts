import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Sends a message.',

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],

    slash: true,
    testOnly: true,
    guildOnly: true,

    // ownerOnly: true,

    callback: ({ interaction, args }) => {
        const channel =  interaction.options.getChannel('channel') as TextChannel;

        args.shift();
        const text = args.join(' ');

        channel.send(text);

        interaction.reply({
            content: `Sent message to ${channel.name}`,
            ephemeral: true
        })
        
    }
} as ICommand