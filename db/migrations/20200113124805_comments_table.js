exports.up = function(knex) {
  return knex.schema.createTable("comments", comments_table => {
    console.log("........");
    comments_table.increments("comment_id");
    comments_table.string("author").references("users.username");
    comments_table.integer("article_id").references("articles.article_id");
    comments_table.integer("votes").defaultTo(0);
    comments_table
      .timestamp("created_at")
      .defaultTo(knex.fn.now())
      .notNullable(); //.defaultTo(knex.fn.now()).notNullable()
    comments_table.string("body", 1000);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
