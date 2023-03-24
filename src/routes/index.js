const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const postsRoutes = require("./posts.routes");
const commentsRoutes = require("./comments.routes");

const routes = Router();

routes.use("/", usersRoutes);
routes.use("/", sessionsRoutes);
routes.use("/", postsRoutes);
routes.use("/", commentsRoutes);

module.exports = routes;
