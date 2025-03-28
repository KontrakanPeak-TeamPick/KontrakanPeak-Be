const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Members = db.define(
  "members",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, 
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    kontrakan_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "kontrakans",
        key: "id"
      }
    },
    role: {
      type: DataTypes.ENUM("admin", "member"),
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);

module.exports = Members;
