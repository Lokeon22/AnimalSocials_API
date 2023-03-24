const tableName = "users";

exports.up = async function (knex) {
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
      email: "admin@admin.com",
      password: "123",
      is_admin: true,
    });
  }
};

exports.down = async function (knex) {
  return knex.schema.dropTable(tableName);
};
