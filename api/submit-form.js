const { getClient } = require('../lib/discord-bot');

module.exports = async (req, res) => {
  try {
    const client = await getClient();
    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);

    const { caption, imageUrl } = req.body;

    if (!caption || !imageUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await channel.send({
      content: caption,
      files: [imageUrl]
    });

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
