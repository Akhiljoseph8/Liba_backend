const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'akhiljosephaj85@gmail.com',
    pass: 'rzmf jpzd uegf jbhm', // Use environment variables for production
  },
});

app.post('/send-mail', async (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: email,
    to: 'akhiljosephaj85@gmail.com',
    subject: `New Contact Message from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to send email' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
