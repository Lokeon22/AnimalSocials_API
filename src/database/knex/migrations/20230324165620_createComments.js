exports.up = async function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("id");
    table.text("comment").notNullable();
    table
      .integer("post_id")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable("comments");
};
