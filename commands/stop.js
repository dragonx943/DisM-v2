const {GuildMember} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'stop',
    description: 'Dừng và xóa tất cả bài có trong hàng chờ!',
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id)
        if (!queue || !queue.currentTrack)
            return void interaction.followUp({
                content: '❌ Hàng chờ rỗng, không có bài nào ở đây cả!',
            });
        queue.node.stop()
        return void interaction.followUp({content: '🛑 Đã dừng trình phát nhạc của Bot!'});
    },
};
