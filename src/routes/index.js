const express = require("express");
const router = express.Router();
const booksRoute = require("./books");

router.use("/books", booksRoute);

module.exports = router;
