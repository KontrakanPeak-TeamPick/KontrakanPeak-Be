const sequelize = require("sequelize");
const db = require("../config/db");

const { DataTypes } = sequelize;

const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);
  
module.exports = Users;
