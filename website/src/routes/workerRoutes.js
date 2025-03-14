// Name:		Goh Pin Pin Isaac
// Class:		DAAA/FT/1B/07
// Admission Number:	P2317623

// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');                                     // enable express library
const router = express.Router(); 

// ##############################################################
// CREATE ROUTER
// ##############################################################
const controller = require('../controllers/workerController');    // getting our controller with our functions

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post('/', controller.createNewWorkerController);                     
router.get('/', controller.readAllWorkerController);
router.delete('/', controller.deleteWorkerController);                   

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;