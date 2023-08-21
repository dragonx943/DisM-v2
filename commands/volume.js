const {GuildMember, ApplicationCommandOptionType} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'volume',
    description: 'Chỉnh âm lượng',
    options: [
        {
            name: 'volume',
            type: ApplicationCommandOptionType.Integer,
            description: 'Chọn 1 giá trị từ 0 đến 200',
            required: true,
        },
    ],
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);
        if (!queue || !queue.currentTrack)
            return void interaction.followUp({
                content: '❌ Không có nhạc nào trong trình phát, bãi bỏ câu lệnh này!',
            });

        let volume = interaction.options.getInteger('volume');
        volume = Math.max(0, volume);
        volume = Math.min(200, volume);
        const success = queue.node.setVolume(volume);

        return void interaction.followUp({
            content: success ? `🔊 Âm lượng của Bot đã được set thành: ${volume}%` : '❌ Có gì đó sai sai, báo Admin gấp!',
        });
    },
};
