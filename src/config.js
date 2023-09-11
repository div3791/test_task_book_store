require("dotenv").config();

const PORT = process.env.PORT || 3001;

const db_config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

function getDBUri() {
  return `postgresql://${db_config.user}:${db_config.password}@${db_config.host}:${db_config.port}/${db_config.database}`;
}

module.exports = {
  PORT,
  getDBUri,
  db_config,
};
