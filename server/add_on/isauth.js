
exports.check = (req, res, next) => {
    if(!req.session.isLoggedIn){
      return res.status(500).send("");
    }
    else
      next();
  }

exports.user = (req, res, next) => {
    if(req.session.isLoggedIn){
      return res.send((req.session.user._id)?(req.session.user):"");
    }
    else {
      next();
    }
}