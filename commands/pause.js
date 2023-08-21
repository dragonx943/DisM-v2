const {GuildMember} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'pause',
    description: 'Tạm dừng yêu cầu đang được phát!',
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id)
        if (!queue || !queue.currentTrack)
            return void interaction.followUp({
                content: '❌ Không có bài nào để tạm dừng!',
            });
        const success = queue.node.pause()
        return void interaction.followUp({
            content: success ? '⏸ Đã tạm dừng!' : '❌ Có lỗi gì đó sai sai!',
        });
    },
};
