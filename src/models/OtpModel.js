const { DataTypes,Sequelize } = require("sequelize");
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const Otp = db.define(
  "otp",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Otp;
