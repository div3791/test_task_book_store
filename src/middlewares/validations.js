const { body, validationResult, param } = require("express-validator");
const { error } = require("../utils/apiResponse");

const checkParamIdExists = [param("id").exists().withMessage("id is missing")];

const checkIfTitleExist = [
  body("title").exists().withMessage("title parameter is required"),
];

const checkIfISBNExist = [
  body("isbn")
    .exists()
    .withMessage("isbn parameter is required")
    .trim()
    .matches(/^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\d-]+$/)
    .withMessage("Invalid ISBN"),
];

async function validationResultMiddleware(req, res, next) {
  const errs = validationResult(req).array({ onlyFirstError: true });
  if (errs.length > 0) {
    return res
      .status(400)
      .json(error(errs.reduce((prev, item) => item.msg + "," + prev, "")));
  }
  next();
}

module.exports = {
  validationResultMiddleware,
  checkIfTitleExist,
  checkIfISBNExist,
  checkParamIdExists,
};
