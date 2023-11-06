const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    useremail: {
      type: String,
      required: true,
      unique: true,
    }, 
    userid: {
        type: String,
        required: true,
        unique: true,
      }, 
    curr_otp: {
        type: String,
        required: true,
      },
    times: {
      type: Number,
      default : 3
    },  
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

otpSchema.index({createdAt: 1},{expireAfterSeconds: 120});

module.exports = mongoose.model("Otp", otpSchema);
