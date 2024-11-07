module.exports = function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    if (!allowedRoles.includes(user.tipo_usuario)) {
      return res
        .status(403)
        .json({ error: "Acesso negado. Permissão insuficiente." });
    }

    next();
  };
};
