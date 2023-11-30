const getUserNameById = require("../../DB");

const legalId = (id) => {
  const parsedId = parseInt(id, 10);

  // Check if parsedId is a valid number and not NaN
  if (!isNaN(parsedId)) {
    return getUserNameById(parsedId); // It's a valid number
  } else {
    return false; // It's not a valid number
  }
};
module.exports = legalId;
