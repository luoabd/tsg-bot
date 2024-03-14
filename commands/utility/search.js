const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');


async function fetchBooksJSON(searchQuery) {
	// TODO: Change api link when ready
	const response = await request(`http://localhost:4001/search?searchQuery=${searchQuery}`);
	const bookInfo = await response.body.json();

	const bookSearch = new EmbedBuilder()
	.setTitle(bookInfo.title)
	.setURL(bookInfo.url)
	.addFields({ name: 'Series', value: bookInfo.series })
	.setDescription(bookInfo.description)
	.setThumbnail(bookInfo.cover)
	.addFields(
		{ name: 'Author', value: bookInfo.author },
		{ name: 'Tags', value: bookInfo.tags},
		{ name: 'Pages', value: bookInfo.pages, inline: true },
		{ name: 'Rating', value: bookInfo.rating, inline: true },
		{ name: 'Published', value: bookInfo.publishDate, inline: true },
	);

	return bookSearch;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription('Search for a book title')
		.addStringOption(option =>
			option.setName('title')
				.setDescription('The book title you want to search for')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
		const searchQuery = interaction.options.getString('title');
		const book = await fetchBooksJSON(searchQuery);
		await interaction.editReply({ embeds: [book] });
	},
};