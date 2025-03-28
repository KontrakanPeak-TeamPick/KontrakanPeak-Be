const KontakInfo = require("../models/KontakInfgoModel");

const addKontak = async (req, res) => {
  try {
    const { kontrakan_id, nama, no_hp } = req.body;

    if (!kontrakan_id) {
      return res.status(400).json({ message: "Kontrakan ID diperlukan" });
    }

    const newKontak = await KontakInfo.create({
      kontrakan_id,
      nama,
      no_hp,
    });

    return res.status(201).json({
      message: "Kontak berhasil ditambahkan",
      kontak: newKontak,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addKontak };
