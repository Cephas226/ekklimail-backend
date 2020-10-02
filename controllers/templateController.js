const db = require("/Users/mac/Desktop/cooly-ekkli/models/templateMail");
const Template = db.template;
exports.create = (req, res) => {
  // Validate request
  if (!req.body.objet) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const template = new Template({
    objet: req.body.objet,
    // description: req.body.description,
    // published: req.body.published ? req.body.published : false
  });
  template
    .save(template)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the template."
      });
    });
};