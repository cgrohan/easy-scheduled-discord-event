'use strict';

const { SlashCommandBuilder, GuildScheduledEventManager, GuildScheduledEventPrivacyLevel, GuildScheduledEventEntityType } = require('discord.js');
const { guildId } = require('../../config.json');
const fs = require('fs');
const csv = require('csv-parser');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('event')
		.setDescription('Scheduled Discord Event.'),
	category: 'utility',
	async execute(clientId) {
		const guild = await clientId.guild.fetch(guildId);

		if (!guild) {return console.log('Unknown Disocord server.');}

		const event_manager = new GuildScheduledEventManager(guild);

		const donnees = [];
		fs.createReadStream('data.csv')
			.pipe(csv({ delimiter: ',' }))
			.on('data', function(data) {
				donnees.push(data);
			})
			.on('end', async () => {
				for (const donnee in donnees) {

					const name = donnees[donnee]['name'];
					const scheduledStartTime = donnees[donnee]['scheduled_start_time'];
					const scheduledEndTime = donnees[donnee]['scheduled_end_time'];
					const entityMetadata = donnees[donnee]['entity_metadata'];
					const description = donnees[donnee]['description'];
					const image = donnees[donnee]['image'];

					await event_manager.create({
						name: name,
						scheduledStartTime: new Date(scheduledStartTime),
						scheduledEndTime: new Date(scheduledEndTime),
						privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
						entityType: GuildScheduledEventEntityType.External,
						entityMetadata: { location: entityMetadata },
						description: description,
						/* channel option is required if you choose GuildScheduledEventEntityType.StageInstance or
						GuildScheduledEventEntityType.Voice for entityType */
						channel: null,
						image: image,
						reason: description,
					},
					);
				}
			});
	},
};