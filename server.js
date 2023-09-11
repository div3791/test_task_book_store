const app = require("./src/app");

const port = process.env.PORT || 3001;

module.exports = app.listen(port, () => {
  console.log(`Server is running on ${port}`.bgYellow);
});
