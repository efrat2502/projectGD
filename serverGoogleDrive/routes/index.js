const express = require("express");
const router = express.Router();
const getUserNameById = require("../../DB");
const showContent = require("../functions/showContent");
const usersRouter = require("./user");
const path = require("path");
// const legalId = require("../functions/idHendeler");

// router.get("users/:id", function (req, res, next) {
//   const currUser = legalId(req.params.id);
//   console.log("currUser: ", currUser);
//   if (!currUser[0]) {
//     res.status(400).send("Invalid user ID");
//     return;
//   }
//   const url = path.join(__dirname, `../public/${currUser[0].name}`);
//   showContent(url, res);
// });

router.use("/", usersRouter);

module.exports = router;
