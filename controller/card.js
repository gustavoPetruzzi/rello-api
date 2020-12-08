const Card = require("../models/card");
const handleError = require("../utils/error-handler");
const Column = require("../models/column");

exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.status(200).json({
      cards: cards,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
  }
};

exports.createCard = async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // const image = req.body.image;
  const columnId = req.body.columnId;

  try {
    const column = await Colunm.findById(columnId);
    if (!column) {
      const error = new Error("Column not found");
      error.statusCode = 401;
      throw error;
    }
    await card.create({
      title,
      content,
      image,
      columnId,
    });

    res.status(201).json({
      message: "Card created",
      card: card,
      //cardId: card.id
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
  }
};

exports.updateCard = async (req, res, next) => {
  const cardId = req.body.id;
  const title = req.body.title;
  const content = req.body.content;

  try {
    const card = await Card.findById(cardId);
    if (!card) {
      res.status(500).json({
        message: "card not found",
      });
    }
    card.title = title;
    card.content = content;
    await card.save();
    res.status(200).json({
      message: "Card updated!",
      card: card,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteCard = async (req, res, next) => {
  const cardId = req.body.id;
  try {
    await Card.findByIdAndDelete(cardId);
    res.status(200).json({
      message: "Card successfully deleted!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
  }
};
