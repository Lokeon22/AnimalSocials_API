const { Router } = require("express");
const multer = require("multer");
const { MULTER } = require("../configs/upload");

const postsRouter = Router();
const upload = multer(MULTER);

const { PostsController } = require("../controllers/PostsController");
const ensureAuth = require("../middleware/ensureAuth");

const postsController = new PostsController();

postsRouter.patch(
  "/newpost",
  ensureAuth,
  upload.single("image"),
  postsController.create
);
postsRouter.get("/posts", postsController.index);
postsRouter.get("/post/:user_id", postsController.show);
postsRouter.get("/post/modal/:id", postsController.modal);
postsRouter.delete("/remove/:id", ensureAuth, postsController.delete);
postsRouter.delete("/adminremove/:id", ensureAuth, postsController.adminDelete);

module.exports = postsRouter;
