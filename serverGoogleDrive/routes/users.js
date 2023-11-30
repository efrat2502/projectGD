const express = require("express");
const router = express.Router();
const users = require("../../DB");
const showContent = require("../functions/showContent");
// const fileRoutes = require("./file");
const path = require("path");

router.get("/:id", function (req, res, next) {
  const userId = req.params.id;
  const currUser = users.filter((user) => userId == user.id);
  const url = path.join(__dirname, "../userFiles/efrat");
  // showContent("/efrat", res);
  showContent(url, res);

  // res.send(JSON.stringify(currUser));
});
// router.use("/:id", fileRoutes);

module.exports = router;
