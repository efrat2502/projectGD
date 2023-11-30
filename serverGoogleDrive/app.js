const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

var indexRouter = require("./routes/index");
// var usersRouter = require('./routes/users');

var app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

// app.put("/users/:id/:fName", (req, res) => {
//   console.log("req: ", req);
//   const { fName } = req.params;
//   console.log("fName: ", fName);
//   const body = req.body;
//   console.log("body: ", body);
//   // console.log("req: ", req);
//   console.log("body: ", req.body);
//   res.send(JSON.stringify(req.body));
//   // Users.updateUser(username, userPatch, () => {
//   //   Users.lookupUser({ username }, (err, user) => {
//   //     if (err) return req.status(500).json({ error: err });
//   //     services.updateUserServices(user);
//   //     res.send();
//   //   });
//   // });
// });

app.use("/", indexRouter);

// app.use('/users', usersRouter);
module.exports = app;
