const {GuildMember, ApplicationCommandOptionType} = require('discord.js');
const {QueueRepeatMode, useQueue} = require('discord-player');
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'loop',
    description: 'Set chế độ lặp lại',
    options: [
        {
            name: 'mode',
            type: ApplicationCommandOptionType.Integer,
            description: 'Chọn kiểu lặp',
            required: true,
            choices: [
                {
                    name: 'Tắt',
                    value: QueueRepeatMode.OFF,
                },
                {
                    name: 'Track',
                    value: QueueRepeatMode.TRACK,
                },
                {
                    name: 'Hàng chờ',
                    value: QueueRepeatMode.QUEUE,
                },
                {
                    name: 'Tự động phát',
                    value: QueueRepeatMode.AUTOPLAY,
                },
            ],
        },
    ],
    async execute(interaction) {
        try {
            const inVoiceChannel = isInVoiceChannel(interaction)
            if (!inVoiceChannel) {
                return
            }

            await interaction.deferReply();

            const queue = useQueue(interaction.guild.id)
            if (!queue || !queue.currentTrack) {
                return void interaction.followUp({content: '❌ | No music is being played!'});
            }

            const loopMode = interaction.options.getInteger('mode');
            queue.setRepeatMode(loopMode);
            const mode = loopMode === QueueRepeatMode.TRACK ? '🔂' : loopMode === QueueRepeatMode.QUEUE ? '🔁' : '▶';

            return void interaction.followUp({
                content: `${mode} Đã cập nhật chế độ lặp!`,
            });
        } catch (error) {
            console.log(error);
            return void interaction.followUp({
                content: 'Đã xảy ra lỗi khi thực thi: ' + error.message,
            });
        }
    },
};
