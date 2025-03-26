const express = require("express");
const { getUsers } = require("../controllers/Users"); 
const { login, register } = require("../controllers/authController"); 
const { createKontrakan } = require("../controllers/kontrakanController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/createKon", verifyToken, createKontrakan);
router.post("/users", getUsers); 
router.post("/register", register); 
router.post("/login", login)

module.exports = router;
