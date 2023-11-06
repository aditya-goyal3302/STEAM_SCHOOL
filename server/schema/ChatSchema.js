const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    users: {
        type: Array,
        default: [],
    },
    theme: {
        type: Number,
        default: 1,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("chat", chatSchema);
