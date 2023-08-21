const {GuildMember, ApplicationCommandOptionType} = require('discord.js');
const {QueryType, useQueue, useMainPlayer} = require('discord-player');
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'playtop',
    description: 'Phát 1 yêu cầu nào đó, ưu tiên húp trước!',
    options: [
        {
            name: 'query',
            type: ApplicationCommandOptionType.String,
            description: 'Bỏ Link hoặc tên vào (khuyến khích dùng Link)',
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
            const searchResult = await player
                .search(query, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO,
                })
                .catch(() => {
                });
            if (!searchResult || !searchResult.tracks.length)
                return void interaction.followUp({content: 'Không có kết quả tìm kiếm!'});

            const queue = useQueue(interaction.guild.id)

            try {
                if (!queue.connection) await queue.connect(interaction.member.voice.channel);
            } catch {
                return void interaction.followUp({
                    content: 'Không thể tham gia kênh Voice của bạn!',
                });
            }

            await interaction.followUp({
                content: ``,
            });
            searchResult.playlist ? queue.node.insert(searchResult.tracks, 0) : queue.node.insert(searchResult.tracks[0], 0);
            if (!queue.currentTrack) await player.play();
        } catch (error) {
            console.log(error);
            await interaction.followUp({
                content: 'Đã xảy ra lỗi: ' + error.message,
            });
        }
    },
};
