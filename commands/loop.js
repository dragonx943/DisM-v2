const {GuildMember, ApplicationCommandOptionType} = require('discord.js');
const {QueueRepeatMode} = require('discord-player');

module.exports = {
  name: 'loop',
  description: 'Tùy chỉnh chế độ lặp lại.',
  options: [
    {
      name: 'mode',
      type: ApplicationCommandOptionType.Integer,
      description: 'Chọn kiểu lặp lại.',
      required: true,
      choices: [
        {
          name: 'Off',
          value: QueueRepeatMode.OFF,
        },
        {
          name: 'Track',
          value: QueueRepeatMode.TRACK,
        },
        {
          name: 'Queue',
          value: QueueRepeatMode.QUEUE,
        },
        {
          name: 'Autoplay',
          value: QueueRepeatMode.AUTOPLAY,
        },
      ],
    },
  ],
  async execute(interaction, player) {
    try {
      if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
        return void interaction.reply({
          content: 'Bạn không tham gia bất kì kênh thoại nào, bãi bỏ việc thực thi câu lệnh! | Mem64: Kênh thoại vắng!',
          ephemeral: true,
        });
      }

      if (
        interaction.guild.members.me.voice.channelId &&
        interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
      ) {
        return void interaction.reply({
          content: 'Bắt buộc: Bạn phải chung kênh thoại với Bot! | Mem64: Không tìm thấy người dùng tại kênh thoại!',
          ephemeral: true,
        });
      }

      await interaction.deferReply();

      const queue = player.getQueue(interaction.guildId);
      if (!queue || !queue.playing) {
        return void interaction.followUp({content: 'Bắt buộc: Phải có ít nhất 1 bài đang được phát từ hàng chờ! | Mem64i: ❌'});
      }

      const loopMode = interaction.options.getInteger('mode');
      const success = queue.setRepeatMode(loopMode);
      const mode = loopMode === QueueRepeatMode.TRACK ? '🔂' : loopMode === QueueRepeatMode.QUEUE ? '🔁' : '▶';

      return void interaction.followUp({
        content: success ? `Đã cập nhật chế độ lặp lại! | Mem64i: ${mode}` : 'Không có sự thay đổi trong chế độ lặp lại, bãi bỏ câu lệnh. | Mem64i: ❌',
      });
    } catch (error) {
      console.log(error);
      interaction.followUp({
        content: 'Đã có lỗi xảy ra khi Bot đang cố gắng thực thi câu lệnh: ' + error.message,
      });
    }
  },
};
