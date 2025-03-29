const Payments = require("../models/PaymentsModel");
const PaymentStatuses = require("../models/PaymentStatusesModel");
const { v4: uuidv4 } = require("uuid");

const createPayment = async (req, res) => {
  try {
    const { kontrakan_id, user_id, amount, description, due_date } = req.body;

    // Pastikan semua data yang wajib tidak kosong
    if (!kontrakan_id || !user_id || !amount) {
      return res
        .status(400)
        .json({ message: "Kontrakan ID, User ID, dan Amount harus diisi!" });
    }

    // Cari status "pending"
    const pendingStatus = await PaymentStatuses.findOne({
      where: { status: "pending" },
    });
    if (!pendingStatus) {
      return res
        .status(500)
        .json({ message: "Status pembayaran 'pending' tidak ditemukan" });
    }

    // Buat pembayaran baru
    const newPayment = await Payments.create({
      id: uuidv4(), // Buat ID unik
      kontrakan_id,
      user_id,
      amount,
      description,
      status_id: pendingStatus.id,
      due_date,
    });

    return res.status(201).json({
      message: "Tagihan berhasil dibuat",
      payment: newPayment,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Ambil semua pembayaran
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payments.findAll({
      include: [{ model: PaymentStatuses, attributes: ["status"] }],
    });
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Update status pembayaran
const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Cek apakah pembayaran ada
    const payment = await Payments.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: "Pembayaran tidak ditemukan" });
    }

    // Cari status baru berdasarkan nama status
    const newStatus = await PaymentStatuses.findOne({ where: { status } });
    if (!newStatus) {
      return res.status(400).json({ message: "Status tidak valid" });
    }

    // Update status pembayaran
    payment.status_id = newStatus.id;
    await payment.save();

    res
      .status(200)
      .json({ message: "Status pembayaran berhasil diperbarui", payment });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Hapus pembayaran (opsional)
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek apakah pembayaran ada
    const payment = await Payments.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: "Pembayaran tidak ditemukan" });
    }

    await payment.destroy();
    res.status(200).json({ message: "Pembayaran berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  updatePaymentStatus,
  deletePayment,
};
