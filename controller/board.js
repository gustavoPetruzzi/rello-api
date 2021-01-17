const User = require("../models/user");
const Board = require("../models/board");
const handleError = require("../utils/error-handler");
const { validationResult } = require("express-validator");

exports.getBoards = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      const error = new Error("The user was not found");
      error.statusCode = 409;
      throw error;
    }
    const boards = await Board.findAll({
      where: {
        userId: user.id,
      },
    });
    return res.status(200).json({
      boards: boards,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

exports.addBoard = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const newBoard = await Board.create({
      name: req.body.name,
      userId: req.userId,
    });
    return res.status(201).json({
      message: "Board created",
      boardId: newBoard.dataValues.id,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

exports.removeBoard = async (req, res, next) => {
  const errors = validationResult(req);
  const boardId = req.params.id;
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const board = await Board.findByPk(boardId);
    if (!board || board.deleted) {
      const error = new Error("Board not found");
      error.statusCode = 401;
      throw error;
    }
    if (+board.userId !== +req.userId) {
      const error = new Error("You are not authorized to delete the board");
      error.statusCode = 401;
      throw error;
    }
    board.deleted = true;
    await board.save();
    return res.status(201).json({
      message: "Board deleted",
    });
  } catch (error) {
    console.log(error);
    return handleError(res, error);
  }
};

exports.updateBoard = async (req, res, next) => {
  const errors = validationResult(req);
  const boardId = req.params.id;
  const name = req.body.name;
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const board = await Board.findByPk(boardId);
    if (!board || board.deleted) {
      const error = new Error("Board not found");
      error.statusCode = 401;
      throw error;
    }
    if (board.userId !== +req.userId) {
      const error = new Error("You are not authorized to update the board");
      error.statusCode = 401;
      throw error;
    }
    board.name = name;
    await board.save();
    return res.status(201).json({
      message: "Board updated",
    });
  } catch (error) {
    console.log(error);
    return handleError(res, error);
  }
};
