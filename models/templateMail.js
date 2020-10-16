const mongoose = require('mongoose');

const templateSchema = mongoose.Schema({
  currentUserEmail: { type: String},
  password: { type: String},
  objet: { type: String},
  person: [],
  content:{ type: String},
});

module.exports = mongoose.model('Template', templateSchema);