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
  //Rota para pegar todos os posts (não admin)
  static async main(req, res) {
    let listPosts = await Post.findAll();

    listPosts = listPosts.map((post) => {
      return convertImagesToBase64(post);
    });

    res.json(listPosts);
  }

  //Rota para pegar um post em especifico (não admin)
  static async single(req, res) {
    let post = await Post.findByPk(parseInt(req.params.id));
    if (!post) return res.status(404).send("Post não encontrado.");
    post = convertImagesToBase64(post);
    res.json(post);
  }

  //Rota para criar novo post (admin)
  static async novo(req, res) {
    const dados = req.body;

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();

    if (!dados.titulo || !dados.descricao || !dados.conteudo || !dados.imagem) {
      res.json("Post não criado! Faltam dados.");
    } else {
      const imagemBinaria = Buffer.from(dados.imagem, "base64");

      const novo = {
        titulo: dados.titulo,
        descricao: dados.descricao,
        conteudo: dados.conteudo,
        imagem: imagemBinaria,
        datapostagem: `${ano}-${mes}-${dia}`,
      };

      await Post.create(novo);

      res.json("Post Criado com Sucesso!");
    }
  }

  //Rota para atualizar post (admin)
  static async atualizar(req, res) {
    const dados = req.body;
    const id = req.params.id;

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();

    if (dados.imagem) {
      dados.imagem = Buffer.from(dados.imagem, "base64");
    }

    const update = {
      titulo: dados.titulo,
      descricao: dados.descricao,
      conteudo: dados.conteudo,
      imagem: dados.imagem,
      dataatualizacao: `${ano}-${mes}-${dia}`,
    };

    await Post.update(update, { where: { id: id } });

    res.json("Post Atualizado com sucesso!");
  }

  //Rota para pegar todos os posts (admin)
  static async admin(req, res) {
    let listPosts = await Post.findAll();

    listPosts = listPosts.map((post) => {
      return convertImagesToBase64(post);
    });

    res.json(listPosts);
  }

  //Rota para excluir post (admin)
  static async delete(req, res) {
    const id = req.params.id;
    await Post.destroy({ where: { id: id } });
    res.json("Post Deletado com Sucesso!");
  }

  //Rota para pesquisa de posts (não admin)
  static async pesquisa(req, res) {
    const pesquisa = req.query.buscar;

    let posts = await Post.findAll({
      where: {
        [Op.or]: [
          {
            titulo: {
              [Op.like]: `%${pesquisa}%`,
            },
          },
          {
            conteudo: {
              [Op.like]: `%${pesquisa}%`,
            },
          },
        ],
      },
    });

    posts = posts.map((post) => {
      return convertImagesToBase64(post);
    });

    res.json(posts);
  }
};
