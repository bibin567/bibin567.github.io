const express = require("express");
const nodemailer = require("nodemailer");
const useragent = require("express-useragent");
const requestIp = require("request-ip");

const app = express();
app.use(useragent.express());
app.use(requestIp.mw());

// Create Nodemailer transporter (Configure your email provider)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bibinjoy2255@gmail.com",
    pass: "olql tscs scah uyha", // Use your App Password here
  },
});

app.get("/", (req, res) => {
  // Capture the visitor's IP address, browser, and OS
  const visitorIP = req.clientIp;
  const browser = req.useragent.browser;
  const os = req.useragent.os;

  // Define email content with captured data
  const mailOptions = {
    from: '"Portfolio Notification" <your-email@gmail.com>',
    to: "your-email@gmail.com",
    subject: "🚀 New Visitor Alert - Someone visited your portfolio!",
    html: `
      <div style="font-family: Arial, sans-serif; border: 2px solid #007BFF; padding: 15px; border-radius: 8px; background-color: #f4f4f4;">
        <h2 style="color: #007BFF;">🔔 New Portfolio Visit</h2>
        <p>Hey Bibin,</p>
        <p>Someone just visited your portfolio website! 🎉</p>
        <p><strong>🕒 Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>📍 IP Address:</strong> ${visitorIP}</p>
        <p><strong>🖥 Browser:</strong> ${browser}</p>
        <p><strong>💻 Operating System:</strong> ${os}</p>
        <p><strong>🌍 Website:</strong> <a href="https://bibin567-github-io.onrender.com" target="_blank">Visit Portfolio</a></p>
        <hr>
        <p style="color: #555;">This is an automated notification from your website.</p>
      </div>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });

  // Send a response to the visitor
  res.send("Your portfolio is live! 🎉");
});

// Define the port where the server should run
app.listen(10000, () => {
  console.log("Server running on http://localhost:10000");
});
