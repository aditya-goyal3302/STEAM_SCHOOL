const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: [true, "Uploaded file must have a name"],
  },
  uploaderid: {
    type: String,
    index: true,
  },
  uploadername: {
    type: String,
  },
  uploaderimg: {
    type: String,
  },
  comments: {
    type: Array,
    default: [],
  },
  likedby: {
    type: Array,
    default: [],
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
