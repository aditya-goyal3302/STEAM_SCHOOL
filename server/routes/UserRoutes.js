var express = require("express");
var router = express.Router();
const passport = require("passport");
const isauth = require("../add_on/isauth");
const usercontroller = require("../Controllers/user");
const {check,body} = require("express-validator");

router.post("/create",
              [
                body("username")
                  .isString()
                  .trim()
                  .normalizeEmail()
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

router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/auth/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    // req.logIn(req.session.user, err=>{
    //   if (err) throw err;
    // console.log("req.session.user", req.session.user) })
    res.redirect("http://localhost:3000/");
  }
);

router.post("/login",usercontroller.login);

router.post("/verifyotp", usercontroller.verifyotp);

router.post('/resendotp' ,usercontroller.resendotp)

//CREATE ROUTE FOR RESEND OTP

router.get("/get", isauth.user);

router.delete("/logout",isauth.check, usercontroller.logout);

module.exports = router;
