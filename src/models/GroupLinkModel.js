const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Kontrakan = require("./KontrakanModel");

const GroupLink = db.define(
  "group_links",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    kontrakan_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    nama_grup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link_grup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Kontrakan.hasMany(GroupLink, { foreignKey: "kontrakan_id" });
GroupLink.belongsTo(Kontrakan, { foreignKey: "kontrakan_id" });

module.exports = GroupLink;
