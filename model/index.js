const Usuario = require("./User");
const tipo_usuario = require("./UserType");

Usuario.belongsTo(tipo_usuario, {
  foreignKey: "tipo_usuario_id",
  as: "tipo_usuario",
});

tipo_usuario.hasMany(Usuario, {
  foreignKey: "tipo_usuario_id",
  as: "usuarios",
});

module.exports = {
  Usuario,
  tipo_usuario,
};
