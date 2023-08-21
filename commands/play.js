const {GuildMember, ApplicationCommandOptionType} = require('discord.js');
const {QueryType, useMainPlayer} = require('discord-player');
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'play',
    description: 'Phát nhạc trên kênh Voice!',
    options: [
        {
            name: 'query',
            type: ApplicationCommandOptionType.String,
            description: 'Gửi Link hoặc tên bài nhạc bạn muốn phát!',
            required: true,
        },
    ],
    async execute(interaction) {
        try {
            const inVoiceChannel = isInVoiceChannel(interaction)
            if (!inVoiceChannel) {
                return
            }

            await interaction.deferReply();

            const player = useMainPlayer()
            const query = interaction.options.getString('query');
            const searchResult = await player.search(query)
            if (!searchResult.hasTracks())
                return void interaction.followUp({content: 'Không có kết quả tìm kiếm!'});

            try {
                const res = await player.play(interaction.member.voice.channel.id, searchResult, {
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username
                        },
                        leaveOnEmptyCooldown: 300000,
                        leaveOnEmpty: true,
                        leaveOnEnd: false,
                        bufferingTimeout: 0,
                        volume: 75,
                        quality: "highestaudio",
				        filter: "audioonly",
                        fmt: "mp3",
                        opusEncoded: true,
                        highWaterMark: 1 << 25,
				        dlChunkSize: 0,
                        // defaultFFmpegFilters: ['lofi', 'bassboost', 'normalizer']
                    }
                });

                await interaction.followUp({
                    content: `🤖 Đã nhận lệnh từ người dùng, đang xử lí...`,
                });
            } catch (error) {
                await interaction.editReply({
                    content: 'Đã có lỗi xảy ra!'
                })
                return console.log(error);
            }
        } catch (error) {
            await interaction.reply({
                content: 'Đã có lỗi xảy ra khi thực thi: ' + error.message,
            });
        }
    },
};
