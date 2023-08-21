const {GuildMember} = require('discord.js')
const {useQueue} = require('discord-player')
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'skip',
    description: 'Bỏ qua bài nhạc hiện tại!',
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        await interaction.deferReply();

        const queue = useQueue(interaction.guild.id)
        if (!queue || !queue.currentTrack) return void interaction.followUp({content: '❌ Không có bài nhạc nào đang phát cả!'});
        const currentTrack = queue.currentTrack;

        const success = queue.node.skip()
        return void interaction.followUp({
            content: success ? `✅ Đã bỏ qua **${currentTrack}**!` : '❌ Có gì đó sai sai, báo Admin ngay nào!',
        });
    },
};
