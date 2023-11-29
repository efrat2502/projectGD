const express = require("express");
const router = express.Router();
const getFile = require("../functions/getFile");
const fs = require("fs");
const path = require("path");
const showContent = require("../functions/showContent");

router.get("/:fName", function (req, res, next) {
  const fName = req.params.fName;
  const url = path.join(__dirname, "../public", `/efrat/${fName}`);
  fs.stat(url, (err, stats) => {
    if (err) {
      console.error(err);
      // Handle the error, e.g., file not found
      return;
    }

    if (stats.isFile()) {
      console.log("It is a file.");
      getFile(url, res);
    } else if (stats.isDirectory()) {
      showContent(url, res);
      console.log("It is a directory.");
    } else {
      console.log("It is neither a file nor a directory.");
    }
  });
});

module.exports = router;
