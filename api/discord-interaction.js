const { getClient } = require('../lib/discord-bot');

module.exports = async (req, res) => {
  try {
    const client = await getClient();
    
    if (req.method === 'POST') {
      const { type, data } = req.body;

      if (type === 1) {
        return res.status(200).json({ type: 1 });
      }

      if (type === 2 && data.name === 'ping') {
        await client.emit('interactionCreate', {
          ...req.body,
          reply: async (content) => {
            res.status(200).json({
              type: 4,
              data: { content }
            });
          }
        });
        return;
      }
    }

    res.status(400).json({ error: 'Invalid request' });
  } catch (error) {
    console.error('Interaction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
