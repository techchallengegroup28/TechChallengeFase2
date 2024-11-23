const Post = require("../model/Post");
const { Op } = require("sequelize");

function convertImagesToBase64(post) {
  let imagemBase64 = null;
  if (post.imagem != null) {
    imagemBase64 = post.imagem.toString("base64");
  }

  return {
    ...post.dataValues,
    imagem: imagemBase64,
  };
}

module.exports = class postController {
  // Rota para pegar todos os posts (não admin)
  static async main(req, res) {
    try {
      let listPosts = await Post.findAll();

      listPosts = listPosts.map((post) => convertImagesToBase64(post));

      return res.status(200).json(listPosts);
    } catch (error) {
      console.error("Erro ao obter posts:", error);
      return res.status(500).json({ error: "Erro ao obter a lista de posts." });
    }
  }

  // Rota para pegar um post em específico (não admin)
  static async single(req, res) {
    try {
      const postId = parseInt(req.params.id, 10);
      if (isNaN(postId)) {
        return res.status(400).json({ error: "ID do post inválido." });
      }

      let post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).json({ error: "Post não encontrado." });
      }

      post = convertImagesToBase64(post);
      return res.status(200).json(post);
    } catch (error) {
      console.error("Erro ao obter post:", error);
      return res.status(500).json({ error: "Erro ao obter o post." });
    }
  }

  // Rota para criar novo post (admin)
  static async novo(req, res) {
    try {
      const dados = req.body;

      if (!dados.titulo || !dados.descricao || !dados.conteudo) {
        return res
          .status(400)
          .json({ error: "Post não criado! Faltam dados." });
      }

      if (dados.imagem) {
        dados.imagem = Buffer.from(dados.imagem, "base64");
      }

      const data = new Date();
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();

      const novoPost = {
        titulo: dados.titulo,
        descricao: dados.descricao,
        conteudo: dados.conteudo,
        imagem: dados.imagem ? dados.imagem : null,
        datapostagem: `${ano}-${mes}-${dia}`,
      };

      const createdPost = await Post.create(novoPost);

      return res.status(201).json(convertImagesToBase64(createdPost));
    } catch (error) {
      console.error("Erro ao criar post:", error);
      return res.status(500).json({ error: "Erro ao criar o post." });
    }
  }

  // Rota para atualizar post (admin)
  static async atualizar(req, res) {
    try {
      const postId = parseInt(req.params.id, 10);
      if (isNaN(postId)) {
        return res.status(400).json({ error: "ID do post inválido." });
      }

      const dados = req.body;

      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).json({ error: "Post não encontrado." });
      }

      if (dados.imagem) {
        dados.imagem = Buffer.from(dados.imagem, "base64");
      }

      const data = new Date();
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();

      const updatedData = {
        titulo: dados.titulo,
        descricao: dados.descricao,
        conteudo: dados.conteudo,
        imagem: dados.imagem,
        dataatualizacao: `${ano}-${mes}-${dia}`,
      };

      await post.update(updatedData);

      return res.status(200).json(convertImagesToBase64(post));
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      return res.status(500).json({ error: "Erro ao atualizar o post." });
    }
  }

  // Rota para pegar todos os posts (admin)
  static async admin(req, res) {
    try {
      let listPosts = await Post.findAll();

      listPosts = listPosts.map((post) => convertImagesToBase64(post));

      return res.status(200).json(listPosts);
    } catch (error) {
      console.error("Erro ao obter posts administrativos:", error);
      return res.status(500).json({ error: "Erro ao obter posts." });
    }
  }

  // Rota para excluir post (admin)
  static async delete(req, res) {
    try {
      const postId = parseInt(req.params.id, 10);
      if (isNaN(postId)) {
        return res.status(400).json({ error: "ID do post inválido." });
      }

      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).json({ error: "Post não encontrado." });
      }

      await Post.destroy({ where: { id: postId } });

      return res.status(200).json({ message: "Post deletado com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar post:", error);
      return res.status(500).json({ error: "Erro ao deletar o post." });
    }
  }

  // Rota para pesquisa de posts (não admin)
  static async pesquisa(req, res) {
    try {
      const termoBusca = req.query.buscar;

      if (!termoBusca) {
        return res.status(400).json({ error: "Termo de busca não fornecido." });
      }

      let posts = await Post.findAll({
        where: {
          [Op.or]: [
            { titulo: { [Op.like]: `%${termoBusca}%` } },
            { conteudo: { [Op.like]: `%${termoBusca}%` } },
          ],
        },
      });

      posts = posts.map((post) => convertImagesToBase64(post));

      return res.status(200).json(posts);
    } catch (error) {
      console.error("Erro ao pesquisar posts:", error);
      return res.status(500).json({ error: "Erro ao realizar a pesquisa." });
    }
  }
};
