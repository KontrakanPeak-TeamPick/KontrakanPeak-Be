const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const Wifi = db.define(
  "wifi",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    kontrakan_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ssid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Wifi;
