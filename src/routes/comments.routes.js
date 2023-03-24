const { Router } = require("express");
const { CommentsController } = require("../controllers/CommentsController");

const ensureAuth = require("../middleware/ensureAuth");

const commentsRouter = Router();

const commentsController = new CommentsController();

commentsRouter.post("/comment", ensureAuth, commentsController.create);
commentsRouter.get("/comments", commentsController.show);

module.exports = commentsRouter;
