const {GuildMember} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'resume',
    description: 'Tiếp tục phát sau khi đã tạm dừng',
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id)
        if (!queue || !queue.currentTrack)
            return void interaction.followUp({
                content: '❌ Hàng chờ rỗng, không có yêu cầu nào!',
            });
        const success = queue.node.resume()
        return void interaction.followUp({
            content: success ? '▶ Tiến hành tiếp tục phát!' : '❌ Có gì đó sai sai, đã xảy ra lỗi!',
        });
    },
};
