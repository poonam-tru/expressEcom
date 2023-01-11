const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const ProductsModel = require("./models/Products");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://poonamsaini:Mysense123@clusterapp.i3gyhqu.mongodb.net/cloecom?retryWrites=true&w=majority "
);

// app.post("/createUser", async (req, res) => {
//   const user = req.body;
//   const newUser = new UserModel(user);
//   await newUser.save();
//   res.json(user);
// });

app.post("/login", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
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
  const saltRounds = 10;
  const plainTextPassword = req.body.password;
  const hash = bcrypt.hashSync(plainTextPassword, saltRounds);
  const user = req.body;
  user.password = hash;
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
