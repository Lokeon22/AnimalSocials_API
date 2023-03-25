require("dotenv").config();
const { hash } = require("bcrypt");
const tableName = "users";

exports.up = async function (knex) {
  const adminPass = process.env.ADMIN_PASS;
  const hashPass = await hash(adminPass, 8);
  const exists = await knex.schema.hasTable(tableName);
  if (!exists) {
    await knex.schema.createTable(tableName, (table) => {
      table.increments("id");
      table.text("name");
      table.text("email");
      table.text("password");
      table.text("avatar").defaultTo(null);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.boolean("is_admin").notNullable().defaultTo(0);
    });

    return await knex(tableName).insert({
      id: "1",
      name: "admin",
      email: process.env.ADMIN_EMAIL,
      password: hashPass,
      is_admin: true,
    });
  }
};

exports.down = async function (knex) {
  return knex.schema.dropTable(tableName);
};
