const express = require("express");
const router = express.Router();
const getFile = require("../functions/getFile");
const fs = require("fs");
const path = require("path");
const showContent = require("../functions/showContent");
const { deleteDirectory, deleteFile } = require("../functions/delete");
// const fileRoutes = require("./file");

router.get("/:id/:fName", function (req, res, next) {
  const fName = req.params.fName;
  console.log("req.params: ", req.params);
  const userId = req.params.id;
  console.log("userId: ", userId);
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

// router.use("/:fName", fileRoutes);

router.delete("/:id/:fName", function (req, res, next) {
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
      deleteFile(url, res);
    } else if (stats.isDirectory()) {
      console.log("It is a directory.");
      deleteDirectory(url, res);
    } else {
      console.log("It is neither a file nor a directory.");
    }
  });
});

router.put("/:id/:fName", (req, res) => {
  console.log("req: ", req);
  const { fName } = req.params;
  console.log("fName: ", fName);
  const body = req.body;
  console.log("body: ", body);
  // console.log("req: ", req);
  console.log("body: ", req.body);
  res.send(JSON.stringify(req.body));
  // Users.updateUser(username, userPatch, () => {
  //   Users.lookupUser({ username }, (err, user) => {
  //     if (err) return req.status(500).json({ error: err });
  //     services.updateUserServices(user);
  //     res.send();
  //   });
  // });
});

module.exports = router;
