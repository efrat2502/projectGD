const express = require("express");
const router = express.Router();
const usersRoutes = require("./users");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/users", usersRoutes);

module.exports = router;
