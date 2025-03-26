const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Payments = db.define(
  "payments",
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
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: "payment_statuses", key: "id" }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true
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

module.exports = Payments;
