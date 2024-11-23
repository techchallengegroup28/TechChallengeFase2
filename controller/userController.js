const Usuario = require("../model/User");
const tipoUsuario = require("../model/UserType.js");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = class userController {
  // Função auxiliar para formatar a resposta do usuário
  static async formatUserResponse(user) {
    const { senha, ...userData } = user.dataValues;
    if (userData.tipo_usuario_id) {
      const tipo_usuario = await tipoUsuario.findByPk(userData.tipo_usuario_id);
      userData.tipo_usuario = tipo_usuario ? tipo_usuario.nome_tipo : null;
    }
    return userData;
  }

  // Rota para pegar todos os usuários
  static async main(req, res) {
    try {
      let listUsers = await Usuario.findAll({
        attributes: { exclude: ["senha"] },
      });

      listUsers = await Promise.all(
        listUsers.map(async (user) => {
          return await userController.formatUserResponse(user);
        })
      );

      return res.status(200).json(listUsers);
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
      return res
        .status(500)
        .json({ error: "Erro ao obter lista de usuários." });
    }
  }

  // Rota para pegar um usuário específico
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
      return res.status(200).json(formattedUser);
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
      return res.status(500).json({ error: "Erro ao obter usuário." });
    }
  }

  // Rota para criar novo usuário
  static async novo(req, res) {
    try {
      const dados = req.body;

      if (
        !dados.nome ||
        !dados.email ||
        !dados.senha ||
        !dados.tipo_usuario_id
      ) {
        return res
          .status(400)
          .json({ error: "Usuário não criado! Faltam dados." });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(dados.email)) {
        return res.status(400).json({ error: "Email inválido." });
      }

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

      const createdUser = await Usuario.create(novoUsuario);
      const responseUser = await userController.formatUserResponse(createdUser);

      return res.status(201).json(responseUser);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ error: "Erro ao criar usuário." });
    }
  }

  // Rota para atualizar usuário
  static async atualizar(req, res) {
    try {
      const dados = req.body;
      const id = req.params.id;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      if (dados.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(dados.email)) {
          return res.status(400).json({ error: "Email inválido." });
        }

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

      const updatedUser = await userController.formatUserResponse(usuario);

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
  }

  // Rota para excluir usuário
  static async delete(req, res) {
    try {
      const id = req.params.id;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      await Usuario.destroy({ where: { id: id } });
      return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return res.status(500).json({ error: "Erro ao deletar usuário." });
    }
  }

  // Rota para pesquisa de usuários
  static async pesquisa(req, res) {
    try {
      const pesquisa = req.query.buscar;

      const users = await Usuario.findAll({
        where: {
          [Op.or]: [
            { nome: { [Op.like]: `%${pesquisa}%` } },
            { email: { [Op.like]: `%${pesquisa}%` } },
          ],
        },
        attributes: { exclude: ["senha"] },
      });

      const formattedUsers = await Promise.all(
        users.map(async (user) => await userController.formatUserResponse(user))
      );

      return res.status(200).json(formattedUsers);
    } catch (error) {
      console.error("Erro ao pesquisar usuários:", error);
      return res.status(500).json({ error: "Erro ao realizar pesquisa." });
    }
  }
};
