const User = require('../schema/UserSchema');
exports.check = (req, res, next) => {
    if(!req.session.isLoggedIn){
      return res.status(500).send("Not logged in");
    }
    else
      next();
  }

exports.user = (req, res, next) => {
  if(req.session.isLoggedIn){
    User.findById(req.session.user._id).then(user=>{
      if(user){
        return res.send(user);
      }
      else{
        return res.send(undefined)
      }
    }) 
  }
}
exports.id=(req,res,next)=>{
    res.send((req.session.user._id)?(req.session.user._id):"");
}