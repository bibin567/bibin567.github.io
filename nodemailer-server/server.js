const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 10000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse incoming requests

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bibinjoy2255@gmail.com", // Replace with your email
    pass: "olql tscs scah uyha"   // Replace with your email app password (not your real password!)
  }
});

// Endpoint to send email notification when someone visits
app.get("/", (req, res) => {
  const visitorIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Email content
  const mailOptions = {
    from: "your-email@gmail.com",
    to: "your-email@gmail.com", // You will receive the email
    subject: "Portfolio Visited!",
    text: `Someone visited your portfolio. IP: ${visitorIP}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email.");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email notification sent!");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
