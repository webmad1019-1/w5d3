require("dotenv").config();

const mongoose = require("mongoose");

let Ingredients = require("../models/Ingredients");
let Orders = require("../models/Orders");
let Pizzas = require("../models/Pizzas");
let Customers = require("../models/Customers");

mongoose
  .connect("mongodb://localhost/populated-crud-implementation", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Database name: "${x.connections[0].name}"`);

    clearDB().then(() => populateDB());
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

function clearDB() {
  return new Promise((resolve, reject) => {
    resolve(
      Ingredients.deleteMany()
        .then(() => {
          return Orders.deleteMany();
        })
        .then(() => {
          return Pizzas.deleteMany();
        })
        .then(() => {
          return Customers.deleteMany();
        })
    );
  });
}

function populateDB() {
  let pizzasAddedGlobal;

  //first populate ingredients
  Ingredients.create([
    {
      name: "Peperonni",
      calories: 150,
      price: 1.45
    },
    {
      name: "Queso de rulo",
      calories: 150,
      price: 4.05
    },
    {
      name: "Cebolla caramelizada",
      calories: 150,
      price: 3.15
    },
    {
      name: "Bacon",
      calories: 150,
      price: 2.45
    },
    {
      name: "Topping a base de mozarella",
      calories: 150,
      price: 3.25
    },
    {
      name: "Salsa carbonara",
      calories: 300,
      price: 2.45
    }
  ])
    .then(ingredientsAdded => {
      return Pizzas.create(
        {
          name: "Piamontesa",
          baseCalories: 1000,
          basePrice: 3,
          ingredients: [ingredientsAdded[0]._id, ingredientsAdded[3]._id, ingredientsAdded[4]._id]
        },
        {
          name: "Tenessee",
          baseCalories: 1400,
          basePrice: 2.2,
          ingredients: [
            ingredientsAdded[0]._id,
            ingredientsAdded[1]._id,
            ingredientsAdded[2]._id,
            ingredientsAdded[3]._id
          ]
        },
        {
          name: "Barbacoa Gourmet",
          baseCalories: 800,
          basePrice: 2.1,
          ingredients: [
            ingredientsAdded[2]._id,
            ingredientsAdded[3]._id,
            ingredientsAdded[4]._id,
            ingredientsAdded[5]._id
          ]
        },
        {
          name: "Barbacoa Crispy",
          baseCalories: 900,
          basePrice: 2.4,
          ingredients: [
            ingredientsAdded[0]._id,
            ingredientsAdded[1]._id,
            ingredientsAdded[2]._id,
            ingredientsAdded[3]._id
          ]
        },
        {
          name: "Ibérica",
          baseCalories: 920,
          basePrice: 3.4,
          ingredients: [
            ingredientsAdded[0]._id,
            ingredientsAdded[1]._id,
            ingredientsAdded[4]._id,
            ingredientsAdded[5]._id
          ]
        },
        {
          name: "Hawaiana",
          baseCalories: 1500,
          basePrice: 4.2,
          ingredients: [ingredientsAdded[1]._id, ingredientsAdded[2]._id, ingredientsAdded[5]._id]
        },
        {
          baseCalories: 1900,
          basePrice: 1.2,
          name: "Carbonara",
          ingredients: [ingredientsAdded[0]._id, ingredientsAdded[1]._id, ingredientsAdded[4]._id]
        }
      );
    })
    .then(pizzasAdded => {
      pizzasAddedGlobal = pizzasAdded;
      return Customers.create([
        {
          name: "Rafael Nieto de Dios"
        },
        {
          name: "Luz Cuesta Mogollón"
        },
        {
          name: "Ana Tomía"
        },
        {
          name: "Helen Chufe"
        },
        {
          name: "Armando Bronca Segura"
        },
        {
          name: "Miguel Marco Gol"
        }
      ]);
    })
    .then(customers => {
      return Orders.create([
        {
          customer: customers[0]._id,
          pizzas: [pizzasAddedGlobal[0]._id, pizzasAddedGlobal[1]._id]
        },
        {
          customer: customers[1]._id,
          pizzas: [pizzasAddedGlobal[0]._id, pizzasAddedGlobal[1]._id]
        },
        {
          customer: customers[2]._id,
          pizzas: [pizzasAddedGlobal[0]._id, pizzasAddedGlobal[1]._id]
        },
        {
          customer: customers[3]._id,
          pizzas: [pizzasAddedGlobal[0]._id, pizzasAddedGlobal[1]._id]
        },
        {
          customer: customers[4]._id,
          pizzas: [pizzasAddedGlobal[0]._id, pizzasAddedGlobal[1]._id]
        },
        {
          customer: customers[4]._id,
          pizzas: [pizzasAddedGlobal[1]._id, pizzasAddedGlobal[4]._id]
        },
        {
          customer: customers[4]._id,
          pizzas: [pizzasAddedGlobal[0]._id, pizzasAddedGlobal[5]._id, pizzasAddedGlobal[6]._id]
        },
        {
          customer: customers[4]._id,
          pizzas: [pizzasAddedGlobal[2]._id, pizzasAddedGlobal[5]._id]
        },
        {
          customer: customers[5]._id,
          pizzas: [pizzasAddedGlobal[3]._id, pizzasAddedGlobal[6]._id]
        },
        {
          customer: customers[5]._id,
          pizzas: [
            pizzasAddedGlobal[3]._id,
            pizzasAddedGlobal[4]._id,
            pizzasAddedGlobal[5]._id,
            pizzasAddedGlobal[6]._id
          ]
        }
      ]);
    })
    .then(ordersAdded => {
      return Orders.find()
        .limit(1)
        .populate("customer")
        .populate("store")
        .populate({
          path: "pizzas",
          populate: {
            path: "ingredients"
          }
        });
    })
    .then(ordersPopulated => {
      console.log("Now populated 🤖");
      process.exit(0);
    });
}
