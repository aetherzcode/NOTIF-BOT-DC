const { getClient } = require('../lib/discord-bot');

module.exports = async (req, res) => {
  try {
    const client = await getClient();
    const status = {
      connected: client.isReady(),
      user: client.user ? client.user.tag : null,
      guilds: client.guilds.cache.size,
      lastChecked: new Date().toISOString()
    };
    res.status(200).json(status);
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
