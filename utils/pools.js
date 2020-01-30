var mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost', 
  user:'yanwar', 
  password: 'root',
  database: 'db_crud',
  connectionLimit: 5
});


module.exports = pool;