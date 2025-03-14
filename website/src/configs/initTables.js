const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}

bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);

    const SQLSTATEMENT = `
    DROP TABLE IF EXISTS workers;
    
    CREATE TABLE workers (
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        username TEXT NOT NULL
    ); 
    
    INSERT INTO workers (user_id, username) VALUES 
    (1, 'Maria'),
    (2, 'Jose'),
    (3, 'Catherine'),
    (4, 'Mark'),
    (5, 'Katherine'),
    (6, 'Miguel');
      `;

    pool.query(SQLSTATEMENT, callback);
  }
});