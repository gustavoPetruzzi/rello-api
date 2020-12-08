const router = require("express").Router();
const columnController = require("../controller/column");
const isAuth = require("../middleware/is-auth");

router.post("/column", isAuth, columnController.createCard);

router.put("");
