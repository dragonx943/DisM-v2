const {GuildMember, ApplicationCommandOptionType } = require('discord.js');
const {QueryType} = require('discord-player');

module.exports = {
  name: 'play',
  description: 'Thêm 1 yêu cầu vào hàng chờ của Bot (khác với tiếp tục phát)',
  options: [
    {
      name: 'query',
      type: ApplicationCommandOptionType.String,
      description: 'Gõ tên hoặc địa chỉ URL của bài vào đây',
      required: true,
    },
  ],
  async execute(interaction, player) {
    try {
      if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
        return void interaction.reply({
          content: 'Bạn hiện không có mặt ở bất kì kênh thoại nào trong Server này | Mem64i: ❌',
          ephemeral: true,
        });
      }

      if (
        interaction.guild.members.me.voice.channelId &&
        interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
      ) {
        return void interaction.reply({
          content: 'Lỗi: Bạn không ở cùng kênh thoại với Bot! | Mem64i: ❌',
          ephemeral: true,
        });
      }

      await interaction.deferReply();

      const query = interaction.options.getString('query');
      const searchResult = await player
        .search(query, {
          requestedBy: interaction.user,
          searchEngine: QueryType.AUTO,
        })
        .catch(() => {});
      if (!searchResult || !searchResult.tracks.length)
        return void interaction.followUp({content: 'Đã xảy ra lỗi: Không tìm thấy kết quả nào! Có thể lỗi là do máy chủ hoặc bộ nhớ lưu trữ! ❌'});

      const queue = await player.createQueue(interaction.guild, {
        ytdlOptions: {
				quality: "highestaudio",
				filter: "audioonly",
        fmt: "mp3",
        opusEncoded: true,
				highWaterMark: 1 << 25,
				dlChunkSize: 0,
			},
        metadata: interaction.channel,
      });

      try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);
      } catch {
        void player.deleteQueue(interaction.guildId);
        return void interaction.followUp({
          content: 'Lỗi: Không đủ quyền hoặc không thể truy cập kênh thoại mà bạn tham gia!',
        });
      }

      await interaction.followUp({
        content: `**W**: Đang tải và phân tích dữ liệu ${searchResult.playlist ? 'playlist' : 'track'} của bạn... | Mem64i: ⏱`,
      });
      searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
      if (!queue.playing) await queue.play();
    } catch (error) {
      console.log(error);
      interaction.followUp({
        content: 'Đã xảy ra lỗi khi thực thi lệnh này, bản log test thống kê lỗi: ' + error.message,
      });
    }
  },
};
