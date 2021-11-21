module.exports = (app) => {
  const tutorials = require("../controllers/controller.js");

  var router = require("express").Router();

  router.get("/match", tutorials.findAll);

  app.use("/api/queries", router);
};
