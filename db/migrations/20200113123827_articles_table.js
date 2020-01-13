exports.up = function(knex) {
  // make articles table
  return knex.schema.createTable("articles", articles_table => {
    articles_table.increments("article_id");
    articles_table.string("title");
    articles_table.string("body");
    articles_table.integer("votes").defaultTo(0); //votes
    articles_table.string("topic").references("topics.slug"); // topic references slugs in topics
    articles_table.string("author").references("users.username"); // author primary key username
    articles_table.timestamp("created_at"); // created_at timestamp
  });
};

exports.down = function(knex) {
  // drop topics table
  return knex.schema.dropTable("articles");
};
