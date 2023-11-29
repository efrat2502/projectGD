const express = require("express");
const router = express.Router();
const users = require("../../DB");
const showContent = require("../functions/showContent");
console.log("a: ", users);

router.get("/:id", function (req, res, next) {
  const userId = req.params.id;
  const currUser = users.filter((user) => userId == user.id);
  console.log("gdfgf", __dirname);
  showContent("/efrat", res);
  // res.send(JSON.stringify(currUser));
});

module.exports = router;
