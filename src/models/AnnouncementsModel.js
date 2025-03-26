const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Announcements = db.define(
  "announcements",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    kontrakan_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "kontrakans",
        key: "id"
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    freezeTableName: true
  }
);

module.exports = Announcements;
