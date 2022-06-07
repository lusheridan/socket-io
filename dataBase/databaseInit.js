const knex = require("knex");
const options = require("./configDB");

knex(options.mariaDB)
  .schema.createTable("productos", (table) => {
    table.increments("id").primary().unique();
    table.string("title").notNullable();
    table.integer("price").notNullable();
    table.string("thumbnail").notNullable();
  })
  .then(() => {
    console.log("tabla creada");
  })
  .catch((error) => {
    throw error;
  });

knex(options.sqlite)
  .schema.createTable("mensajes", (table) => {
    table.increments("id").primary().unique();
    table.string("author").notNullable();
    table.integer("date").notNullable();
    table.string("text").notNullable();
  })
  .then(() => {
    console.log("tabla creada");
  })
  .catch((error) => {
    throw error;
  });
