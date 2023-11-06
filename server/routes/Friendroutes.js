var express = require("express");
var router = express.Router();
const User = require("../schema/UserSchema");
const Chat = require("../schema/ChatSchema");
const isauth = require("../add_on/isauth");
const bcrypt = require("bcrypt");
const { mail, otpmail } = require("../add_on/mail");
const { request } = require("express");

router.get("/find/:username",isauth.check, (req, res) => {
  console.log(req.params.username);
  var reg = new RegExp("^" + req.params.username, "i");
  console.log(reg);
  User.find({ username: reg }, { username: 1, email: 1, img: 1 })
    .then((users) => {
      if (users) {
        res.send(users);
      } else {
        res.status(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404);
    });
});


router.post("/findbyid",isauth.check, (req, res) => {
  User.find(
    { _id: { $in: req.body.requests } },
    { username: 1, email: 1, img: 1, "-id": 1 }
  )
    .then((users) => {
      if (users) {
        res.send(users);
      } else {
        res.status(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404);
    });
});

router.post("/request",isauth.check,  (req, res) => {
  console.log(req.session.user._id, req.body);
  User.findById(req.body.requesteduser)
    .then((user) => {
      if (user) {
        if (!user.requests.includes(req.session.user._id)) {
          user.requests.push(req.session.user._id);
          user.save();
        }
        if (!req.session.user.requested.includes(req.body.requesteduser)) {
          req.session.user.requested.push(req.body.requesteduser);
          req.session.user.save();
        }
        res.status(200).send(req.session.user);
      } else {
        res.status(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404);
    });
});

//Also make cancel request

router.post("/acceptrequest", isauth.check, (req, res) => {
  console.log(req.session.user._id, req.body);
  User.findById(req.body.acceptedid)
    .then((user) => {
      if (user) {
        if (user.requested.includes(req.session.user._id)) {
          var index = user.requested.indexOf(req.session.user._id);
          user.requested.splice(index, 1);
          user.friends.push(req.session.user._id);
          user.save();
          index = req.session.user.requests.indexOf(req.body.acceptedid);
          req.session.user.requests.splice(index, 1);
          req.session.user.friends.push(req.body.acceptedid);
          req.session.user.save();
          const newchat = new Chat({
            users: [req.session.user._id, req.body.acceptedid],
          });
          newchat
            .save()
            .then((chat) => console.log("chatcreated"))
            .catch((err) => console.log(err));
        } else {
          res.status(404).json("User Took back Their request");
        }
        res.status(200).send(req.session.user);
      } else {
        res.status(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404);
    });
});

//use find by and update instead of splice.

router.post("/rejectrequest", isauth.check, (req, res) => {
  console.log(req.session.user._id, req.body);
  User.findById(req.body.rejectedid)
    .then((user) => {
      if (user) {
        if (user.requested.includes(req.session.user._id)) {
          var index = user.requested.indexOf(req.session.user._id);
          user.requested.splice(index, 1);
          user.save();
          index = req.session.user.requests.indexOf(req.body.acceptedid);
          req.session.user.requests.splice(index, 1);
          req.session.user.save();
        } else {
          res.status(404).send(user);
        }
        res.status(200).send("Friend Added");
      } else {
        res.status(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404);
    });
});

//takeback request route.
//remove friends route.



module.exports = router;
