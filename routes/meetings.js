const express = require('express');
const router = express.Router();

const meetingsController = require('../controllers/meetingsController');

router.get('/', meetingsController.findAll);

module.exports = router;
