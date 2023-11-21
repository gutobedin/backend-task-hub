/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.string("desc").notNullable();
    table.dateTime("estimateAt");
    table.dateTime("doneAt");
    table
      .integer("categoryId")
      .references("id")
      .inTable("categories")
      .notNullable()
      .onDelete("CASCADE"); // Adiciona a restrição ON DELETE CASCADE
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};
