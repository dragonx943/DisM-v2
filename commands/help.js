const fs = require('fs');

module.exports = {
  name: 'help',
  description: 'Liệt kê tất cả các lệnh mà con Bot này cung cấp. Dịch vụ từ Team DisM.',
  execute(interaction) {
    let str = '';
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`./${file}`);
      str += `**Tên lệnh**: ${command.name}, **Chức năng**: ${command.description} \n`;
      sir = 'Đây là tất cả các lệnh mà con Bot này có thể làm, vui lòng tham khảo rõ chức năng của từng câu lệnh!\n';
      yes = 'Số lệnh đã được thiết lập sẵn: **18**. Dấu lệnh: **/**. Engine: **Discord.js v14**, **Mem64 - Mem64i**\n';
    }

    return void interaction.reply({
      content: sir,
      content: yes,
      content: str,
      ephemeral: true,
    });
  },
};
