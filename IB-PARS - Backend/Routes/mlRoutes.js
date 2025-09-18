const express = require('express');
const router = express.Router();
const { trainModel } = require('../Controllers/mlController');

router.post('/train', trainModel);

module.exports = router;
