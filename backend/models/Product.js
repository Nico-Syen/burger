const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  product: String,
  price: String,
  
  }
);

module.exports = mongoose.model('Product', Product)