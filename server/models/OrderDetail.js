const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    orderId: {
      type: String,
      required: true,
    },
    orders: [
      {
        productId: Number,
        quantity: Number,
        name: String,
        price: Number,
      },
    ],
  
    createdAt: {
      type: Date,
      default: Date.now,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const OrderDetailModel = mongoose.model("orderDetail", OrderDetailSchema);

module.exports = OrderDetailModel;
