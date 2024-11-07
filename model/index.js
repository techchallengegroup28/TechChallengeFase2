const Usuario = require("./User");
const TipoUsuario = require("./UserType");

Usuario.belongsTo(TipoUsuario, {
  foreignKey: "tipoUsuarioID",
  as: "tipoUsuario",
});

TipoUsuario.hasMany(Usuario, {
  foreignKey: "tipoUsuarioID",
  as: "usuarios",
});

module.exports = {
  Usuario,
  TipoUsuario,
};
