const { DataTypes } = require("sequelize");
const db = require("../config/db");

const TaskCategories = db.define("task_categories", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = TaskCategories;
