const knex = require("../database/knex");

class PostsController {
  async create(req, res) {
    const { title, description, image } = req.body;
    const id = req.user.id;

    if (!title || !description) {
      return res.json({ message: "Preencha todos os campos" });
    }

    await knex("posts").insert({
      title,
      description,
      image,
      user_id: id,
    });

    return res.json({ message: "Post criado com sucesso" });
  }

  async index(req, res) {
    const posts = await knex("posts");

    const comments = await knex("comments");

    const allPostsWithComments = posts.map((post) => {
      const allComments = comments.filter(
        (comment) => comment.post_id === post.id
      );

      return {
        ...post,
        comments: allComments,
      };
    });

    return res.json(allPostsWithComments);
  }

  async show(req, res) {
    const { id } = req.params;

    const onePost = await knex("posts").where({ id });

    const comments = await knex("comments");

    const specificPost = onePost.map((post) => {
      const allCommentsPost = comments.filter(
        (comment) => comment.post_id === post.id
      );

      return {
        ...post,
        comments: allCommentsPost,
      };
    });

    res.json(specificPost);
  }

  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    const post = await knex("posts").where({ id }).first();

    if (user.id !== post.user_id) {
      return res.json({ message: "Não possui permissão" });
    }

    await knex("posts").where({ id }).del();

    return res.json({ message: "Post deletado com sucesso" });
  }
}

module.exports = { PostsController };
