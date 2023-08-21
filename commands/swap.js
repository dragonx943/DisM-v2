const {GuildMember, ApplicationCommandOptionType} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'swap',
    description: 'Tráo đổi vị trí trong hàng chờ!',
    options: [
        {
            name: 'track1',
            type: ApplicationCommandOptionType.Integer,
            description: 'Vị trí cần tráo...',
            required: true,
        },
        {
            name: 'track2',
            type: ApplicationCommandOptionType.Integer,
            description: 'Vị trí muốn tráo đến...',
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
        if (!queue || !queue.currentTrack) return void interaction.followUp({content: '❌ Không có bài nào đang phát, hủy lệnh này!'});
        const queueNumbers = [interaction.options.getInteger('track1') - 1, interaction.options.getInteger('track2') - 1];
        // Sort so the lowest number is first for swap logic to work
        queueNumbers.sort(function (a, b) {
            return a - b;
        });
        if (queueNumbers[1] > queue.getSize())
            return void interaction.followUp({content: '❌ Số bài bạn nhập > Số lượng bài có trong hàng chờ!'});

        try {
            const track2 = queue.node.remove(queueNumbers[1]); // Remove higher track first to avoid list order issues
            const track1 = queue.node.remove(queueNumbers[0]);
            queue.node.insert(track2, queueNumbers[0]); // Add track in lowest position first to avoid list order issues
            queue.node.insert(track1, queueNumbers[1]);
            return void interaction.followUp({
                content: `✅ Đã tráo đổi vị trí của **${track1}** với **${track2}**!`,
            });
        } catch (error) {
            console.log(error);
            return void interaction.followUp({
                content: '❌ Có gì đó sai sai!',
            });
        }
    },
};
