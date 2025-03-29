const express = require("express");
const { getUsers } = require("../controllers/Users");
const { login, register, login2 } = require("../controllers/authController");
const { createKontrakan } = require("../controllers/kontrakanController");
const { addKontak } = require("../controllers/kontakController");
const { addGroupLink } = require("../controllers/groupLinkController");
const verifyToken = require("../middleware/authMiddleware");
const {
  createPayment,
  getAllPayments,
  updatePaymentStatus,
  deletePayment,
} = require("../controllers/keuanganController");
const { isAdmin } = require("../controllers/adminController");

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/createKon", verifyToken, createKontrakan);
router.post("/login2", verifyToken, login2);
router.post("/addKontak", verifyToken, addKontak);
router.post("/addGroupLink", verifyToken, addGroupLink);
router.post("/addkas", verifyToken, createPayment);
router.post("/users", getUsers);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
