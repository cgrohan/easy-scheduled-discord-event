# Add Discord events from CSV
Are you tired of adding Discord events by hand? This project can potentially help you.
Write your events as a CSV file and insert them all at once.
## Requirements
* Node.js (v16.11.0 or higher)
* [Configure your app bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html) on [Discord Developer Portal](https://discord.com/developers/applications)
* [Add your app bot in your Discord](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links)
### It's very simple
1. Clone the project (or download it)
```
git clone https://github.com/cgrohan/easy-scheduled-discord-event.git
```
2. Open the folder with your favorite IDE (like vscode) initialize the project and install all dependencies :
```
npm init -y
npm install discord.js
npm install csv-parser
```
3. Configure the config.json file :
```
{
  "token": "token_bot_from_discord_developers_portal",
  "clientId": "application_id_bot_from_developers_portal",
  "guildId": "discord_server_id"
}
```
4. Add events in data.csv file :
```
name,image,description,scheduled_start_time,scheduled_end_time,entity_metadata
event example,images/image-example.jpg,description example,2024-12-11T16:00,2024-12-11T20:00,location example
```
5. Run your app in terminal :
```
node index.js
```
6. Go in your Discord Server and run the following command :
```
/event
```
### Information
* The events will be added 5 by 5. 
* You can add a maximum of 100.
* [To change the type of the guild scheduled event](https://discord-api-types.dev/api/discord-api-types-v10/enum/GuildScheduledEventEntityType)
  - If you choose StageInstance or Voice, channel option is required.
