const { Router } = require("express");
const { UsersController } = require("../controllers/UsersController");

const ensureAuth = require("../middleware/ensureAuth");

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/register", usersController.create);
usersRouter.get("/show/:id", usersController.show);
usersRouter.put("/profile", ensureAuth, usersController.update);

module.exports = usersRouter;
