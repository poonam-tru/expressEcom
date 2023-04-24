const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const ProductsModel = require("./models/Products");
const bcrypt = require("bcrypt");
const CategoriesModel = require("./models/Categories");
const CartModel = require("./models/Cart");
const OrderDetailModel = require("./models/OrderDetail");
const OrderModel = require("./models/Order");

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
  console.log(req.body);
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
        console.log(productId, "product--is");
        //fetch quantity of product
        const sku_id = productId;

        const productDb = await ProductsModel.findOne({ sku_id });
        console.log(productDb.quantity, "product----");
        const quantityInDb = productDb.quantity;

        if (quantityInDb <= 0) {
          return  res.status(401).json({ msg: "Product is not available" });
        } else {
          const newQunatity = Math.min(quantity, quantityInDb);
          console.log(newQunatity);
          try {
            console.log(quantityInDb, quantity, "test db quantity");
            if (quantityInDb > quantity) {
              console.log(quantityInDb, "condition true");

              // Check if product already exists in cart
              const existingProduct = cart.products.find(
                (p) => p.productId === productId
              );

              // If product already exists in cart, update the quantity
              if (existingProduct) {
                existingProduct.quantity += quantity;
                // existingProduct.price += price * quantity;
              }
              // If product doesn't exist in cart, add it
              else {
                cart.products.push({ productId, quantity, name, price });
              }
            } else {
              return  res.status(400).json({ msg: "Insuficient Quantity" });
            }
          } catch (error) {
            return res.status(400).json({ msg: "Failed to update" });
          }
        }
      }
    }

    // Update the modifiedOn field
    cart.modifiedOn = Date.now();

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ msg: "Products added to cart" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error adding products to cart" });
  }
});

app.post("/payment", async (res, req) => {
  const userId = "63c8ddde6ca24f8ce80b30ab";
  const randomOrderId = "7272728782vvvb";
  const cartModel = await CartModel.findOne({ userId });
  const products = cartModel.products;
  let total = 0;

  for (const product of products) {
    const { productId, quantity, price } = product;
    const sku_id = productId;
    const productDb = await ProductsModel.findOne({ sku_id });

    if (!productDb || productDb.quantity < quantity) {
      return res.status(401).json({ msg: "Insufficient quantity for product" });
    }

    try {
      await ProductsModel.updateOne(
        { sku_id },
        { $inc: { quantity: -quantity } }
      );
      total += parseInt(price * quantity);
    } catch (err) {
      return res.status(400).json({ msg: "Failed to update product quantity" });
    }
  }
  console.log(total, "test total")

  if (total > 0 && true) {
    console.log(total, "test total---1")

    const order = new OrderModel({
      userId,
      orderId: randomOrderId,
      total,
      refund_amt: "",
      status: "In Progress",
      payment_type: "Cash On delivery",
      createdAt: Date.now(),
    });

    const orderDetail = new OrderDetailModel({
      userId,
      orderId: randomOrderId,
      orders: products,
      total,
      modifiedOn: Date.now(),
      createdAt: Date.now(),
    });

    try {
      await order.save();
      await orderDetail.save();
      console.log('test---order save')
      res.status(200).json({ msg: "Payment Successful" });
    } catch (err) {
      console.log(err,"---- s")
     return res.status(400).json({ msg: "Failed to create order" });
    }
  } else {
    return res.status(400).json({ msg: "No products in cart" });
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
