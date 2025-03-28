const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Wifi = require("./WifiModel");
const KontakInfo = require("./KontakInfgoModel"); // Pastikan ini benar

const Kontrakans = db.define(
  "kontrakans",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    masa_kontrak: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jadwal: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

// Relasi dengan Wifi
Kontrakans.hasMany(Wifi, { foreignKey: "kontrakan_id" });
Wifi.belongsTo(Kontrakans, { foreignKey: "kontrakan_id" });

// Relasi dengan KontakInfo
Kontrakans.hasMany(KontakInfo, { foreignKey: "kontrakan_id" });
KontakInfo.belongsTo(Kontrakans, { foreignKey: "kontrakan_id" });

module.exports = Kontrakans;
