require('dotenv').config();
const express = require('express');
const twilio = require('twilio');

const app = express();
app.use(express.json());

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// POST /send-whatsapp
app.post('/send-whatsapp', async (req, res) => {
  try {
    const { to, contentSid, variables } = req.body;

    const message = await client.messages.create({
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${to}`,
      contentSid,
      contentVariables: JSON.stringify(variables),
    });

    console.log('✅ WhatsApp sent:', message.sid);
    res.status(200).json({ sid: message.sid });
  } catch (err) {
    console.error('❌ Error sending message:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 WhatsApp server running on http://localhost:${PORT}`);
});
