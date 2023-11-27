const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatid: {
        type: String,
        index: true,
    },
    mtype: {
        type: Number,
    },
    senderid: {
        type: String,
    },
    text: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", messageSchema);
