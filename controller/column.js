const User = require("../models/user");
const Column = require("../models/column");
const handleError = require("../utils/error-handler");
const { validationResult } = require("express-validator");


// exports.getColumns = async (req, res, next) => {
//     try {
//         const user = await User.findByPk(req.userId);
//         if (!user) {
//             const error = new Error('T')
//         }
//     } catch (error) {
//         return handleError(res, error);
//     }
// }

exports.addColumn = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('The user was not found');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const newColumn = await Column.create({
      name: req.body.name,
      boardId: req.boardId,
    });
    return res.status(201).json({
      message:'Column created',
      columnId: newColumn.dataValues.id,
    })    
  } catch (error) {
    return handleError(res, error);
  }
}

exports.removeColumn = async (req, res, next) => {
  const errors = validationResult(req);
  const columnId = req.params.id;
  try {
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.data = errors.array();
    }
    const column = await Column.findByPk(columnId);
    if (!column || column.deleted ) {
      const error = new Error('Column not found');
      error.statusCode = 401;
      throw error;
    }
    // Need to check user id
    column.deleted = true;
    await column.save();
    return res.status(201).json({
      message: 'Column deleted',
    });
  } catch (error) {
    return handleError(res, error);
  }
}

exports.updateBoard = async (req,res, next) => {
  const errors = validationResult(req);
  const columnId = req.params.id;
  const name = req.body.name;
  try {
    if (!errors.isEmpty()) {
      const error = new Error();
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const column = await Column.findByPk(columnId);
    if(!column || column.deleted) {
      const error = new Error("Column not found");
      error.statusCode = 401;
      throw error;
    }
    //Need to check user id
    column.name = name;
    await board.save();
    return res.status(201).json({
      message: "column updated"
    });
  } catch (error) {
    return handleError(res, error);
  }
}