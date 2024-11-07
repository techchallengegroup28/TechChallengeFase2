const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const TipoUsuario = sequelize.define(
  "TipoUsuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomeTipo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "nome_tipo",
    },
  },
  {
    tableName: "user_types",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = TipoUsuario;
