const jwt = require("jsonwebtoken");

// Função para autenticar o usuário e gerar o token
module.exports = class authController {
  static async login(req, res) {
    const { username, password } = req.body;

    if (username === "admin" && password === "123456") {
      const user = { username };

      const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ accessToken });
    } else {
      res.status(401).send("Credenciais inválidas");
    }
  }
};
