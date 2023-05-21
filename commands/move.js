<<<<<<< HEAD
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
        content: 'You are not in my voice channel!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({content: '❌ | No music is being played!'});
    const queueNumbers = [interaction.options.getInteger('track') - 1, interaction.options.getInteger('position') - 1];
    if (queueNumbers[0] > queue.tracks.length || queueNumbers[1] > queue.tracks.length)
      return void interaction.followUp({content: '❌ | Track number greater than queue depth!'});

    try {
      const track = queue.remove(queueNumbers[0]);
      queue.insert(track, queueNumbers[1]);
      return void interaction.followUp({
        content: `✅ | Moved **${track}**!`,
      });
    } catch (error) {
      console.log(error);
      return void interaction.followUp({
        content: '❌ | Something went wrong!',
      });
    }
  },
};
=======
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
        content: 'You are not in my voice channel!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({content: '❌ | No music is being played!'});
    const queueNumbers = [interaction.options.getInteger('track') - 1, interaction.options.getInteger('position') - 1];
    if (queueNumbers[0] > queue.tracks.length || queueNumbers[1] > queue.tracks.length)
      return void interaction.followUp({content: '❌ | Track number greater than queue depth!'});

    try {
      const track = queue.remove(queueNumbers[0]);
      queue.insert(track, queueNumbers[1]);
      return void interaction.followUp({
        content: `✅ | Moved **${track}**!`,
      });
    } catch (error) {
      console.log(error);
      return void interaction.followUp({
        content: '❌ | Something went wrong!',
      });
    }
  },
};
>>>>>>> 434deaddbaf06720955f149c75b395609b7a7337
