const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'slucter',
      password : 'ASDqwe123!@#',
      database : 'dbpechat'
    }
  });

module.exports = knex