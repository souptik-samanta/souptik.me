const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Create transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Setup email data
  let mailOptions = {
    from: '"Souptik Samanta" <souptik@souptik.me>', // sender address
    to: email, // list of receivers
    subject: 'Thank you for contacting Souptik Samanta!', // Subject line
    text: `Hello ${name},\n\nThank you for reaching out to me. I have received your message:\n\n"${message}"\n\nI will get back to you as soon as possible.\n\nBest regards,\nSouptik Samanta`, // plain text body
    html: `<p>Hello ${name},</p><p>Thank you for reaching out to me. I have received your message:</p><p>"${message}"</p><p>I will get back to you as soon as possible.</p><p>Best regards,<br>Souptik Samanta</p>` // html body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.json({ message: 'Failed to send email', error: error.toString() });
    }
    res.json({ message: 'Email sent successfully!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});