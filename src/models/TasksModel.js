const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Tasks = db.define(
  "tasks",
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
    assigned_to: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    category_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: "task_categories", key: "id" }
    },
    status: {
      type: DataTypes.ENUM("pending", "completed"),
      allowNull: false,
      defaultValue: "pending"
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    freezeTableName: true
  }
);

module.exports = Tasks;
