module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "satya22",
  DB: "Keyword",
  dialect: "postgres",
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
