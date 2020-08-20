const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
  name: String,
  password: String,
  
  }
);

module.exports = mongoose.model('Users', Users)