const passport = require('passport');
const session = require('express-session')
const googleStrategy = require('passport-google-oauth20')
const LocalStrategy = require('passport-local')
const keys = require('../add_on/keys')
const User = require('../schema/UserSchema')
const Googleuser = require('../schema/GoogleuserSchema')
const bcrypt = require('bcrypt')

passport.serializeUser((user, done) => {
    console.log("SERIALISING", user.id, user._id)
      done(null, user._id);
});
    
passport.deserializeUser((id, done) => {
  // console.log("DESERIALISING", id)
  User.findById(id, function(err, user) {
    done(err, user);
});
})

passport.use(new googleStrategy({
    callbackURL: 'http://localhost:2948/user/auth/google/redirect',
    clientID : keys.google.clientID,
    clientSecret : keys.google.clientSecret},

    (token, tokenSecret, profile, done)=> {
      // console.log(profile)
      User.findOne({email:profile._json.email})
      .then((currentUser)=>{
        if(currentUser){
          // console.log("User Already In DB" , currentUser)
          // loginMail(req.body.email, req.body.username);

          done(null, currentUser)
          return currentUser
      }
      else{
        new User({
          profile:{
            fname: profile._json.name.split(" ")[0],
            lname: profile._json.name.split(" ")[1]
          },
          username: profile._json.email.split("@")[0],
          email : profile._json.email,
          googleaccount : {isgoogle : 1, googlename : profile._json.name},
          img : profile._json.picture
        })
        .save()
        .then((newUser)=>{
          console.log("NEW USER CREATED", newUser); done(null, newUser)
          return newUser
        })
      }
    })
  }
 ));    

passport.use(new LocalStrategy(
    (username, password, done)=> {
      console.log("INSDE LOCAL Curr")
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, {message : "No User Found", code:1});
        }
        return bcrypt.compare(password, user.password)
        .then(doMatch => {
          
          if (!doMatch) {
            return done(null, false, {message : "Incorrect Password", code:2});
          }
          return done(null, user);
        })
        .catch((err)=>{console.log(err)});
        // if (!(user.password == password)) {
        //   return done(null, false , {message : "Incorrect Password", code:2});
        // }
        // console.log(" user ", user);
        // done(null, user);

      });
    }
  ));