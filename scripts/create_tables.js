const { options, sqliteOptions } = require('../src/models/databases');

const knexMySQL = require('knex')(options);
const knexSQLite = require('knex')(sqliteOptions);

knexMySQL.schema.createTable('products', (table) => {
  table.increments('id');
  table.string('name');
  table.string('description');
  table.string('price');
  table.integer('code');
  table.integer('stock');
  table.string('photo');
})
  .then(() => console.log('Table created'))
  .then((error) => {console.error(error); throw error })
  .finally(() => knexMySQL.destroy());

knexSQLite.schema.createTable('messages', (table) => {
  table.increments('id');
  table.string('message');
  table.string('name');
})
  .then(() => console.log('Table created'))
  .then((error) => {console.error(error); throw error })
  .finally(() => knexSQLite.destroy());