const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const exampleEmbed = new EmbedBuilder()
	.setTitle('Book title')
	.setURL('https://app.thestorygraph.com/')
	.setDescription('Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general—also known as her tough-as-talons mother—has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders. ')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Author', value: 'Brando Sando' },
		{ name: 'Genres', value: 'fiction, fantasy, romance' },
		{ name: 'Pages', value: '528', inline: true },
		{ name: 'Rating', value: '4.48', inline: true },
		{ name: 'Published', value: '2023', inline: true },
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription('Search for a book title'),
	async execute(interaction) {
		await interaction.reply({ embeds: [exampleEmbed] });
	},
};