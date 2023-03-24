exports.up = async function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.text("image").defaultTo(null);
    table.integer("user_id").references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable("posts");
};
