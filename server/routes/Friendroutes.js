var express = require("express");
var router = express.Router();
const User = require("../schema/UserSchema");
const isauth = require("../add_on/isauth");

router.get("/find/:username", (req, res) => {
  console.log(req.params.username);
  var reg = new RegExp("^" + req.params.username, "i");
  console.log(reg);
  User.find({$or:[{ "prof.skills.sname": reg}, {"username": reg}] })
    .then((users) => {
      // console.log(users);
      if (users) {
        const data = users.map((user) => {
          let t ={
            username: user.username,
            img: user.img,
            id: user._id,
            fname: user.profile.fname,
            lname: user.profile.lname,
          }
          return t;
        });
        console.log(data);
        res.send(data);
      } else {
        res.send(404);
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



//takeback request route.
//remove friends route.



module.exports = router;
