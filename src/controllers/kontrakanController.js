const Kontrakan = require("../models/KontrakanModel");
const Wifi = require("../models/WifiModel");
const { v4: uuidv4 } = require("uuid");
const UserKontrakan = require("../models/MemberModel");
const KontakInfo = require("../models/KontakInfgoModel");
const GroupLink = require("../models/GroupLinkModel");

const generateKodeUnik = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit angka acak
};

const createKontrakan = async (req, res) => {
  try {

    const { name, address, masaKontrak, wifi_ssid, wifi_password, kontak, group_links} = req.body;
    const kontrakanId = uuidv4();
    const user_id = req.user.id; 

  
    const newKontrakan = await Kontrakan.create({
      id: kontrakanId,
      name,
      address,
      masa_kontrak: masaKontrak,
    });

    if (wifi_ssid && wifi_password) {
      await Wifi.create({
        kontrakan_id: newKontrakan.id,
        ssid: wifi_ssid,
        password: wifi_password,
      });
    }

    // Simpan lebih dari satu kontak (jika ada)
    if (Array.isArray(kontak) && kontak.length > 0) {
      const kontakData = kontak.map((item) => ({
        kontrakan_id: newKontrakan.id,
        nama: item.nama,
        no_hp: item.no_hp,
      }));
      await KontakInfo.bulkCreate(kontakData);
    }

     // Simpan link grup (jika ada)
     if (Array.isArray(group_links) && group_links.length > 0) {
      const groupData = group_links.map((item) => ({
        kontrakan_id: newKontrakan.id,
        nama_grup: item.nama_grup,
        link_grup: item.link_grup,
      }));
      await GroupLink.bulkCreate(groupData);
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
