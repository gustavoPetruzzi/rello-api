const Card = require('../models/card');

exports.getCards = async (req, res, next) =>{
    try {
        const cards = await Card.find();
        res.status(200).json({
            cards: cards
        });
    } catch (error) {
        console.log(error);
    }
}

exports.createCard = async (req, res, next) =>{
    const title = req.body.title;
    const content = req.body.content;

    const card = new Card({
        title: title,
        content: content
    });

    try {
        await card.save();
        res.status(201).json({
            message: 'Card create',
            card: card
        });
    } catch (error) {
        console.log(error);
    }
};

exports.updateCard = async (req, res, next) => {
    const cardId = req.body.id;
    const title = req.body.title;
    const content = req.body.content;

    try {
        const card = await Card.findById(cardId);
        if(!card){
            res.status(500).json({
                message: 'card not found',
            });
        }
        card.title = title;
        card.content =content;
        await card.save();
        res.status(200).json({
            message: 'Card updated!',
            card: card
        })
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred'
        });
    }
}

exports.deleteCard = async (req, res, next) => {
    const cardId = req.body.id;
    try {
        await Card.findByIdAndDelete(cardId);
        res.status(200).json({
            message:'Card successfully deleted!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'An error occurred'
        });
    }
}

