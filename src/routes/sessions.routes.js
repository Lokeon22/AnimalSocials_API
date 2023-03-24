const { Router } = require("express");

const sessionsRouter = Router();

const { SessionsController } = require("../controllers/SessionsController");

const sessionsController = new SessionsController();

sessionsRouter.post("/sessions", sessionsController.create);

module.exports = sessionsRouter;
