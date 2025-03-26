const speakeasy = require("speakeasy");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const OTP = require("../models/OtpModel");
const User = require("../models/UserModels");
const sendOtpEmail = require("../config/emailConfig");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");


const register = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Cek apakah user sudah terdaftar
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Simpan user baru
      user = await User.create({
        id: uuidv4(),
        username,
        email,
      });
    }

    // Generate OTP
    const otp = speakeasy.totp({
      secret: process.env.OTP_SECRET || speakeasy.generateSecret().base32,
      digits: 6,
      encoding: "base32",
    });

    const hashedOtp = await bcrypt.hash(otp, 10);

    await OTP.create({
      email,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 menit
    });

    const emailSent = await sendOtpEmail(email, otp);
    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    res.json({ message: "OTP sent to email", user });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const latestOtp = await OTP.findOne({
      where: { email },
      order: [["createdAt", "DESC"]],
    });

    if (!latestOtp) {
      return res.status(400).json({ message: "OTP not found" });
    }

    // // Debugging log setelah latestOtp ditemukan
    // console.log("Current Time:", new Date());
    // console.log("OTP Expiry Time:", latestOtp.expiresAt);

    if (new Date() > latestOtp.expiresAt) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp, latestOtp.otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Ambil user dari database berdasarkan email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Buat token dengan `id` dan `email`
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await OTP.destroy({ where: { email } });

    res.json({ message: "OTP Verified", token });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res
      .status(500)
      .json({ message: "Error verifying OTP", error: error.message });
  }
};

module.exports = { register, login };
