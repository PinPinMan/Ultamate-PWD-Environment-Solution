// Name:		Goh Pin Pin Isaac
// Class:		DAAA/FT/1B/07
// Admission Number:	P2317623

// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/workerModel");

// ##############################################################
// CREATE
// ##############################################################
module.exports.createNewWorkerController = (req, res, next) => {
    if (req.body.username == undefined) {      // checks if body has required keys
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }
    const data = {
        username: req.body.username
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewWorkerController:", error);
            res.status(500).json({
                message: "Internal server error."
            });                                                    // return error
        } else {
            res.status(201).json({
                message: "Worker added successfully.",
                movieId: results.insertId
            });
        }
    };
    model.insertWorkerModel(data, callback);
};
// ##############################################################
// DELETE
// ##############################################################
module.exports.deleteWorkerController = (req, res, next) => {
    if (req.body.user_id == undefined) {      // checks if body has required keys
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }
    
    const data = {
        user_id: req.body.user_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMovieByWorkerController:", error);          // return error
            res.status(500).json(error);
        } else if (results.affectedRows == 0) {
            res.status(404).json({
                message: "No workers were found."                        // if select statement has didnt find progress_id
            });
        } else {
            res.status(200).json({
                message: `user${data.user_id} was deleted.`
            })
        };          
    };

    model.deleteWorkerByIdModel(data, callback);
};
// ##############################################################
// READ ALL
// ##############################################################
module.exports.readAllWorkerController = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);    // return error
        } else {
            res.status(200).json(results)   // return results
        };
    };

    model.selectAllWorkers(callback);
};