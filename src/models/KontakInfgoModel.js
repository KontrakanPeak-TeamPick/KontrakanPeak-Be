const { DataTypes } = require("sequelize");
const db = require("../config/db");
const kontrakans = require("./KontrakanModel"); 

const KontakInfo = db.define(
  "kontak_info",
  {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    kontrakan_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "kontrakans", 
        key: "id",
      },
      onDelete: "CASCADE",
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_hp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = KontakInfo;
