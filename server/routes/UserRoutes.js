var express = require("express");
var router = express.Router();
const passport = require("passport");
const isauth = require("../add_on/isauth");
const { loginMail } = require("../add_on/mail");
const usercontroller = require("../Controllers/user");
const {check,body} = require("express-validator");

router.post("/create",
              // [
              //   check("username")
              //     .isString()
              //     .trim()
              //     .isLength({min:5,max:15})
              //     .withMessage({m:"Username must be atleast 5 characters long",code:1})
              //     .custom((value,{req})=>{
              //       User.findOne({ username: req.body.username }).then((existingUser) => {
              //         if (existingUser) {
              //           return Promise.reject({m:"Username Already Taken!",code:2});
              //           // res.send({
              //           //   message: "Username Already Exists! Login Instead",
              //           //   code: 2,
              //           // });
              //         }
              //       })
              //     }),
              //   check("email")
              //     .normalizeEmail()
              //     .isEmail()
              //     .withMessage({m:"Email is not valid",code:5})
              //     .custom((value,{req})=>{
              //       User.findOne({ value: req.body.email }).then((existingUser) => {
              //         if (existingUser) {
              //           return Promise.reject({m:"Email Already Exists With Different Username! Login Instead",code:1});
              //         //   res.send({
              //         //     message: "Email Already Exists! Login Instead",
              //         //     code: 1,
              //       // })
              //         }
              //       })
              //     }),
              //   check('password',{m:"Password must be alphanumeric and between 6-15 characters!",code:6})
              //     .isAlphanumeric()
              //     .isLength({min:6,max:15})
              //     .trim(),
              //   check('confirmPassword')
              //     .trim()
              //     .custom((value,{req})=>{
              //         if (value !== req.body.password){
              //             throw new Error({m:"Password must macth with confirm password!",code:7});
              //         }
              //         return true;
              //     })
              //   ],
                usercontroller.create);

router.get("/auth/google",passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/redirect",
  passport.authenticate("google", {failureRedirect: "http://localhost:2948/login"}),
  function async (req, res) {
    req.session.isLoggedIn = true;
    req.session.user = req.user;
    req.session.save(async err => {
      console.log(err);
    });
    const checkp = async (p)=>{
      // const prof = p.profile;
      if(p.fname === "" || p.fname === undefined || p.fname === null || p.fname === " "){
        return false;
      }
       if(p.lname === "" || p.lname === undefined || p.lname === null || p.lname === " "){
        return false;
      }
       if(p.phno === "" || p.phno === undefined || p.phno === null || p.phno === " "){
        return false;
      }
       if(p.dob === "" || p.dob === undefined || p.dob === null || p.dob === " "){
        return false
      }
       if(p.gender === "" ||p.gender === undefined || p.gender === null || p.gender === " " ){
        return false
      }
       if(p.username === "" || p.username === undefined || p.username === null || p.username === " "){
        return false
      }
      if(p.state === "" || p.state === undefined || p.state === null || p.state === " "){
        return false
      }
      if(p.city === "" || p.city === undefined || p.city === null || p.city === " "){
        return false
      }
      return true;
      
  
    }
    // console.log("req.session.user", req.user)
    const user = req.user;
    var temp = {...user.profile,email:user.email,img:user.img,username:user.username,_id:user._id}
    console.log(JSON.stringify(temp))
    checkp(temp).then((p)=>{
    // console.log(Verify)
    if(p=== true){
      res.redirect("http://localhost:2948/")
    }
    else{
      res.redirect("http://localhost:2948/editprofile")
    }
  })
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

router.post("/forgetpass", usercontroller.forgetpass);

router.post("/resetpassword", usercontroller.resetpassword);
router.get("/resetcheck/:token", usercontroller.resetpass);

router.post("/changepassword",isauth.check,usercontroller.changepassword);

router.post("/updateprofile",usercontroller.updateprofile);

router.post("/updateprof",isauth.check,usercontroller.updateprof);

router.post("/updateimg",isauth.check,usercontroller.updateimg);

//CREATE ROUTE FOR RESEND OTP

router.get("/get", isauth.user);

router.delete("/logout",isauth.check, usercontroller.logout);

module.exports = router;
