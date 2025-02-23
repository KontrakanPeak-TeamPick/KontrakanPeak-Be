const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

console.log("SMTP Config:", process.env.SMTP_HOST, process.env.SMTP_PORT, process.env.SMTP_USER, process.env.SMTP_PASS);


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure:process.env.SMTP_PORT == 465,
  auth: {
      user: "aanvinanta5@gmail.com",
      pass: "uundhuevwmghciao",
  },
  tls: {
    rejectUnauthorized: false, // Tambahkan ini untuk mengatasi SSL error
  },
});

const sendOtpEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  });
};

module.exports = sendOtpEmail;