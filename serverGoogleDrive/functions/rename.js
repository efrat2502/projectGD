const fs = require("fs");

const rename = (url, newName, res) => {
  console.log("hiii");
  const newPath = `${url.substring(0, url.lastIndexOf("/") + 1)}${newName}`;
  console.log("newPath: ", newPath);

  fs.rename(url, newPath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to rename");
      return;
    }

    console.log(`Renamed to: ${newPath}`);
    res.send("hi");
  });
};

module.exports = rename;
