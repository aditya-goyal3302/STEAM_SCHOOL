var express = require("express");
var router = express.Router();
const passport = require("passport");
const isauth = require("../add_on/isauth");
const { loginMail } = require("../add_on/mail");
const usercontroller = require("../Controllers/user");
const {check,body} = require("express-validator");

router.post("/create",
              [
                body("username")
                  .isString()
                  .trim()
                  .isLength({min:5,max:15})
                  .withMessage({m:"Username must be atleast 5 characters long",code:1})
                  .custom((value,{req})=>{
                    User.findOne({ username: req.body.username }).then((existingUser) => {
                      if (existingUser) {
                        return Promise.reject({m:"Username Already Taken!",code:2});
                        // res.send({
                        //   message: "Username Already Exists! Login Instead",
                        //   code: 2,
                        // });
                      }
                    })
                  }),
                body("email")
                  .normalizeEmail()
                  .isEmail()
                  .withMessage({m:"Email is not valid",code:5})
                  .custom((value,{req})=>{
                    User.findOne({ value: req.body.email }).then((existingUser) => {
                      if (existingUser) {
                        return Promise.reject({m:"Email Already Exists With Different Username! Login Instead",code:1});
                      //   res.send({
                      //     message: "Email Already Exists! Login Instead",
                      //     code: 1,
                    // })
                      }
                    })
                  }),
                body('password',{m:"Password must be alphanumeric and between 6-15 characters!",code:6})
                  .isAlphanumeric()
                  .isLength({min:6,max:15})
                  .trim(),
                body('confirmPassword')
                  .trim()
                  .custom((value,{req})=>{
                      if (value !== req.body.password){
                          throw new Error({m:"Password must macth with confirm password!",code:7});
                      }
                      return true;
                  })
                ],
                usercontroller.create);

router.get("/auth/google",passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/redirect",
  passport.authenticate("google", {failureRedirect: "http://localhost:3000/login"}),
  function (req, res) {
  //   req.logIn(req.session.user, err=>{
  //     if (err) throw err;
    // console.log("req.session.user", req.session.user) })
    // loginMail(req.body.email, req.body.fname +" "+ req.body.lname);
    req.session.isLoggedIn = true;
    req.session.user = req.user;
    req.session.save(err => {
      console.log(err);
    });
    // console.log("req.session.user", req.user)
    res.redirect("http://localhost:3000/")
  }
);

router.get('/getprofile/:userId',usercontroller.getprofile)

router.get('/getprof/:userId',usercontroller.getprof)


router.get('/geteditprofile/',usercontroller.geteditprofile)

router.get('/geteditprof/',usercontroller.geteditprof)

// router.post('/getadmin/:userID',usercontroller.getadmin)

router.get('/deleteprofile',usercontroller.deleteprofile)

router.post("/login",usercontroller.login);

router.post("/verifyotp", usercontroller.verifyotp);

router.post('/resendotp' ,usercontroller.resendotp)



// router.post("/forgotpassword", usercontroller.forgotpassword);

// router.post("/resetpassword", usercontroller.resetpassword);

router.post("/changepassword",isauth.check,usercontroller.changepassword);

router.post("/updateprofile",usercontroller.updateprofile);

// router.post("/updateprof",isauth.check,usercontroller.updateprof);

// router.post("/updateimg",isauth.check,usercontroller.updateimg);

//CREATE ROUTE FOR RESEND OTP

router.get("/get", isauth.user);

router.delete("/logout",isauth.check, usercontroller.logout);

module.exports = router;
