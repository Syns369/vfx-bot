import { Message, MessageReaction, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: "collector",
    description: "Collects data from the user",

    callback: async ({ message, channel }) => {
        message.reply("Please confirm reaction");
        message.react("✅");

        // const filter = (m: Message) => m.author.id === message.author.id;
        // const collector = channel.createMessageCollector({
        //     filter,
        //     max: 1,
        //     time: 5 * 1000,
        // })

        const filter = (reaction: MessageReaction, user: User) => {
            return user.id === message.author.id;
        }

        const collector = message.createReactionCollector({
            filter,
            max: 1,
            time: 5 * 1000,
        })

        collector.on("collect", (reaction) => {
            console.log(reaction.emoji);
        });

        collector.on("end", collected => {
            
            if (collected.size === 0) {
                message.reply("You did not react in time !");
                return;
            }

            let text = 'Collected:\n\n'

            collected.forEach(m => {
                text += `${m.emoji.name}\n`
            });

            message.reply(text);
        });
    }
} as ICommand