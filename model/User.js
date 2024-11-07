const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tipoUsuarioID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "tipo_usuario_id",
    },
  },
  {
    tableName: "users",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Usuario;
