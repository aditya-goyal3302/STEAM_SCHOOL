var express = require("express");
var router = express.Router();
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const Post = require("../schema/PostSchema");
const User = require("../schema/UserSchema");

router.post("/uploadFile", upload.single("myFile"), async (req, res) => {
  console.log(req.file);
  try {
    Post.create(
      {
        name: req.file.filename,
        uploaderid: req.session.user._id,
        uploadername: req.session.user.username,
        uploaderimg: req.session.user.img,
      },
      async (err, post) => {
        req.session.user.posts.push(post._id);
        await req.session.user.save();
      }
    );
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
  var friends = req.session.user.friends;
  friends.push(req.session.user._id);
  Post.find({ uploaderid: { $in: friends } }, (err, posts) => {
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
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      if (post.uploaderid == req.session.user._id || post.uploaderid == req.session.user.id) {
        post.remove();
        req.session.user.posts.pull(req.params.id);
        req.session.user.save();
        res.json({
          message: "Post deleted successfully",
        });
      }
    }
  });
});

router.post("/addcomment/:id", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      post.comments.push({
        _id: req.body._id,
        comment: req.body.comment,
        commenterid: req.session.user._id,
        commentername: req.session.user.username,
      });
      post.save();
      res.json({
        message: "Comment added successfully",
      });
    }
  });
});

//delete comment route
router.delete("/deletecomment/:id/:commentid", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      console.log(post.comments);
      var index = post.comments.findIndex(function (o) {
        return o._id === req.params.commentid;
      });
      console.log(index);
      post.comments.splice(index, 1);
      console.log(post.comments);
      post.save();
      res.json({
        message: "Comment deleted successfully",
      });
    }
  });
});

router.post("/like/:id", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      post.likedby.push(req.session.user._id);
      post.save();
      res.json({
        message: "Post liked successfully",
      });
    }
  });
});

router.post("/unlike/:id", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      post.likedby.pull(req.session.user._id);
      post.save();
      res.json({
        message: "Post unliked successfully",
      });
    }
  });
});

// router.post("/create", async function (req, res) {
//   const salt = await bcrypt.genSalt(10);
//   req.body.pass = await bcrypt.hash(req.body.pass, salt);
//   const user = new User({
//     username: req.body.username,
//     password: req.body.pass,
//     email: req.body.email,
//   });
//   try {
//     User.findOne({ username: req.body.username }).then((existingUser) => {
//       if (existingUser) {
//         res.send({
//           message: "Username Already Exists! Login Instead",
//           code: 2,
//         });
//       } else {
//         User.findOne({ email: req.body.email }).then((existingUser) => {
//           if (existingUser) {
//             res.send({
//               message: "Email Already Exists! Login Instead",
//               code: 1,
//             });
//           } else {
//             const a1 = user
//               .save()
//               .then((newUser) => {
//                 console.log("NEW USER CREATED WITH DETAILS:", newUser);
//               })
//               .catch((err) => {
//                 res.send({
//                   message: "Couldn't Enter Data in DB",
//                   code: 4,
//                 });
//               });
//             mail(req.body.email, req.body.username);
//             res.send({ message: "New User Created! Login Now", code: 3 });
//             //res.redirect('http://localhost:3000?errcode=3')
//           }
//         });
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );
// router.get(
//   "/auth/google/redirect",
//   passport.authenticate("google", {
//     failureRedirect: "http://localhost:3000/login",
//   }),
//   function (req, res) {
//     // req.logIn(req.session.user, err=>{
//     //   if (err) throw err;
//     // console.log("req.session.user", req.session.user) })
//     res.redirect("http://localhost:3000/home");
//   }
// );

// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     console.log("BACK IN /login route user ", user);
//     if (err) throw err;
//     if (!user) {
//       res.send(info);
//     } else {
//       let otp = random.int((min = 123456), (max = 987654)) + "";
//       otpmail(user.email, user.username, otp);
//       //  res.send({email: user.email, code: 3, otp:otp})
//       const newotp = new Otp({
//         useremail: user.email,
//         userid: user._id,
//         curr_otp: otp,
//       });
//       newotp
//         .save()
//         .then((newotp) => console.log(newotp))
//         .catch((err) => console.log(err));
//       res.send({ message: "Credentials Verified", email: user.email, code: 3 });
//     }
//   })(req, res, next);
// });

// router.post("/verifyotp", (req, res) => {
//   console.log("Req from", req.body.useremail, " req.session.user is ", req.body.otp);
//   Otp.findOne({ useremail: req.body.useremail }).then((otpdocument) => {
//     if (otpdocument) {
//       if (otpdocument.times < 1) {
//         //otp document found but times less than 1. So Multiple attemps were made.
//         otpdocument.remove();
//       } else {
//         //OTP document with times left Found
//         if (req.body.otp == otpdocument.curr_otp) {
//           // otp match
//           User.findOne({ email: req.body.useremail }).then((user) => {
//             if (user) {
//               req.logIn(user, (err) => {
//                 if (err) throw err;
//                 console.log(user);
//               });
//               otpdocument.remove();
//               res.send({ code: 2, message: "login successful" });
//             } else {
//               console.log("User Doesn't Exist");
//               res.send({ code: 4, message: "User doesn't exist" });
//             }
//           });
//         } else {
//           console.log(
//             "Otp sent by user : " +
//               req.body.otp +
//               " Actual Otp: " +
//               otpdocument.curr_otp
//           );
//           res.send({
//             code: 1,
//             message: `OTP didn't match. You have ${
//               otpdocument.times - 1
//             } attempts left`,
//           });
//         }
//         otpdocument.times = otpdocument.times - 1;
//         otpdocument.save();
//       }
//     } else {
//       //otp expired. 120 seconds over
//       //direct request. Otp never generated
//       res.send({
//         code: 5,
//         message: "Invalid Request. Kindly Login With Valid credentials",
//       });
//     }
//   });
// });

// // router.post('/resendotp' , (req,res) => {
// //   Otp.findOne({useremail : req.body.useremail}).then((otpdocument) => {

// //   }).catch(err => console.log(err))
// // })

// //CREATE ROUTE FOR RESEND OTP

// router.get("/get", checkauth, (req, res) => {
//   res.send(req.session.user);
// });

// router.delete("/logout", function (req, res) {
//   if (req.session.user()) {
//     req.session.destroy(function () {
//       res.send("LOGGED OUT");
//     });
//   }
// });

// function checkauth(req, res, next) {
//   if (req.session.user()) {
//     return next();
//   } else {
//     console.log("NOT LOGGED IN");
//     return next();
//     //yahan pr, use res.send("something that tells frontend to not show that page.")
//   }
// }

module.exports = router;
