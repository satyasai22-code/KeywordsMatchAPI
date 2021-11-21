const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
var sequelize;

if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
  sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_RED_URL, {
    dialect: "postgres",
    protocol: "postgres",
    port: 5432,
    host: "ec2-35-168-80-116.compute-1.amazonaws.com",
    logging: true, //false
  });
} else {
  // the application is executed on the local machine ... use mysql
  sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  });
}

const db = {};

sequelize
  .authenticate()
  .then(console.log("Connection to Database is established"))
  .catch((err) => {
    console.log("Unable to connect to the database: ", err);
  });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.queries = require("./model.js")(sequelize, Sequelize);

module.exports = db;
