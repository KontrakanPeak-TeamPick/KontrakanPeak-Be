const express = require("express");
const { getUsers } = require("../controllers/Users"); // Pastikan ini destructuring {}
const { login, register } = require("../controllers/authController"); 
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", getUsers); 
router.post("/register", register); 
router.post("/cek", login)

module.exports = router;
