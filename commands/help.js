const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'Hiện toàn bộ câu lệnh.',
    execute(interaction) {
        let str = '';
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`./${file}`);
            str += `Tên lệnh: ${command.name}. Mô tả: ${command.description} \n`;
        }

        return void interaction.reply({
            content: str,
            ephemeral: true,
        });
    },
};
