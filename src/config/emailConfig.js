const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure:process.env.SMTP_PORT == 465,
  auth: {
      user: "aanvinanta5@gmail.com",
      pass: "uundhuevwmghciao",
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

async function sendOtpEmail(email, otp) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `nih bang otpnya cuma 5 menit ya: ${otp}`,
    });
    return true; // ✅ Tanda sukses
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    return false;
  }
}


module.exports = sendOtpEmail;