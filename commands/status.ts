import { ICommand } from "wokcommands";

export default {
    category: "configuration",
    description: "Set the bot status",

    minArgs: 1,
    expectedArgs: "<status>",

    slash: true,
    testOnly: true,

    ownerOnly: true,

    callback: ({ client, text, interaction }) => {
        //set presence
        client.user?.setPresence({
            status: "dnd",
            activities: [{ name: text }],
        })

        interaction.reply({
            content:"Status mis à jour: " + text,
            ephemeral: true
        })
    },
} as ICommand