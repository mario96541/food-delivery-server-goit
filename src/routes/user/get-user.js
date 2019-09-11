const fs = require("fs");
const path = require("path");

const getUser = (request, response) => {
  const src = path.join(__dirname, "../../", 'db', "all-user.json");

  const userID = request.params.userID;

  fs.readFile(src, (error, data) => {
    const parseData = JSON.parse(data);
    const filterUser = parseData.filter(user => user.id === Number(userID));
    response.set("Content-Type", "application/json");
    response.status(200);
    response.json(filterUser);
  });
};
module.exports = getUser;
