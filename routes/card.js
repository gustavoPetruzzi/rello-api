const router = require('express').Router();
const cardController = require('../controller/card');

router.get('/cards', cardController.getCards);

module.exports = router;