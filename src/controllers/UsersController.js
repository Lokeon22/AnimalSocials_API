const knex = require("../database/knex");

const { hash, compare } = require("bcrypt");

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

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const id = req.user.id; //user_id from verify / req.user JWT_Token

    const user = await knex("users").where({ id }).first();

    if (!user) {
      return res.json({ message: "Usuario não encontrado" });
    }

    const verifyEmailExists = await knex("users").where({ email }).first();

    if (verifyEmailExists && verifyEmailExists.id !== user.id) {
      return res.json({ message: "Email já existe" });
    }

    if (!password || !old_password) {
      return res.json({ message: "Preencha a senha" });
    }

    const verifyPass = await compare(old_password, user.password);

    if (!verifyPass) {
      return res.json({ message: "Email e/ou senha incorreta" });
    }

    const hashPass = await hash(password, 8);

    await knex("users")
      .where({ id })
      .update({
        name: name ?? user.name,
        email: email ?? user.email,
        password: hashPass ?? user.password,
      });

    return res.json({ message: "Perfil atualizado" });
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await knex("users").where({ id });

    return res.json(user);
  }
}

module.exports = { UsersController };
