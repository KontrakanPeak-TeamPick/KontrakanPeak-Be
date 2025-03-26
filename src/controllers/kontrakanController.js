const Kontrakan = require("../models/KontrakanModel");
const Wifi = require("../models/WifiModel");
const { v4: uuidv4 } = require("uuid");
const UserKontrakan = require("../models/MemberModel");

const createKontrakan = async (req, res) => {
  try {
    console.log("User data from request:", req.user); // Debugging
  

    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "User ID not found" });
    }
    


    const { name, address, masaKontrak, wifi_ssid, wifi_password } = req.body;
    const kontrakanId = uuidv4();
    const user_id = req.user.id; // Ambil user_id setelah pengecekan

    // Simpan kontrakan ke database
    const newKontrakan = await Kontrakan.create({
      id: kontrakanId,
      name,
      address,
      masa_kontrak: masaKontrak,
    });

    // Simpan informasi WiFi jika ada
    if (wifi_ssid && wifi_password) {
      await Wifi.create({
        kontrakan_id: newKontrakan.id,
        ssid: wifi_ssid,
        password: wifi_password,
      });
    }

    await UserKontrakan.create({
      id: uuidv4(),
      user_id: user_id,
      kontrakan_id: kontrakanId,
      role: "admin",
    });

    return res.status(201).json({
      message: "Kontrakan berhasil dibuat",
      kontrakanId: kontrakanId,
      kontrakan: newKontrakan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createKontrakan };
