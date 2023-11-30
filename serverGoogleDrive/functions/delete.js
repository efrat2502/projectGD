const fs = require("fs");

const deleteDirectory = (url, res) => {
  console.log("url: ", url);

  fs.rm(url, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to delete directory");
      return;
    }
    console.log(`${url} and its contents are deleted!`);
    res.send("Directory deleted successfully");
  });
};

const deleteFile = (url, res) => {
  fs.unlink(url, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to delete file");
      return;
    }
    console.log(`${url} is deleted!`);
    res.send("File deleted successfully");
  });
};
module.exports = { deleteDirectory: deleteDirectory, deleteFile: deleteFile };
