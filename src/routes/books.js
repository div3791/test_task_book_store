const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");
const {
  validationResultMiddleware,
  checkIfTitleExist,
  checkIfISBNExist,
  checkParamIdExists,
} = require("../middlewares/validations");

router.post(
  "/create",
  checkIfTitleExist,
  checkIfISBNExist,
  validationResultMiddleware,
  booksController.create
);
router.put(
  "/update/:id",
  checkIfTitleExist,
  validationResultMiddleware,
  booksController.update
);
router.delete(
  "/delete/:id",
  checkParamIdExists,
  validationResultMiddleware,
  booksController.delete
);
router.get("/getAll", booksController.getAll);
router.get(
  "/get/:id",
  checkParamIdExists,
  validationResultMiddleware,
  booksController.get
);

module.exports = router;
