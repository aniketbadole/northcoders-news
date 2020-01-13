exports.up = function(knex) {
  // make topics table
  return knex.schema.createTable("topics", topics_table => {
    // topics_table.increments("topic_id");
    topics_table.string("description");
    topics_table
      .string("slug")
      .unique()
      .primary();
  });
};

exports.down = function(knex) {
  // drop topics table
  return knex.schema.dropTable("topics");
};
