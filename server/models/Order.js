const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    orderId: {
      type: String,
      required: true,
    },

    total: {
      type: Number,
    },
    refund_amt: {
      type: Number,
    },
    status: {
      type: String,
      required: true,
    },
    payment_type: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const OrderModel = mongoose.model("orders", OrderSchema);

module.exports = OrderModel;
