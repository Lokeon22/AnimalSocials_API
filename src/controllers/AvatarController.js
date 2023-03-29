const knex = require("../database/knex");
const { DiskStorage } = require("../providers/DiskStorage");

class AvatarController {
  async update(req, res) {
    const user_id = req.user.id;
    const avatarFile = req.file.filename;

    const diskStorage = new DiskStorage();

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      return res.json("Usuario sem permissão");
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFile);

    await knex("users").where({ id: user_id }).update({
      avatar: filename,
    });

    return res.json(avatarFile);
  }
}

module.exports = { AvatarController };
