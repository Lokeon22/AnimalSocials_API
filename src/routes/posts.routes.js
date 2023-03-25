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
postsRouter.get("/post/:id", postsController.show);
postsRouter.delete("/remove/:id", ensureAuth, postsController.delete);

module.exports = postsRouter;
