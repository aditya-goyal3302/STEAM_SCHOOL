const express = require("express");
const PORT = 2948;
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const friendRoutes = require("./routes/Friendroutes");
const chatroutes = require("./routes/Chatroutes");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require("passport");
const path = require("path");
const User = require("./schema/UserSchema"); 


process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
  console.log(err.message, err.name);
  // process.exit(1);
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.set("trust proxy", 1);
app.use(
  session({
    secret: "secretcode1",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // One Hour
    },
  })
);
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
app.use("/public/files", express.static(path.join(__dirname, "/public/files")));

app.use(passport.initialize());
app.use(passport.session());
app.use("/user", userRoutes);
app.use("/friend", friendRoutes);
app.use("/chat", chatroutes);


app.use('/getadmin/:userId',(req,res,next)=>{
  const userId= req.params.userId;
  try{
    if(req.session.user._id.toString() === userId.toString()){
      res.send({isadmin:1})
    }
    else{
      res.send({isadmin:0})
    }

  }
  catch(err){
    res.send({isadmin:0})
  }
})
const ___dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(___dirname1, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(___dirname1, "client", "build", "index.html"))
  );
} else {
  app.use(express.static(path.join(___dirname1, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(___dirname1, "client", "build", "index.html"))
  );
  // app.get("/", (req, res) => {
  //   res.send("API is running");
  // });
}

try {
  mongoose.connect(
    `mongodb+srv://agdoie-app:0ISZL1RJpYp6FDUM@cluster0.7hawrym.mongodb.net/trial`,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => {
      console.log(`Connected to the DATABASE`);
    }
  );
} catch (error) {
}

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});

