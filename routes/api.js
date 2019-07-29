const express = require('express');
const router = express.Router();

// zodiac
const zodiac = require('../controllers/zodiac');
const user = require('../controllers/user');
const numerology = require('../controllers/numerology');

router.use(express.static('public'));

// zodiac
router.use('/zodiac', zodiac);
router.use('/user', user);
router.use('/numerology', numerology);

module.exports = router;