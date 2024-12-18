const { sendMessage } = require('../lib/discord-bot');

module.exports = async (req, res) => {
  let name, message;

  if (req.method === 'GET') {
    name = req.query.name;
    message = req.query.message;
  } else if (req.method === 'POST') {
    const body = req.body;
    name = body.name;
    message = body.message;
  }

  if (!name || !message) {
    return res.status(400).json({ status: 'error', message: 'Name dan message harus disediakan' });
  }

  try {
    await sendMessage(process.env.DISCORD_CHANNEL_ID, `Pesan baru dari ${name}: ${message}`);
    res.status(200).json({ status: 'success', message: 'Pesan berhasil dikirim ke Discord' });
  } catch (error) {
    console.error('Error sending message to Discord:', error);
    res.status(500).json({ status: 'error', message: 'Gagal mengirim pesan ke Discord' });
  }
};
