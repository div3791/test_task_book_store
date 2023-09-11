const db = require("../db");
const _ = require("lodash");
let tableName = process.env.NODE_ENV === "test" ? "books_test" : "books";
class Book {
  static async find() {
    const result = await db.query(`
       SELECT * FROM ${tableName} WHERE is_deleted=false
    `);
    return result.rows.map((item) =>
      _.omit(item, ["is_deleted", "created_at"])
    );
  }

  static async findOne(id) {
    const result = await db.query(
      `SELECT * FROM ${tableName} WHERE id=$1 and is_deleted=false`,
      [id]
    );
    if (result.rowCount > 0) {
      return result.rows.map((item) =>
        _.omit(item, ["is_deleted", "created_at"])
      );
    } else {
      return [];
    }
  }

  static async create(data) {
    const result = await db.query(
      `INSERT INTO ${tableName}(title,isbn) VALUES($1,$2) RETURNING id`,
      [data.title, data.isbn]
    );
    return result.rows;
  }

  static async updateOne(data) {
    const { title, id } = data;
    const result = await db.query(
      `UPDATE ${tableName} SET title = $1 WHERE id=$2`,
      [title, id]
    );
    return result.rows;
  }

  static async delete(id) {
    const result = await db.query(
      `UPDATE ${tableName} SET is_deleted=true WHERE id =$1`,
      [id]
    );
    return result.rows;
  }

  static async findISBN(isbn) {
    const result = await db.query(
      `SELECT isbn FROM ${tableName} WHERE isbn=$1`,
      [isbn]
    );
    return result.rows;
  }
}

module.exports = Book;
