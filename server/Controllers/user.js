const User = require("../schema/UserSchema");
const Otp = require("../schema/OtpSchema");
const bcrypt = require("bcrypt");
const { WelcomeMail, otpmail, loginMail, resetMail } = require("../add_on/mail");
const random = require("random");
const passport = require("passport");
const passportsetup = require("../auth/passport");
const {validationResult} = require("express-validator");
const crypto = require("crypto");


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

    const a1 = user
        .save()
        .then((newUser) => {
            if(newUser){
                console.log("NEW USER CREATED WITH DETAILS:", newUser.username, newUser.email);
                WelcomeMail(req.body.email, req.body.fname +" "+ req.body.lname);
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
        otpmail(user.email,req.body.fname +" "+ req.body.lname, otp);
        //  res.send({email: user.email, code: 3, otp:otp})
        const newotp = new Otp({
          useremail: user.email,
          userid: user._id,
          curr_otp: otp,
        });
        newotp
          .save()
          .then((newotp) => console.log(otp))
          .catch((err) => console.log(1));
      
        res.send({ message: "Credentials Verified", email: user.email, code: 3 });
      }
    })(req, res, next);
  }

exports.verifyotp = (req, res) => {
    // console.log("Req from", req.body.useremail, " req.session.user is ", req.body.otp);
    Otp.findOne({ useremail: req.body.useremail }).then((otpdocument) => {
      if (otpdocument) {
        if (otpdocument.times < 1) {
          //otp document found but times less than 1. So Multiple attemps were made.
          otpdocument.remove();
        } else {
          //OTP document with times left Found
          if (req.body.otp == otpdocument.curr_otp) {
            // otp match
            User.findOne({ email: req.body.useremail })
            .then((user) => {
              if (user) {
                req.logIn(user, (err) => {
                  if (err) throw err;
                  // console.log(user);
                });
                req.session.isLoggedIn = true;
                req.session.user = user;
                otpdocument.remove()
                req.session.save(err => {
                  console.log(err);
                });
                
                loginMail(req.body.email, req.body.username);
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
            try {throw err;}
            catch(err ){ console.log(err)}
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

exports.getprofile = (req,res) => {
  var userId = req.params.userId;
  if(userId === ""){
    return;
  }
  if(userId === "self"){
    if(req.session.user === undefined){
      // res.redirect("/login")
      res.send({code:101})
      return;
    }
    else
      userId= req.session.user._id;
  }
  User.findById(userId)
  .then(user=>{
    if(user){
      const data = {...user.profile,email:user.email,img:user.img,username:user.username,_id:user._id}
      res.send(data)
    }
    else{
      res.send({message:"User not found"})
    }
  })
  .catch(err=>{
    console.log(err)
    res.send({message:"User not found",code:1})
  })
}

exports.getprof = (req,res) => {
  var userId = req.params.userId;
  if(userId === ""){
    return;
  }
  if(userId === "self"){
    if(req.session.user === undefined){
      res.redirect("/login")
      return;
    }
    else
      userId= req.session.user._id;  }
   User.findById(userId)
  .then(user=>{
    if(user){
      const data = {...user.prof}
      res.send(data)
    }
    else{
      res.send({message:"User not found"})
    }
  })
  .catch(err=>{
    console.log(err)
    res.send({message:"User not found",code:1})
  })
}

exports.deleteprofile = (req,res) => {
  const userId= req.session.user._id;
  User.findByIdAndDelete(userId)
  .then(user=>{
    if(user){
      res.send({message:"User Deleted"})
    }
    else{
      res.send({message:"User not found"})
    }
  })
  .catch(err=>{
    console.log(err)
    res.send({message:"User not found",code:1})
  })
}

exports.updateprofile = (req,res) => {
  console.log(req.body.profile)

  const userId= req.session.user._id;
  User.findById(userId)
  .then(user=>{
    if(user){
      user.profile.fname = req.body.profile.fname;
      user.profile.lname = req.body.profile.lname;
      user.profile.dob = req.body.profile.dob;
      user.profile.phno = req.body.profile.phno;
      user.profile.gender = req.body.profile.gender;
      user.profile.state = req.body.profile.state;
      user.profile.city = req.body.profile.city;
      user.username = req.body.profile.username;
      return user.save();
    }
    }).then(result=>{
      if(result){
      res.send({message:"User Updated"})
    }
    else{
      res.send({message:"User not found"})
    }
  })
  .catch(err=>{
    console.log(err)
    res.send({message:"User not found",code:1})
  })
}

exports.changepassword = (req,res) => {
  const userId= req.session.user._id;
  User.findById(userId)
  .then(user=>{
    if(user.password !== undefined){
      bcrypt.compare(req.body.pass.oldpassword, user.password, function(err, result) {
        if(result){
          bcrypt.hash(req.body.pass.newpassword, 10, function(err, hash) {
            user.password = hash;
            user.save();
            console.log("Password Changed")
            res.send({message:"Password Changed"})
          });
        }
        else{
          console.log("Old Password is wrong")
          res.send({message:"Old Password is wrong"})
        }
      });
    }
    else if(user.googleaccount.isgoogle === true && req.body.pass.oldpassword === undefined ){
      bcrypt.hash(req.body.pass.newpassword, 10, function(err, hash) {
        // console.log(hash)
        user.password = hash;
        user.save();
        console.log("Password Changed")
        res.send({message:"Password Changed"})
      });
    }
    else{
      console.log("user err")
      res.send({message:"User not found"})
    }
  })
  .catch(err=>{
    console.log(err)
    res.send({message:"User not found",code:1})
  })
}
// exports.getadmin = 

exports.geteditprofile = (req,res) => {
  var userId =req.session.user._id;

  User.findById(userId)
  .then(user=>{
    if(user){
      const data = {...user.profile,email:user.email,img:user.img,username:user.username,_id:user._id}
      res.send(data)
    }
    else{
      res.send({message:"User not found"})
    }
  })
  .catch(err=>{
    console.log(err)
    res.send({message:"User not found",code:1})
  })
}

exports.geteditprof = (req,res) => {
  var userId =req.session.user._id;
  User.findById(userId)
  .then(user=>{
    if(user){
      const data = {...user.prof}
      res.send(data)
    }
    else{
      res.send({message:"User not found"})
    }
  })
  .catch(err=>{
    console.log(err)
    res.send({message:"User not found",code:1})
  })
}

exports.updateimg = (req,res) => {
  const userId= req.session.user._id;
  User.findById(userId)
  .then(user=>{
    if(user){
      user.img = req.body.url;
      return user.save();
    }
    }).then(result=>{
      if(result){
      res.send({message:"User Updated"})
    }
    else{
      res.send({message:"User not found"})
    }
  })
  .catch(err=>{
    console.log(err)
    res.send({message:"User not found",code:1})
  })
}

exports.forgetpass =async (req,res) => {
  const username = req.body.username;

      crypto.randomBytes(32,async (err,buffer)=>{
        if(err){
          
          return res.send({message:"Reset password failed(err:1 #tokenexpired)",code:3})
        }
        const token = buffer.toString('hex');
         await User.findOne({username:username})
          .then(user=>{
            if(!user){
              // req.flash('error','No account with that email found')
              return res.send({message:"No account with that email found",code:1})
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() +100*60*60*60;
             return user.save()
          })
          .then(result=>{
            res.send({message:"User found",code:2})
            console.log(result)
            resetMail(result.email,result.profile.fname +" "+result.profile.lname ,token)
          })
          .catch(err=>{
            console.log(err)
            // req.flash('error','Reset password failed(err:2 #usernotfound)')
            return res.send({message:"Reset password failed(err:2 #usernotfound)",code:1})
          })
          res.send({message:"User found",code:2})
      })
   
  }

exports.resetpass = (req,res) => {
  const token = req.params.token;

  // console.log(token)
  User.findOne({resetToken:token,resetTokenExpiration:{$gt:Date.now()}})
  .then(user=>{
    if(!user){
      // req.flash('error','Reset password failed(err:1 #tokenexpired)')
      
      res.send({message:"Reset password failed(err:1 #tokenexpired)",code:1})
    }
    else{
      res.send({message:"User found",code:2,resetTokenExpiration:user.resetTokenExpiration,token:token})
    }
  })
  .catch(err=>{
    console.log(err)
    // req.flash('error','Reset password failed(err:2 #usernotfound)')
    return res.redirect("http://localhost:3000/login/forgetpass")
  })
}

exports.resetpassword = (req,res) => {
  const token = req.body.token;
  const password = req.body.password;
  // const confirmPassword = req.body.confirmPassword;
  let resetUser;

  User.findOne({resetToken:token,resetTokenExpiration:{$gt:Date.now()}})
  .then(user=>{
    if(!user){
      // req.flash('error','Reset password failed(err:1 #tokenexpired)')
      return res.send({message:"Reset password failed(err:1 #tokenexpired)",code:1})
    }
    resetUser = user;
    return bcrypt.hash(password,10)
    .then(hashedPassword=>{
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save()
    })
    .then(result=>{
      // req.flash('success','Password reset successful')
      res.send({message:"Password reset successful",code:4})
    })
  })
  .catch(err=>{
    console.log(err)
    // req.flash('error','Reset password failed(err:2 #usernotfound)')
    return res.send({message:"Reset password failed(err:2 #usernotfound)",code:1})
  })

}

exports.updateprof = (req,res) => {
  const userId= req.session.user._id;
  User.findById(userId)
  .then(user=>{
    if(user){
      console.log(req.body)
      user.prof.qualification = req.body.qualifications;
      user.prof.skills = req.body.skills;
      user.prof.Exp = req.body.Exp;
      return user.save();
    }
    }).then(result=>{
      console.log(result.prof)
      if(result){
      res.send({message:"User Updated"})
      }
      else{
        res.send({message:"User not found"})
      }
  })
  .catch(err=>{
    console.log(err)
    res.send({message:"User not found",code:1})
  })
}