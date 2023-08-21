const {GuildMember} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'queue',
    description: 'Xem hàng chờ!',
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        const queue = useQueue(interaction.guild.id)
        if (typeof (queue) != 'undefined') {
            const trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
            return void interaction.reply({
                embeds: [
                    {
                        title: 'Hàng chờ',
                        description: trimString(`Yêu cầu đang được phát bây giờ là 🎶 **${queue.currentTrack.title}**! \n 🎶 ${queue}! `, 4095),
                    }
                ]
            })
        } else {
            return void interaction.reply({
                content: 'Hàng chờ rỗng!'
            })
        }
    }
}
