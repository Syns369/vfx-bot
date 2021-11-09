import { Client } from "discord.js";

export default (client:Client) => {
    const statusOptions = [
        `J'adore Jc !`,
        'Je mange des dindons',
        'Je suis un bot',
        'Ouai',
    ];

    const statusType = [
        "PLAYING",
        "STREAMING",
        "LISTENING",
        "WATCHING",
    ];

    let statusIndex = 0;

    const updateStatus = () => {
        client.user?.setPresence({
            status: 'online',
            activities: [
                {
                    name: statusOptions[statusIndex],
                    type: statusType[Math.floor(Math.random() * statusType.length)] as any,
                },
            ]
        });
        
        if (++statusIndex === statusOptions.length) statusIndex = 0;
        
        setTimeout(updateStatus, 1000 * 5);
    }
    updateStatus();
}

export const config ={
    dbName: "STATUS_CHANGER",
    displayName: "Status Changer",
}