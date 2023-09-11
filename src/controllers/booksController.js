const Book = require("../models/Book");
const { error, success } = require("../utils/apiResponse");
const { NotFoundError, BadRequestError } = require("../utils/errors");

exports.create = async (req, res, next) => {
  try {
    const { title, isbn } = req.body;
    const isISBNExists = await Book.findISBN(isbn);
    if (isISBNExists.length > 0) {
      return next(new BadRequestError("ISBN already exists"));
    }
    const result = await Book.create({ title, isbn });
    return res.status(200).json(success("Book saved successfully!", result));
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const { title } = req.body;
  const { id } = req.params;
  try {
    const book = await Book.findOne(id);
    if (book.length <= 0) {
      return next(new NotFoundError("Book not found"));
    }
    const result = await Book.updateOne({ title, id });
    return res.status(201).json(success("Book updated successfully!", result));
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findOne(id);
    if (book.length <= 0) {
      return next(new NotFoundError("Book not found"));
    }
    const result = await Book.delete(id);
    return res.status(200).json(success("Book deleted!", result));
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await Book.find();
    return res.status(200).json(success("Books loaded!", result));
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Book.findOne(id);
    if (result.length > 0) {
      return res.status(200).json(success("Book found", result));
    } else {
      return next(new NotFoundError("Book not found"));
    }
  } catch (err) {
    next(err);
  }
};
