const express = require("express");
const router = express.Router();
const getFile = require("../functions/getFile");
const fs = require("fs");
const path = require("path");
const showContent = require("../functions/showContent");
const rename = require("../functions/rename");
const { deleteDirectory, deleteFile } = require("../functions/delete");
const legalId = require("../functions/idHendeler");
const fileRoutes = require("./file");

router.delete("*", function (req, res, next) {
  const id = req.baseUrl.split("/")[2];
  console.log("id: ", id);

  const currUser = legalId(id);
  console.log("currUser: ", currUser);
  if (!currUser[0]) {
    res.status(400).send("Invalid user ID");
    return;
  }

  const url = path.join(__dirname, "../public", currUser[0].name, req.url);
  console.log("url: ", url);

  fs.stat(url, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    if (stats.isFile()) {
      console.log("It is a file.");
      deleteFile(url, res);
    } else if (stats.isDirectory()) {
      console.log("It is a directory.");
      deleteDirectory(url, res);
    } else {
      console.log("It is neither a file nor a directory.");
    }
  });
});

router.put("*", (req, res) => {
  const id = req.baseUrl.split("/")[2];
  console.log("id: ", id);

  const currUser = legalId(id);
  console.log("currUser: ", currUser);
  if (!currUser[0]) {
    res.status(400).send("Invalid user ID");
    return;
  }

  const url = path.join(__dirname, "../public", currUser[0].name, req.url);
  console.log("url: ", url);
  rename(url, req.body.name, res);
});

router.get("*", function (req, res, next) {
  const id = req.baseUrl.split("/")[2];
  console.log("id: ", id);

  const currUser = legalId(id);
  console.log("currUser: ", currUser);
  if (!currUser[0]) {
    res.status(400).send("Invalid user ID");
    return;
  }

  const url = path.join(__dirname, "../public", currUser[0].name, req.url);
  console.log("url: ", url);

  fs.stat(url, (err, stats) => {
    if (err) {
      console.error(err);
      // Handle the error, e.g., file not found
      res.sendStatus(500);
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
