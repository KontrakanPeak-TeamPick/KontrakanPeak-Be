const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Wifi = require("./WifiModel");
const { v4: uuidv4 } = require("uuid");

const Kontrakans = db.define(
  "kontrakans",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull : false,
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
    kontak_info: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wifi: {
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

Kontrakans.hasMany(Wifi, { foreignKey: "kontrakan_id" });
Wifi.belongsTo(Kontrakans, { foreignKey: "kontrakan_id" });

module.exports = Kontrakans;
