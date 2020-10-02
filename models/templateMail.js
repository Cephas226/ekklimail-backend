const mongoose = require('mongoose');

const templateSchema = mongoose.Schema({
  objet: { type: String},
  person: [],
  content:{ type: String},
});

module.exports = mongoose.model('Template', templateSchema);