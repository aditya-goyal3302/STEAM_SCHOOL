var express = require("express");
var router = express.Router();

const chatcontroller = require("../Controllers/chat");
const isauth = require("../add_on/isauth");

router.post("/newchat",isauth.check,chatcontroller.newchat)

router.get("/get",isauth.check,chatcontroller.get);

router.post("/sendmessage",isauth.check,chatcontroller.sendmessage);

router.post("/getpastmessages",isauth.check, chatcontroller.getpastmessages);

// ({chatid:{$in:req.body.conversationIDS}},{"username" : 1, "email" : 1, "img" : 1}).then(users => {
// if(users){
//   res.send(users)
// }
// else
// {
//   res.status(404)
// }
// }).catch(err => {
// console.log(err)
// res.status(404)
// })

module.exports = router;
