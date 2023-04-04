const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const ProductsModel = require("./models/Products");
const bcrypt = require("bcrypt");
const CategoriesModel = require("./models/Categories");
const CartModel = require("./models/Cart");

app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://poonamsaini:Mysense123@clusterapp.i3gyhqu.mongodb.net/cloecom?retryWrites=true&w=majority "
);

app.post("/login", (req, res) => {
  console.log(req.body, "body");
  const email = req.body.email;
  // TODO check if mail & pass both are coming in body

  console.log(email, "i am here");
  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ msg: "User doesnot exist." });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ msg: "Incorrect Password." });
          }

          res.status(200).json(user);
        })
        .catch((error) => {
          return res.status(500).json({ msg: error });
        });
    })
    .catch((err) => {
      res.status(500).json({ msg: "User doesnot exist." });
    });
});

app.post("/createUser", async (req, res) => {
  console.log("create user1");
  // TODO check if mail & pass both are coming in body
  // TODO check if mail already exists
  const saltRounds = 10; // for adding etc identity
  const plainTextPassword = req.body.password; // storing the requested password
  const hash = bcrypt.hashSync(plainTextPassword, saltRounds); // bcrypt the password
  const user = req.body;
  user.password = hash; //store the bcrypt password
  const newUser = new UserModel(user); // create the new user
  await newUser.save(); // add the new user to database
  res.json(user);
});

app.get("/categories", (req, res) => {
  CategoriesModel.find({})
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "Unable to access categories" });
    });
});

app.post("/cart", async (req, res) => {
  try {
    const { products } = req.body;
    const userId = "63c8ddde6ca24f8ce80b30ab";
    // Validate input
    if (!userId || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // Check if cart exists for user
    let cart = await CartModel.findOne({ userId });

    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new CartModel({ userId, products });
    }
    // If cart already exists, update the products
    else {
      // Loop through the products in the request
      for (const product of products) {
        const { productId, quantity, name, price } = product;

        // Check if product already exists in cart
        const existingProduct = cart.products.find(
          (p) => p.productId === productId
        );

        // If product already exists in cart, update the quantity
        if (existingProduct) {
          existingProduct.quantity += quantity;
        }
        // If product doesn't exist in cart, add it
        else {
          cart.products.push({ productId, quantity, name, price });
        }
      }
    }

    // Update the modifiedOn field
    cart.modifiedOn = Date.now();

    // Save the updated cart
    await cart.save();

    res.status(200).json({ msg: "Products added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error adding products to cart" });
  }
});

app.get("/products", (req, res) => {
  ProductsModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      // sending json data
      res.json(result);
    }
  });
});

app.get("/product/:id", (req, res) => {
  console.log(req.params.id, "i am ");
  const sku_id = req.params.id;
  ProductsModel.findOne({ sku_id })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen("3002", () => {
  console.log("server running successfully!");
});
