const express = require("express");
const router = express.Router();

const Ingredients = require("../models/Ingredients");

/* GET home page */
router.get("/", (req, res, next) => {
  Ingredients
  .findById("5dd534c8c7127d7aff23df5c")
  // .sort({name : -1})
  .then(ingredient => {
    res.render("index", ingredient);
  });
});

router.get("/axios", (req, res, next) => {
  Ingredients
  .findById("5dd534c8c7127d7aff23df5c")
  // .sort({name : -1})
  .then(ingredient => {
    res.render("index-axios", ingredient);
  });
});

router.get("/axios-creation", (req, res, next) => {
  res.render("index-axios-creation");
});

// for the classic way (update)
router.post("/updateIngredient", (req, res, next) => {
  Ingredients
  .findByIdAndUpdate(req.body._id, req.body)
  .then(() => {
    res.redirect("/")
  });
});

// for the modern way (update)
router.put("/updateIngredient", (req, res, next) => {
  Ingredients
  .findByIdAndUpdate(req.body._id, req.body)
  .then(() => {
    res.json({updated: true})
  });
});

// for the modern way (create)
router.post("/createIngredient", (req, res, next) => {
  Ingredients
  .create(req.body)
  .then((createdIngredient) => {
    res.json({createdIngredient, timestamp: new Date()})
  });
});

router.get("/list-ingredients", (req, res)=> {
  Ingredients.find().then(ingredients => res.json(ingredients))
})


module.exports = router;
