require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { connect } = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files
app.use(express.static('public'));

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Handle form submissions
app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save to MongoDB
    const db = await connect();
    const result = await db.collection('submissions').insertOne({ name, email, message, date: new Date() });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully!', id: result.insertedId });
  } catch (error) {
    console.error('Error saving submission or sending email:', error);
    res.status(500).json({ message: 'Failed to send message.' });
  }
});

// Fetch all submissions
app.get('/submissions', async (req, res) => {
  try {
    const db = await connect();
    const submissions = await db.collection('submissions').find().sort({ date: -1 }).toArray();
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Failed to fetch submissions.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});