const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const ProductsModel = require("./models/Products");
app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://poonamsaini:Mysense123@clusterapp.i3gyhqu.mongodb.net/cloecom?retryWrites=true&w=majority "
);

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});

app.get("/allProducts", (req, res) => {
        ProductsModel.find({}, (err, result) => {
          if (err) {
            res.json(err);
          } else {
            // sending json data
            res.json(result);
          }
        });
});

app.listen("3002", () => {
  console.log("server running successfully!");
});
