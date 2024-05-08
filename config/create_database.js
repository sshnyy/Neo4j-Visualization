//./config/create_database.js

var db = require('./configuration');
var connection = db.databaseConfig.connection;

connection.connect((err) => {  //create a database in MariaDB server
    if(err) throw err;
    console.log('Conneted to MariaDB');
    connection.query("CREATE DATABASE IF NOT EXISTS UserInfo", (err, result) => {
      if(err) throw err;
      console.log('Successfuly created UserInfo database');
    });
    connection.query("CREATE TABLE IF NOT EXISTS Users (id INT AUTO_INCREMENT PRIMARY KEY, \
      profileid VARCHAR(30), token VARCHAR(200), email VARCHAR(30), \
      password VARCHAR(100))", (err, result) => {
        if(err) throw err;
        console.log("Created table in MariaDB server");
      });
  });
