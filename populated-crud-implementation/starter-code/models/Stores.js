const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema({
  name: String,
  location: String,
  city: String,
  pizzas: [{ type: Schema.Types.ObjectId, ref: "Pizzas" }]
});

const Model = mongoose.model("Stores", schemaName);
module.exports = Model;
