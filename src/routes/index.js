const express = require("express");
const { getUsers } = require("../controllers/Users"); // Pastikan ini destructuring {}
const { sendOtp, verifyOtp } = require("../controllers/authController"); // Pastikan ini destructuring {}

const router = express.Router();

router.get("/users", getUsers); // Pastikan hanya memanggil fungsi, bukan objek
router.post("/users", getUsers); 
router.post("/register", sendOtp); 
router.post("/cek", verifyOtp)

module.exports = router;
