const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Usuario, TipoUsuario } = require("../model");

module.exports = class authController {
  static async login(req, res) {
    const { email, senha } = req.body;

    try {
      const usuario = await Usuario.findOne({
        where: { email },
        include: [{ model: TipoUsuario, as: "tipoUsuario" }],
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
        email: usuario.email,
        tipoUsuarioID: usuario.tipoUsuarioID,
        tipoUsuario: usuario.tipoUsuario ? usuario.tipoUsuario.nomeTipo : null,
      };

      const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ accessToken });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      res.status(500).json({ error: "Erro ao realizar login." });
    }
  }
};
