const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gerenciamento de autenticação
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna um token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Atualização do Token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token JWT atual
 *     responses:
 *       200:
 *         description: Token atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: Novo token JWT
 *       400:
 *         description: Token não fornecido
 *       401:
 *         description: Token inválido ou expirado
 */
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
