const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    products: [
      {
        productId: Number,
        quantity: Number,
        name: String,
        price: Number,
      },
    ],
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const CartModel = mongoose.model("cart", CartSchema);

module.exports = CartModel;
