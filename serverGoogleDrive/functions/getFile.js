const fs = require("fs");
const path = require("path");
const getFile = (url, res) => {
  fs.readFile(url, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(data);
  });
};

module.exports = getFile;
