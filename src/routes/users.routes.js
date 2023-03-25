const { Router } = require("express");
const multer = require("multer");
const { MULTER } = require("../configs/upload");

const { AvatarController } = require("../controllers/AvatarController");
const { UsersController } = require("../controllers/UsersController");

const ensureAuth = require("../middleware/ensureAuth");

const usersRouter = Router();
const upload = multer(MULTER);

const usersController = new UsersController();
const avatarController = new AvatarController();

usersRouter.post("/register", usersController.create);
usersRouter.get("/show/:id", usersController.show);
usersRouter.put("/profile", ensureAuth, usersController.update);
usersRouter.patch(
  "/avatar",
  ensureAuth,
  upload.single("avatar"),
  avatarController.update
);

module.exports = usersRouter;
