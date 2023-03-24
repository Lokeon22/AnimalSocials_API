const { Router } = require("express");

const postsRouter = Router();

const { PostsController } = require("../controllers/PostsController");
const ensureAuth = require("../middleware/ensureAuth");

const postsController = new PostsController();

postsRouter.post("/newpost", ensureAuth, postsController.create);
postsRouter.get("/posts", postsController.index);
postsRouter.get("/post/:id", postsController.show);
postsRouter.delete("/remove/:id", ensureAuth, postsController.delete);

module.exports = postsRouter;
