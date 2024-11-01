const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      // unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    googleaccount: {
      isgoogle: { type: Boolean, default: 0 },
      googlename: String,
    },
    resetToken: String,
    resetTokenExpiration: Date,
    img: {
      type: String,
      default: "",
    },
    profile: {
      fname: {
        type: String,
        default: "",
      },
      lname: {
        type: String,
        default: "",
      },
      phno: {
        type: String,
        default: "",
      },
      gender:{
        type:String,
        default: ""
      },
      // age:{
      //   type: String,
      //   default: "",
      // },
      dob: {
        type: String,
        default: "",
      },
      state:{
        type: String,
        default: "",
      },
      city:{
        type: String,
        default: "",
      }
    },
    prof:{
      qualification:[{
        qname: String,
        quni: String,
        qyear: String,
      }],
      skills:[{
        sname: String,
        slevel: String,
      }],
      Exp:[{
        etitle: String,
        ename: String,
        eyear: String,
      }]
    },
    chats: {
      type: Array,
      default: [],
    },
    date: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: 0 },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
