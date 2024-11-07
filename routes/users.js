const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRoles = require("../middlewares/authorizeRoles");

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista de Usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Uma lista de todos os usuários disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   email:
 *                     type: string
 *                   tipo_usuario_id:
 *                     type: integer
 *                   tipo_usuario:
 *                     type: string
 */
router.get(
  "/",
  authenticateToken,
  authorizeRoles("professor"),
  userController.main
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obter detalhes de um Usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do usuário especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 tipo_usuario_id:
 *                   type: integer
 *                 tipo_usuario:
 *                   type: string
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:id", authenticateToken, userController.single);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criação de Usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo_usuario_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Falha na criação do usuário
 */
router.post(
  "/",
  authenticateToken,
  authorizeRoles("professor"),
  userController.novo
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualização de Usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo_usuario_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Falha na atualização do usuário
 *       404:
 *         description: Usuário não encontrado
 */
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("professor"),
  userController.atualizar
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclusão de Usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("professor"),
  userController.delete
);

module.exports = router;
