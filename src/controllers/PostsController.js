const knex = require("../database/knex");
const { DiskStorage } = require("../providers/DiskStorage");

class PostsController {
  async create(req, res) {
    const { title, description } = req.body;
    const image = req.file.filename;
    const id = req.user.id;

    const diskStorage = new DiskStorage();

    if (!title || !description || !image) {
      return res.json({ message: "Preencha todos os campos" });
    }

    const filename = await diskStorage.saveFile(image);

    await knex("posts").insert({
      title,
      description,
      image: filename,
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
    const { user_id } = req.params;

    const onePost = await knex("posts").where({ user_id });

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

  async modal(req, res) {
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

    const diskStorage = new DiskStorage();

    const user = await knex("users").where({ id: user_id }).first();

    const post = await knex("posts").where({ id }).first();

    await diskStorage.deleteFile(post.image);

    if (user.id !== post.user_id) {
      return res.json({ message: "Não possui permissão" });
    }

    await knex("posts").where({ id }).del();

    return res.json({ message: "Post deletado com sucesso" });
  }
}

module.exports = { PostsController };
