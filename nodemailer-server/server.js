const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Allow cross-origin requests (if your frontend and backend are on different domains)

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Set this in your environment variables
    pass: process.env.GMAIL_PASS, // Use an App Password instead of your actual password
  },
});

// API endpoint to send an email notification when someone visits the portfolio
app.post("/notify", async (req, res) => {
  try {
    const { visitorIP, userAgent } = req.body;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "bibinjoy2255@gmail.com", // Your email address
      subject: "New Portfolio Visit Notification",
      text: `Someone has visited your portfolio.\n\nIP Address: ${visitorIP}\nUser Agent: ${userAgent}\nTime: ${new Date().toLocaleString()}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
