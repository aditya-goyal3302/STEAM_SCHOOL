var express = require("express");
var router = express.Router();

const Note = require("../schema/NoteSchema");

router.post("/uploadFile", async (req, res) => {
  try {
    Note.create({
      text: req.body.text,
      uploaderid: req.session.user._id,
    });
    res.status(200).json({
      status: "success",
      message: "File created successfully and added to user!!",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.get("/getAll", (req, res) => {
  Note.find({ uploaderid: req.session.user._id }, (err, posts) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        posts,
      });
    }
  });
});

router.delete("/delete/:id", (req, res) => {
  Note.findById(req.params.id, (err, post) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      if (post.uploaderid == req.session.user._id || post.uploaderid == req.session.user.id) {
        post.remove();
        res.json({
          message: "Post deleted successfully",
        });
      }
    }
  });
});

router.put("/changeStatus/:id", (req, res) => {
  Note.findById(req.params.id, (err, post) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      if (post.uploaderid == req.session.user._id || post.uploaderid == req.session.user.id) {
        post.status = !post.status;
        post.save();
        res.json({
          message: "Post status changed successfully",
        });
      }
    }
  });
});

module.exports = router;
