const knex = require("../database/knex");

class CommentsController {
  async create(req, res) {
    const { post_id } = req.params;
    const { comment } = req.body;
    const user_id = req.user.id;

    const post = await knex("posts").where({ id: post_id }).first();

    if (!post) {
      return res.json({ message: "Post não encontrado" });
    }

    await knex("comments").where({ post_id }).insert({
      comment,
      post_id,
      user_id,
    });

    return res.json({ message: "Comentario criado" });
  }

  async show(req, res) {
    const comments = await knex("comments");

    return res.json(comments);
  }
}

module.exports = { CommentsController };
