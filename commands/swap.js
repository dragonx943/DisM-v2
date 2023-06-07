const {GuildMember, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'swap',
  description: 'Tráo đổi vị trí hàng chờ của yêu cầu!',
  options: [
    {
      name: 'track1',
      type: ApplicationCommandOptionType.Integer,
      description: 'Số thứ tự hàng chờ của yêu cầu 1 mà bạn muốn tráo',
      required: true,
    },
    {
      name: 'track2',
      type: ApplicationCommandOptionType.Integer,
      description: 'Số thứ tự hàng chờ của yêu cầu 2 mà bạn muốn tráo',
      required: true,
    },
  ],
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: '**E**: Bạn hiện không có mặt ở bất kì kênh thoại nào trong Server này!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
    ) {
      return void interaction.reply({
        content: '**E**: Bạn không ở cùng kênh thoại với Bot! | Mem64i: ❌',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({content: '**E**: Không có yêu cầu nào trong hàng chờ | Mem64i: ❌'});
    const queueNumbers = [interaction.options.getInteger('track1') - 1, interaction.options.getInteger('track2') - 1];
    // Sort so the lowest number is first for swap logic to work
    queueNumbers.sort(function (a, b) {
      return a - b;
    });
    if (queueNumbers[1] > queue.tracks.length)
      return void interaction.followUp({content: '**E**: Số thứ tự của yêu cầu còn cao hơn cả số yêu cầu có trong hàng chờ, bãi bỏ câu lệnh!'});

    try {
      const track2 = queue.remove(queueNumbers[1]); // Remove higher track first to avoid list order issues
      const track1 = queue.remove(queueNumbers[0]);
      queue.insert(track2, queueNumbers[0]); // Add track in lowest position first to avoid list order issues
      queue.insert(track1, queueNumbers[1]);
      return void interaction.followUp({
        content: `**W** - **M**: Đã thay đổi vị trí của **${track1}** và **${track2}** | Mem64i: ✅`,
      });
    } catch (error) {
      console.log(error);
      return void interaction.followUp({
        content: '**E**: Đã có lỗi xảy ra khi Bot đang cố gắng thực thi câu lệnh!',
      });
    }
  },
};
