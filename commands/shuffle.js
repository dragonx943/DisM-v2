const {GuildMember} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'shuffle',
    description: 'Random hàng chờ của Bot!',
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id)
        if (!queue || !queue.currentTrack) return void interaction.followUp({content: '❌ Hàng chờ đang trống!'});
        try {
            queue.tracks.shuffle();
            const trimString = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
            return void interaction.followUp({
                embeds: [
                    {
                        title: 'Hàng chờ',
                        description: trimString(
                            `Yêu cầu đang phát ngay lúc này là 🎶 **${queue.currentTrack.title}**! \n 🎶 ${queue}! `,
                            4095,
                        ),
                    },
                ],
            });
        } catch (error) {
            console.log(error);
            return void interaction.followUp({
                content: '❌ Có gì đó sai sai, báo lại cho Admin ngay!',
            });
        }
    },
};
