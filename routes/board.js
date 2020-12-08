const router = require("express").Router();
const boardController = require("../controller/board");
const isAuth = require("../middleware/is-auth");
const { body } = require("express-validator");

router.get("/", isAuth, boardController.getBoards);

router.post(
  "/",
  isAuth,
  [body("name").not().isEmpty()],
  boardController.addBoard
);

router.put(
  "/:id",
  isAuth,
  [body("name").not().isEmpty()],
  boardController.updateBoard
);

router.delete("/:id", isAuth, boardController.removeBoard);

module.exports = router;
