const knex = require("../database/knex");

const { hash } = require("bcrypt");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ message: "Preencha todos os campos" });
    }

    const verifyEmailExists = await knex("users").where({ email }).first();

    if (verifyEmailExists) {
      return res.json({ message: "Email já cadastrado" });
    }

    const hashPass = await hash(password, 8);

    await knex("users").insert({ name, email, password: hashPass });

    return res.json({ message: "Usuario cadastrado" });
  }
}

module.exports = { UsersController };
