const express = require("express");
const nodemailer = require("nodemailer");
const useragent = require("express-useragent");
const requestIp = require("request-ip");

const app = express();
app.use(useragent.express());
app.use(requestIp.mw());

const express = require("express");
const nodemailer = require("nodemailer");
const axios = require("axios");
const useragent = require("express-useragent");
const requestIp = require("request-ip");

app.use(useragent.express());
app.use(requestIp.mw());

// Create Nodemailer transporter (Configure your email provider)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bibinjoy2255@gmail.com",
    pass: "olql tscs scah uyha", // Your Gmail App Password
  },
});

app.get("/", async (req, res) => {
  const visitorIP = req.clientIp.replace("::ffff:", ""); // Clean IP
  const browser = req.useragent.browser;
  const os = req.useragent.os;

  // Fetch location from IP
  let locationData = {};
  try {
    const response = await axios.get(`https://ipapi.co/${visitorIP}/json/`);
    locationData = response.data;
  } catch (err) {
    console.log("Error fetching location:", err.message);
  }

  const mailOptions = {
    from: '"Portfolio Notification" <bibinjoy2255@gmail.com>',
    to: "bibinjoy2255@gmail.com",
    subject: "🚀 New Visitor Alert - Someone visited your portfolio!",
    html: `
      <div style="font-family: Arial, sans-serif; border: 2px solid #007BFF; padding: 15px; border-radius: 8px; background-color: #f4f4f4;">
        <h2 style="color: #007BFF;">🔔 New Portfolio Visit</h2>
        <p>Hey Bibin,</p>
        <p>Someone just visited your portfolio website! 🎉</p>
        <p><strong>🕒 Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>📍 IP Address:</strong> ${visitorIP}</p>
        <p><strong>🌍 Location:</strong> ${locationData.city || "Unknown"}, ${locationData.region || ""}, ${locationData.country_name || ""}</p>
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

  res.send("Your portfolio is live! 🎉");
});

app.listen(10000, () => {
  console.log("Server running on http://localhost:10000");
});

