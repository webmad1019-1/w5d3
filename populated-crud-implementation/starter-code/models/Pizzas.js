const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema({
  name: String,
  basePrice: Number,
  baseCalories: Number,
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredients" }]
});

const Model = mongoose.model("Pizzas", schemaName);
module.exports = Model;
