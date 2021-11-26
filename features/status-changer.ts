import { Client } from "discord.js";

export default (client:Client) => {
    const statusOptions = [
        `J'adore Jc !`,
        'Je mange des dindons',
        'Je suis un bot',
        'Ouai',
        `Si t'as froid met un pull`,
        `C'est forcément plus réaliste quand c'est réel`,
        `Si ta faim faut manger`,
        `Si t'es fatigué faut dormir`,
        `Blender c'est pas maya`,
        `Si il fait chaud, il fait pas froid`,
        `Si il fait froid, il fait pas chaud`,
        `Le feu ça brûle`,
        `L'eau ça mouille`,
        `La pluie ça mouille`,
        `Si t'as zéro, t'as pas la moyenne`,
        `Si tu fume pas, t'as pas de tabac`,
        `Si t'as pas d'argent, t'es pas riche`,
        `Si t'as pas baisé, t'es encore puceau`,
        `Si t'es sur blender, t'as pas besoin de licence`,
        `Le violon, c'est pas une guitare`,
        `Le piano, c'est pas une trompette`,
        `La drogue, ça explique des choses`,
        `Un QWERTY, c'est pas un AZERTY`,
        `Si t'es grand, t'es pas petit`,
        `Si t'es petit, t'es pas très grand`,
        `Si t'es vieux, t'en pas jeune`,
        `Si t'es jeune t'es pas vieux`,
        `Une chaise c'est pas un canapé`,
        `Le riz c'est pas des pâtes`,
        `Les pâtes, c'est pas du riz`,
        `Le sol c'est pas le plafond`,
        `Le café c'est pas du thé`,
        `Le thé c'est pas du café`,
        `Le mont Saint Michel, c'est un morceau de Bretagne en Normandie`,
        `Les crêpes, c'est pas des galettes`,
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