module.exports = {
  name: 'purge',
  description: 'Xóa tin nhắn ở kênh chat nào đó.',
  options: [
    {
      name: 'num',
      type: 4, //'INTEGER' Type
      description: 'Điền số lượng tin nhắn mà bạn muốn xóa (tối đa: 100)',
      required: true,
    },
  ],
  async execute(interaction) {
    const deleteCount = interaction.options.get('num').value;

    if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
      return void interaction.reply({
        content: `Làm ơn, hãy chọn số bất kì từ 2 đến 100 để tiếp tục lệnh xóa tin nhắn!`,
        ephemeral: true,
      });
    }

    const fetched = await interaction.channel.messages.fetch({
      limit: deleteCount,
    });

    interaction.channel
      .bulkDelete(fetched)
      .then(() => {
        interaction.reply({
          content: `**W** - **M**: Đã xóa tin nhắn thành công!`,
          ephemeral: true,
        });
      })
      .catch(error => {
        interaction.reply({
          content: `Đã xảy ra lỗi khi thực thi lệnh này, đây là bản log test thống kê lỗi: ${error}`,
          ephemeral: true,
        });
      });
  },
};
