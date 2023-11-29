const fs = require("fs");
const path = require("path");
const showContent = (url, res) => {
  fs.readdir(url, { withFileTypes: true }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("show");
    let directories = [];
    const len = data.length;

    data.forEach((file) => {
      directories.push({ name: file.name, isDir: file.isDirectory() });
    });
    res.json(directories);
  });
};

module.exports = showContent;
