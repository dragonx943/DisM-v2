const fs = require('fs');

module.exports = {
  name: 'love',
  description: 'Bot và thằng dịch Bot có yêu bạn không?',
  execute(interaction) {
    let str = '';
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`./${file}`);
      yes = 'Tất nhiên là, CÓ CHỨ. Bot và thằng dịch Bot này luôn chào đón và yêu bạn mọi lúc > 3 <\n';
    }

    return void interaction.reply({
      content: yes,
      ephemeral: true,
    });
  },
};