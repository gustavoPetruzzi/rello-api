const router = require('express').Router();
const cardController = require('../controller/card');

router.get('/cards', cardController.getCards);

router.post('/card', cardController.createCard);

router.put('/card/:id', cardController.updateCard);

module.exports = router;