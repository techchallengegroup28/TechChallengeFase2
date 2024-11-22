const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Usuario, tipo_usuario } = require("../model");

module.exports = class authController {
  static async login(req, res) {
    const { email, senha } = req.body;

    try {
      const usuario = await Usuario.findOne({
        where: { email },
        include: [{ model: tipo_usuario, as: "tipo_usuario" }],
      });

      if (!usuario) {
        return res.status(400).json({ error: "Credenciais inválidas." });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(400).json({ error: "Credenciais inválidas." });
      }

      const tokenPayload = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo_usuario_id: usuario.tipo_usuario_id,
        tipo_usuario: usuario.tipo_usuario
          ? usuario.tipo_usuario.nome_tipo
          : null,
      };

      const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET);

      res.json({ access_token: accessToken });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      res.status(500).json({ error: "Erro ao realizar login." });
    }
  }
};
