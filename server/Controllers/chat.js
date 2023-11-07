const Chat = require("../schema/ChatSchema");
const Message = require("../schema/MessageSchema");
const User  = require("../schema/UserSchema");

exports.get =  (req, res) => {
  Chat.find({ users: { $in: [req.session.user.id, req.session.user._id] } })
      .then((chats) => {
          console.log("chatsfound", chats);
          res.status(200).json(chats);
      })
      .catch((err) => {
          console.log(err);
      });
}

exports.sendmessage =  (req, res) => {const message = new Message({
  senderid: req.session.user._id,
  text: req.body.text,
  chatid: req.body.conversationID,
  });
  message
    .save()
    .then((savedmessage) => {
      console.log(savedmessage);
      res.status(200).send("Message send successfully");
    })
    .catch((err) => console.log("COULD NOT SEND MESSAGE BECAUSE ", err));
}

exports.getpastmessages =  (req, res) => {
    // console.log(req.body.conversationIDs);
  Message.find({ chatid: req.body.chatid })
    .then((messages) => {
      console.log("messagesfound", messages);
      res.status(200).json(messages);
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.newchat = (req,res,next)=>{
  Chat.find({users:{$in:[req.body.acceptedid,req.body.user._id]}})
  .then((result)=>{
    if(!result){
      const newchat = new Chat({
        users: [req.session.user._id, req.body.acceptedid],
      });
       return newchat
          .save()
          .then((chat) =>{ 
            console.log("chatcreated")
            return {id:chat._id , code:1};
          })
          .catch((err) => console.log(err));
    }
    else{
      return res.send({id:result._id , code:2})
    }
  })
  .then(nouse=>{
    return res.status(200).send()
  })
  .catch(err=> console.log(err))
}