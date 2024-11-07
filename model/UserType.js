const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const tipo_usuario = sequelize.define(
  "tipo_usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_tipo: {
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

module.exports = tipo_usuario;
