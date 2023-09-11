const request = require("supertest");
const app = require("../app");
const db = require("../db");

const book1 = {
  title: "Book 1",
  isbn: "9988665543",
};

const book2 = {
  title: "Book 2",
  isbn: "8866554437",
};

const book3 = {
  title: "Book 3",
  isbn: "88665544373462346236346",
};

beforeAll(async () => {
  try {
    await db.query(
      `CREATE TEMP TABLE books_test ( LIKE books INCLUDING DEFAULTS )`
    );
  } catch (error) {
    console.log("error test", error);
  }
});

describe("Test Books", () => {
  test("Test POST /create, Should create 2 books", async () => {
    const res1 = await request(app)
      .post("/api/v1/books/create")
      .send({ ...book1 });
    const res2 = await request(app)
      .post("/api/v1/books/create")
      .send({ ...book2 });
    book1.id = res1.body.result[0].id;
    book2.id = res2.body.result[0].id;
    expect(res1.statusCode).toEqual(200);
    expect(res2.statusCode).toEqual(200);
  });

  test("Test GET /getAll, Should return 2 book objects when listing all books", async () => {
    const res = await request(app).get("/api/v1/books/getAll");
    expect(res.statusCode).toEqual(200);
    expect(res.body.result.length).toEqual(2);
  });

  test("Test DELETE /delete/:id, Should soft delete 1 book", async () => {
    const res = await request(app).delete(`/api/v1/books/delete/${book1.id}`);
    expect(res.statusCode).toEqual(200);
  });

  test("Test GET /getAll, Should return 1 book when listing all books", async () => {
    const res = await request(app).get(`/api/v1/books/getAll`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.result[0].id).toEqual(book2.id);
  });

  test("Test PUT /update/id, Should update only title", async () => {
    const res = await request(app)
      .put(`/api/v1/books/update/${book2.id}`)
      .send({ title: "Updated book", isbn: "2223132" });
    expect(res.statusCode).toEqual(201);
    const bookRes = await request(app).get(`/api/v1/books/get/${book2.id}`);
    expect(bookRes.body.result[0].title).toEqual("Updated book");
    expect(bookRes.body.result[0].isbn).not.toEqual("2223132");
  });
});

describe("Validations Tests", () => {
  test("Should not allow duplicate ISBN", async () => {
    const res = await request(app)
      .post("/api/v1/books/create")
      .send({ ...book1 });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("ISBN already exists");
  });
  test("Should not allow invalid ISBN", async () => {
    const res = await request(app)
      .post("/api/v1/books/create")
      .send({ ...book3 });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Invalid ISBN,");
  });
});

afterAll(async () => {
  await db.query("DROP TABLE books_test");
  await db.end();
});
