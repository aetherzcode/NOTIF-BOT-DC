const { Client, GatewayIntentBits } = require('discord.js');

let client = null;

async function getClient() {
  if (!client) {
    client = new Client({ 
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ] 
    });

    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('interactionCreate', async interaction => {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
      }
    });

    try {
      await client.login(process.env.DISCORD_BOT_TOKEN);
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  }
  return client;
}

module.exports = { getClient };
