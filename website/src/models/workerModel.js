// Name:		Goh Pin Pin Isaac
// Class:		DAAA/FT/1B/07
// Admission Number:	P2317623


// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE INSERT
// ##############################################################
module.exports.insertWorkerModel = (data, callback) => {
    const INSERTING = `
    INSERT INTO workers (username)
    VALUES (?);
    `;
    const VALUES = [data.username];

    pool.query(INSERTING, VALUES, callback);
}

// ##############################################################
// DEFINE DELETE 
// ##############################################################
module.exports.deleteWorkerByIdModel = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM workers
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// SELECT ALL MOVIES
// ##############################################################
module.exports.selectAllWorkers = (callback) => {
    const SQLSTATMENT = `
    SELECT user_id, username
    FROM workers;
    `;

    pool.query(SQLSTATMENT, callback);
}
