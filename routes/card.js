const router = require('express').Router();
const cardController = require('../controller/card');
const isAuth = require('../middleware/is-auth');

router.get('/cards', isAuth, cardController.getCards);

router.post('/card', isAuth, cardController.createCard);

router.put('/card/:id', isAuth, cardController.updateCard);

router.delete('/card/:id', isAuth,  cardController.deleteCard);

module.exports = router;