const { getClient } = require('../lib/discord-bot');

module.exports = async (req, res) => {
  await getClient();
  res.status(200).json({ status: 'Bot pinged' });
};
