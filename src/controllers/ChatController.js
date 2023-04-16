require("dotenv").config();
const { default: axios } = require("axios");
const knex = require("../database/knex");

class ChatController {
  async create(req, res) {
    const id = req.user.id;

    const [user] = await knex("users").where({ id });

    try {
      const r = await axios.put(
        "https://api.chatengine.io/users/",
        {
          username: user.name,
          secret: user.name,
          first_name: user.name,
        },
        { headers: { "private-key": process.env.CHAT_KEY } }
      );
      return res.status(r.status).json(r.data);
    } catch (e) {
      return res.status(e.response.status).json(e.response.data);
    }
  }
}

module.exports = ChatController;
