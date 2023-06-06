const {GuildMember, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'move',
  description: 'Di chuyển vị trí ưu tiên trong hàng chờ!',
  options: [
    {
      name: 'track',
      type: ApplicationCommandOptionType.Integer,
      description: 'Chọn vị trí bài mà bạn muốn thay đổi thứ tự',
      required: true,
    },
    {
      name: 'position',
      type: ApplicationCommandOptionType.Integer,
      description: 'Di chuyển đến vị trí ?',
      required: true,
    },
  ],
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: 'Bắt buộc: Bạn phải tham gia vào kênh thoại! | Mem64: Không phát hiện người dùng!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
    ) {
      return void interaction.reply({
        content: 'Bắt buộc: Bạn phải tham gia cùng kênh thoại với Bot | Mem64i: ❌',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({content: 'Lỗi: Không có yêu cầu trong hàng chờ | Mem64i: ❌'});
    const queueNumbers = [interaction.options.getInteger('track') - 1, interaction.options.getInteger('position') - 1];
    if (queueNumbers[0] > queue.tracks.length || queueNumbers[1] > queue.tracks.length)
      return void interaction.followUp({content: 'Lỗi: Vượt quá số thứ tự mà hàng chờ hiện có! | Mem64i: ❌'});

    try {
      const track = queue.remove(queueNumbers[0]);
      queue.insert(track, queueNumbers[1]);
      return void interaction.followUp({
        content: `Đã di chuyển: **${track}**! | Mem64i: ✅`,
      });
    } catch (error) {
      console.log(error);
      return void interaction.followUp({
        content: 'Lỗi: Đã xảy ra sự cố! | Mem64i: ❌',
      });
    }
  },
};
