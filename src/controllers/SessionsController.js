const knex = require("../database/knex");

const { authConfigs } = require("../configs/auth");
const { sign } = require("jsonwebtoken");

const { compare } = require("bcrypt");

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      return res.json({ message: "Email e/ou senha incorreta" });
    }

    const passVerify = await compare(password, user.password);

    if (!passVerify) {
      return res.json({ message: "Email e/ou senha incorreta" });
    }

    const { secret, expiresIn } = authConfigs.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return res.json({ user, token });
  }
}

module.exports = { SessionsController };
