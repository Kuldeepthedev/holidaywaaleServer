const mysql = require('mysql');


const pool = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12714354',
  password: 'Yqs677fsnL',
  database: 'sql12714354'
});

// Function to execute SQL queries
function executeQuery(sql, params, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err, null);
      return;
    }

    // Execute query
    connection.query(sql, params, (queryError, result) => {
      connection.release(); // Release connection

      if (queryError) {
        callback(queryError, null);
      } else {
        callback(null, result);
      }
    });
  });
}

module.exports = {
  executeQuery // Export the function for external use
};
