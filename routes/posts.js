const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gerenciamento de posts
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista de Posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Uma lista de todos os posts disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   descricao:
 *                     type: string
 *                   datapostagem:
 *                     type: string
 *                     format: date-time
 *                   dataatualizacao:
 *                     type: string
 *                     format: date-time
 *                   conteudo:
 *                     type: string
 *                   imagem:
 *                     type: string
 *                     format: binary
 */
router.get("/", postController.main);

/**
 * @swagger
 * /posts/admin:
 *   get:
 *     summary: Listagem de Todas as Postagens (Visão Administrativa)
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Uma lista de todas as postagens criadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   descricao:
 *                     type: string
 *                   datapostagem:
 *                     type: string
 *                     format: date-time
 *                   dataatualizacao:
 *                     type: string
 *                     format: date-time
 *                   conteudo:
 *                     type: string
 *                   imagem:
 *                     type: string
 *                     format: binary
 */
router.get("/admin", postController.admin);

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Busca de Posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: buscar
 *         required: true
 *         description: Termo de busca
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de posts que contêm o termo de busca no título ou conteúdo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   descricao:
 *                     type: string
 *                   datapostagem:
 *                     type: string
 *                     format: date-time
 *                   dataatualizacao:
 *                     type: string
 *                     format: date-time
 *                   conteudo:
 *                     type: string
 *                   imagem:
 *                     type: string
 *                     format: binary
 */
router.get("/search", postController.pesquisa);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Leitura de Posts
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Conteúdo completo do post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 titulo:
 *                   type: string
 *                 descricao:
 *                   type: string
 *                 datapostagem:
 *                   type: string
 *                   format: date-time
 *                 dataatualizacao:
 *                   type: string
 *                   format: date-time
 *                 conteudo:
 *                   type: string
 *                 imagem:
 *                   type: string
 *                   format: binary
 *       404:
 *         description: Post não encontrado
 */
router.get("/:id", postController.single);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Criação de Postagens
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               conteudo:
 *                 type: string
 *               imagem:
 *                 type: string
 *                 format: base64
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Post não criado! Faltam dados.
 */
router.post("/", postController.novo);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Edição de Postagens
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               conteudo:
 *                 type: string
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 */
router.put("/:id", postController.atualizar);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Exclusão de Postagens
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post excluído com sucesso
 */
router.delete("/:id", postController.delete);

module.exports = router;
