const Kontrakan = require("../models/KontrakanModel");
const Wifi = require("../models/WifiModel");

const createKontrakan = async (req, res) => {
  try {
    const { name, address, masaKontrak, wifi_ssid, wifi_password } = req.body;

    // Simpan kontrakan ke database (UUID dibuat otomatis)
    const newKontrakan = await Kontrakan.create({
      name,
      address,
      masa_kontrak: masaKontrak,
    });

    // Simpan informasi WiFi jika ada
    if (wifi_ssid && wifi_password) {
      await Wifi.create({
        kontrakan_id: newKontrakan.id, // Ambil UUID dari model
        ssid: wifi_ssid,
        password: wifi_password,
      });
    }

    return res.status(201).json({
      message: "Kontrakan berhasil dibuat",
      kontrakan: newKontrakan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createKontrakan };
