const config = require("../knexfile.js"); //comunicação com o banco de dados
const knex = require("knex")(config);

knex.migrate.latest([config]);
module.exports = knex; // posso usar em outros arquivos pra me comunicar com o banco de dados
