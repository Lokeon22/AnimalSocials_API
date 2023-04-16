const { Router } = require("express");

const ChatController = require("../controllers/ChatController");

const chatRoutes = Router();

const chatController = new ChatController();
const ensureAuth = require("../middleware/ensureAuth");

chatRoutes.post("/authenticate", ensureAuth, chatController.create);

module.exports = chatRoutes;
