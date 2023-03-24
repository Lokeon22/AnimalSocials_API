const { verify } = require("jsonwebtoken");
const { authConfigs } = require("../configs/auth");

function ensureAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ message: "Usuario sem permissão" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfigs.jwt.secret);

    req.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    return res.json({ message: "Usuario sem permissão" });
  }
}

module.exports = ensureAuth;
