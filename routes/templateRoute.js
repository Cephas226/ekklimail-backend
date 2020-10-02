module.exports = app => {
  const template = require("../controllers/templateController");

  var router = require("express").Router();

  router.post("/template", template.create);
  app.use('/template', router);
};