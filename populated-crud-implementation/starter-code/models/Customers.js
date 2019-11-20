const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema({
  name: String
});

const Model = mongoose.model("Customers", schemaName);
module.exports = Model;
