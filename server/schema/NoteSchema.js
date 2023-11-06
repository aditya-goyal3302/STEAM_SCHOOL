const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  uploaderid: {
    type: String,
    index: true,
  },
  text: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
