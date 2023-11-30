const express = require("express");
const router = express.Router();
const users = require("../../DB");
const showContent = require("../functions/showContent");
const fileRoutes = require("./file");
const path = require("path");

console.log("a: ", users);

router.get("/:id", function (req, res, next) {
  const userId = req.params.id;
  const currUser = users.filter((user) => userId == user.id);
  const url = path.join(__dirname, "../public/efrat");
  console.log("ccccc");
  // showContent("/efrat", res);
  showContent(url, res);

  // res.send(JSON.stringify(currUser));
});

router.put("/:id", function (req, res, next) {
  console.log("req.body: ", req.body);

  const userId = req.params.id;
  const currUser = users.filter((user) => userId == user.id);
  const url = path.join(__dirname, "../public/efrat");
  console.log("ccccc");
  // showContent("/efrat", res);
  showContent(url, res);

  // res.send(JSON.stringify(currUser));
});

router.use("/", fileRoutes);

module.exports = router;
