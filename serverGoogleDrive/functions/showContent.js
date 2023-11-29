const fs = require("fs");
const path = require("path");
const showContent = (folderPath, res) => {
  fs.readdir(
    path.join(__dirname, "../public", folderPath),
    { withFileTypes: true },
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log();
      let directories = [];
      const len = data.length;

      data.forEach((file) => {
        directories.push({ name: file.name, isDir: file.isDirectory() });
      });
      res.json(directories);
    }
  );
};

module.exports = showContent;
