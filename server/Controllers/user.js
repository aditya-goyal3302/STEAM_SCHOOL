const User = require("../schema/UserSchema");
const Otp = require("../schema/OtpSchema");
const bcrypt = require("bcrypt");
const { WelcomeMail, otpmail, loginMail } = require("../add_on/mail");
const random = require("random");
const passport = require("passport");
const passportsetup = require("../auth/passport");
const {validationResult} = require("express-validator");


exports.create =  async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        let mes=  errors.array()[0].msg
        return res.status(422)
            .send({ 
                message: mes.m,
                code: msg.code
            });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.pass = await bcrypt.hash(req.body.pass, salt);
    const user = new User({
      username: req.body.username,
      password: req.body.pass,
      email: req.body.email,
    });

      //User.findOne({ username: req.body.username }).then((existingUser) => {
        // if (existingUser) {
        //   res.send({
        //     message: "Username Already Exists! Login Instead",
        //     code: 2,
        //   });
        // } 
        // else {
        //   User.findOne({ email: req.body.email }).then((existingUser) => {
        //     if (existingUser) {
        //       res.send({
        //         message: "Email Already Exists! Login Instead",
        //         code: 1,
        //       });
        //     } else {
    const a1 = user
        .save()
        .then((newUser) => {
            if(newUser){
                console.log("NEW USER CREATED WITH DETAILS:", newUser.username, newUser.email);
                WelcomeMail(req.body.email, req.body.username);
                res.send({ message: "New User Created! Login Now", code: 3 });
            }
        })
        .catch((err) => {
            res.send({
                message: "Couldn't Enter Data in DB",
                code: 4,
            });
        });
    }

exports.login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      console.log("BACK IN /login route user ", user);
      if (err) throw err;
      if (!user) {
        res.send(info);
      } else {
        let otp = random.int((min = 123456), (max = 987654)) + "";
        otpmail(user.email, user.username, otp);
        //  res.send({email: user.email, code: 3, otp:otp})
        const newotp = new Otp({
          useremail: user.email,
          userid: user._id,
          curr_otp: otp,
        });
        newotp
          .save()
          .then((newotp) => console.log(newotp))
          .catch((err) => console.log(err));
          loginMail(req.body.email, req.body.username);
      
        res.send({ message: "Credentials Verified", email: user.email, code: 3 });
      }
    })(req, res, next);
  }

exports.verifyotp = (req, res) => {
    console.log("Req from", req.body.useremail, " req.session.user is ", req.body.otp);
    Otp.findOne({ useremail: req.body.useremail }).then((otpdocument) => {
      if (otpdocument) {
        if (otpdocument.times < 1) {
          //otp document found but times less than 1. So Multiple attemps were made.
          otpdocument.remove();
        } else {
          //OTP document with times left Found
          if (req.body.otp == otpdocument.curr_otp) {
            // otp match
            User.findOne({ email: req.body.useremail }).then((user) => {
              if (user) {
                req.logIn(user, (err) => {
                  if (err) throw err;
                  console.log(user);
                });
                req.session.isLoggedIn = true;
                req.session.user = user;
                otpdocument.remove()
                res.send({ code: 2, message: "login successful" });
              } else {
                console.log("User Doesn't Exist");
                res.send({ code: 4, message: "User doesn't exist" });
              }
            });
          } else {
            console.log(
              "Otp sent by user : " +
                req.body.otp +
                " Actual Otp: " +
                otpdocument.curr_otp
            );
            res.send({
              code: 1,
              message: `OTP didn't match. You have ${
                otpdocument.times - 1
              } attempts left`,
            });
          }
          otpdocument.times = otpdocument.times - 1;
          otpdocument.save();
        }
      } else {
        //otp expired. 120 seconds over
        //direct request. Otp never generated
        res.send({
          code: 5,
          message: "Invalid Request. Kindly Login With Valid credentials",
        });
      }
    });
  }

exports.logout = (req, res)=> {
    if (req.session.user) {
      req.session.isLoggedIn = false;
      req.session.destroy( ()=> {
        req.logout(err => {
          if (err){ 
            throw err
            .catch(err => console.log(err))
        }
        })
        res.send("LOGGED OUT");
      });
    }
    else{
      res.send("ALREADY LOGGED OUT")
    }
}

exports.resendotp =  (req,res) => {
    Otp.findOne({useremail : req.body.useremail})
      .then((otpdocument) => {
        if(otpdocument){
          otpmail(req.body.useremail, otpdocument.otp);
          res.send({message : "OTP sent to your email"})
        }
        else{
          res.send({message : "User not found"})
        }
      })
      .catch(err => console.log(err))
  }

