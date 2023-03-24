const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();

routes.use("/", usersRoutes);
routes.use("/", sessionsRoutes);

module.exports = routes;
