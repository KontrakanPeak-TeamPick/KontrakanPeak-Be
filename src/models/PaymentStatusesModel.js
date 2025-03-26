const { DataTypes } = require("sequelize");
const db = require("../config/db");

const PaymentStatuses = db.define(
    "payment_statuses",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
);

module.exports = Payments;
