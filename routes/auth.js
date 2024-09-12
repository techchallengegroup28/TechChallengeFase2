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

module.exports = router;
