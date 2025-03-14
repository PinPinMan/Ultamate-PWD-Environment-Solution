// Name:		Goh Pin Pin Isaac
// Class:		DAAA/FT/1B/07
// Admission Number:	P2317623


// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');                             // enable express library
const router = express.Router();  

// ##############################################################
// CREATE ROUTER
// ##############################################################
const workerRoutes = require('./workerRoutes');

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.use("/worker", workerRoutes); 

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;