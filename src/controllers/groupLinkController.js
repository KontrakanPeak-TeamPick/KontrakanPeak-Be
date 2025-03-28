const GroupLink = require("../models/GroupLinkModel");

const addGroupLink = async (req, res) => {
  try {
    const { kontrakan_id, nama_grup, link_grup } = req.body;

    if (!kontrakan_id) {
      return res.status(400).json({ message: "Kontrakan ID diperlukan" });
    }

    const newGroupLink = await GroupLink.create({
      kontrakan_id,
      nama_grup,
      link_grup,
    });

    return res.status(201).json({
      message: "Link grup berhasil ditambahkan",
      group_link: newGroupLink,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addGroupLink };
