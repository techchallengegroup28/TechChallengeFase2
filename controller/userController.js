const Usuario = require("../model/User");
const tipoUsuario = require("../model/UserType.js");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = class userController {
  // Função auxiliar para excluir o campo 'senha' e incluir o tipo de usuário
  static async formatUserResponse(user) {
    const { senha, ...userData } = user.dataValues;
    if (userData.tipo_usuario_id) {
      const tipo_usuario = await tipoUsuario.findByPk(userData.tipo_usuario_id);
      userData.tipo_usuario = tipo_usuario ? tipo_usuario.nome_tipo : null;
    }
    return userData;
  }

  // Rota para pegar todos os usuários (admin)
  static async main(req, res) {
    let listUsers = await Usuario.findAll({
      attributes: { exclude: ["senha"] },
    });

    listUsers = await Promise.all(
      listUsers.map(async (user) => {
        return await userController.formatUserResponse(user);
      })
    );

    res.json(listUsers);
  }

  // Rota para pegar um usuário específico (não admin, mas só pode acessar seus próprios dados)
  static async single(req, res) {
    try {
      const requestedUserId = parseInt(req.params.id, 10);
      if (isNaN(requestedUserId)) {
        return res.status(400).json({ error: "ID de usuário inválido." });
      }

      const authenticatedUser = req.user;

      const isProfessor = authenticatedUser.tipo_usuario === "professor";
      const isSameUser = authenticatedUser.id === requestedUserId;

      if (!isProfessor && !isSameUser) {
        return res.status(403).json({
          error: "Acesso negado. Você só pode acessar seus próprios dados.",
        });
      }

      const user = await Usuario.findByPk(requestedUserId, {
        attributes: { exclude: ["senha"] },
      });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const formattedUser = await userController.formatUserResponse(user);
      return res.json(formattedUser);
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
      res.status(500).json({ error: "Erro ao obter usuário." });
    }
  }

  // Rota para criar novo usuário (admin)
  static async novo(req, res) {
    const dados = req.body;

    if (!dados.nome || !dados.email || !dados.senha || !dados.tipo_usuario_id) {
      res.status(400).json({ error: "Usuário não criado! Faltam dados." });
    } else {
      const existingUser = await Usuario.findOne({
        where: { email: dados.email },
      });
      if (existingUser) {
        return res.status(400).json({ error: "Email já está em uso." });
      }

      const hashedPassword = await bcrypt.hash(dados.senha, 10);

      const novoUsuario = {
        nome: dados.nome,
        email: dados.email,
        senha: hashedPassword,
        tipo_usuario_id: dados.tipo_usuario_id,
      };

      await Usuario.create(novoUsuario);

      res.json("Usuário Criado com Sucesso!");
    }
  }

  // Rota para atualizar usuário (admin)
  static async atualizar(req, res) {
    const dados = req.body;
    const id = req.params.id;

    const usuario = await Usuario.findByPk(id);
    if (!usuario)
      return res.status(404).send({ error: "Usuário não encontrado." });

    if (dados.email) {
      const existingUser = await Usuario.findOne({
        where: { email: dados.email, id: { [Op.ne]: id } },
      });
      if (existingUser) {
        return res.status(400).json({ error: "Email já está em uso." });
      }
    }

    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, 10);
    }

    await usuario.update(dados);

    res.json("Usuário Atualizado com sucesso!");
  }

  // Rota para pegar todos os usuários (admin)
  static async admin(req, res) {
    let listUsers = await Usuario.findAll({
      attributes: { exclude: ["senha"] },
    });

    listUsers = await Promise.all(
      listUsers.map(async (user) => {
        return await userController.formatUserResponse(user);
      })
    );

    res.json(listUsers);
  }

  // Rota para excluir usuário (admin)
  static async delete(req, res) {
    const id = req.params.id;

    const usuario = await Usuario.findByPk(id);
    if (!usuario)
      return res.status(404).send({ error: "Usuário não encontrado." });

    await Usuario.destroy({ where: { id: id } });
    res.json("Usuário Deletado com Sucesso!");
  }

  // Rota para pesquisa de usuários (não admin)
  static async pesquisa(req, res) {
    const pesquisa = req.query.buscar;

    let users = await Usuario.findAll({
      where: {
        [Op.or]: [
          {
            nome: {
              [Op.like]: `%${pesquisa}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${pesquisa}%`,
            },
          },
        ],
      },
      attributes: { exclude: ["senha"] },
    });

    users = await Promise.all(
      users.map(async (user) => {
        return await userController.formatUserResponse(user);
      })
    );

    res.json(users);
  }
};
